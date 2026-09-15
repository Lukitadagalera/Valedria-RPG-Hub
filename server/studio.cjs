const fs=require('node:fs'),path=require('node:path'),{randomBytes}=require('node:crypto');
const levels={contador:1,mestre:2,deus:3};
const labels={contador:'Contador de Histórias',mestre:'Mestre das Aventuras',deus:'Deus das Lendas'};
const requirements={campaigns:2,adventures:3,atlas:3,creations:3};
function setup(db){
 if(!db.prepare('PRAGMA table_info(entitlements)').all().some(c=>c.name==='plan'))db.exec("ALTER TABLE entitlements ADD COLUMN plan TEXT NOT NULL DEFAULT 'contador'");
 db.exec(`CREATE TABLE IF NOT EXISTS studio_documents(user_id TEXT NOT NULL REFERENCES users(id),kind TEXT NOT NULL,payload TEXT NOT NULL,version INTEGER NOT NULL DEFAULT 1,PRIMARY KEY(user_id,kind));
 CREATE TABLE IF NOT EXISTS studio_shares(token TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),campaign_id TEXT NOT NULL,UNIQUE(user_id,campaign_id));`);
}
const entitlement=(db,id)=>id?db.prepare('SELECT plan,expires FROM entitlements WHERE user_id=? AND expires>?').get(id,Date.now()):null;
const fail=status=>{throw Object.assign(Error(),{status});};
function allowed(db,id,rank=1){if(!id)fail(401);const e=entitlement(db,id);if(!e||!(levels[e.plan]>=rank))fail(403);return e;}
const string=(v,max=20000)=>typeof v==='string'&&v.length<=max;
function validDoc(kind,docs){
 if(!Array.isArray(docs)||docs.length>100)return false;
 const ids=new Set();
 for(const d of docs){
  if(!d||!string(d.id,80)||!d.id||ids.has(d.id)||!string(d.name,200))return false;ids.add(d.id);
  const arrays=kind==='campaigns'?['sessions','npcs','quests','inventory','encounter']:kind==='adventures'?['scenes']:kind==='atlas'?['locations','routes']:[];
  for(const key of arrays)if(!Array.isArray(d[key])||d[key].length>300)return false;
  for(const key of arrays)if(d[key].some(r=>!r||typeof r!=='object'||Array.isArray(r)))return false;
  if(kind==='creations'&&(!d.fields||typeof d.fields!=='object'||Array.isArray(d.fields)||Object.entries(d.fields).some(([k,v])=>k.includes('.')||!string(v))))return false;
  for(const key of arrays.filter(k=>k!=='routes'))if(d[key].some(r=>!string(r.id,80)||!r.id||!string(r.name,200)))return false;
  if(kind==='atlas'&&d.locations.some(p=>!Number.isFinite(p.x)||p.x<0||p.x>100||!Number.isFinite(p.y)||p.y<0||p.y>100))return false;
  if(kind==='adventures'){
   const sceneIds=new Set(d.scenes.map(s=>s.id));
   if(sceneIds.size!==d.scenes.length||d.scenes.some(s=>!Array.isArray(s.next)||s.next.some(id=>!sceneIds.has(id))))return false;
  }
  if(kind==='atlas'){const pointIds=new Set(d.locations.map(p=>p.id));if(pointIds.size!==d.locations.length||d.routes.some(r=>!pointIds.has(r.from)||!pointIds.has(r.to)))return false;}
 }
 // Stored content is text-only structured data; reject very deep or oversized individual strings.
 const check=(v,depth=0)=>depth>12?false:typeof v==='string'?v.length<=20000:v===null||typeof v==='boolean'||typeof v==='number'?true:Array.isArray(v)?v.every(x=>check(x,depth+1)):v&&typeof v==='object'?Object.keys(v).length<=60&&Object.entries(v).every(([k,x])=>!['__proto__','prototype','constructor'].includes(k)&&check(x,depth+1)):false;
 return check(docs);
}
function getDocs(db,id,kind){const row=db.prepare('SELECT payload,version FROM studio_documents WHERE user_id=? AND kind=?').get(id,kind);return row?{documents:JSON.parse(row.payload),version:row.version}:{documents:[],version:0};}
function viewer(db,share){
 allowed(db,share.user_id,2);
 const d=getDocs(db,share.user_id,'campaigns').documents.find(x=>x.id===share.campaign_id);if(!d)fail(404);
 const visible=(arr,keys)=>arr.filter(x=>x.revealed===true).map(x=>Object.fromEntries(keys.map(k=>[k,x[k]??''])));
 return {name:d.name,announcement:d.announcement||'',sessions:visible(d.sessions,['name','summary']),npcs:visible(d.npcs,['name','role','relation']),quests:visible(d.quests,['name','status','description']),inventory:visible(d.inventory,['name','quantity','holder']),encounter:d.encounter.filter(x=>x.revealed===true).map(x=>({name:x.name,initiative:x.initiative,conditions:x.conditions,active:x.id===d.activeId})),round:d.round||1};
}
function handle({req,res,url,data,db,user,config,reply}){
 const route=url.pathname;
 if(route.startsWith('/api/table/')){
  if(req.method!=='GET')fail(405);const share=db.prepare('SELECT * FROM studio_shares WHERE token=?').get(route.split('/').at(-1));if(!share)fail(404);reply(res,200,viewer(db,share));return true;
 }
 if(route==='/api/studio/resources'){
  if(req.method!=='GET')fail(405);const e=allowed(db,user);const raw=JSON.parse(fs.readFileSync(path.join(path.dirname(config.libraryPath),'studio.json'),'utf8'));
  reply(res,200,{plan:e.plan,kits:raw.kits,campaigns:levels[e.plan]>=2?raw.campaigns:[],templates:levels[e.plan]>=3?raw.templates:[]});return true;
 }
 if(route==='/api/bonus-book'){
  if(req.method!=='GET')fail(405);allowed(db,user);const file=path.join(path.dirname(config.libraryPath),'bonus-valedria.pdf');if(!fs.existsSync(file))fail(404);
  res.writeHead(200,{'Content-Type':'application/pdf','Content-Disposition':'attachment; filename="Valedria-O-que-a-areia-nao-levou.pdf"'});fs.createReadStream(file).pipe(res);return true;
 }
 if(route.startsWith('/api/studio/documents/')){
  const kind=route.split('/').at(-1);if(!requirements[kind])fail(404);allowed(db,user,requirements[kind]);
  if(req.method==='GET'){reply(res,200,getDocs(db,user,kind));return true;}
  if(req.method!=='POST')fail(405);
  if(!Number.isInteger(data.version)||!validDoc(kind,data.documents))fail(400);
  db.exec('BEGIN IMMEDIATE');try{const current=getDocs(db,user,kind);if(current.version!==data.version)fail(409);
   const version=current.version+1;db.prepare('INSERT INTO studio_documents VALUES(?,?,?,?) ON CONFLICT(user_id,kind) DO UPDATE SET payload=excluded.payload,version=excluded.version').run(user,kind,JSON.stringify(data.documents),version);db.exec('COMMIT');reply(res,200,{version});
  }catch(e){db.exec('ROLLBACK');throw e;}return true;
 }
 if(route==='/api/studio/share'){
  if(req.method!=='POST')fail(405);allowed(db,user,2);if(!string(data.campaignId,80)||!getDocs(db,user,'campaigns').documents.some(x=>x.id===data.campaignId))fail(404);
  if(data.revoke===true){db.prepare('DELETE FROM studio_shares WHERE user_id=? AND campaign_id=?').run(user,data.campaignId);reply(res,200,{revoked:true});return true;}
  const old=db.prepare('SELECT token FROM studio_shares WHERE user_id=? AND campaign_id=?').get(user,data.campaignId);const token=old?.token||randomBytes(32).toString('hex');if(!old)db.prepare('INSERT INTO studio_shares VALUES(?,?,?)').run(token,user,data.campaignId);reply(res,200,{token});return true;
 }
 return false;
}
module.exports={setup,entitlement,levels,labels,handle};
