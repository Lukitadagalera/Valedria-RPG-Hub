// Private API. Run on Node 24+ behind HTTPS; never run on GitHub Pages.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {DatabaseSync}=require('node:sqlite');
const {randomBytes,createHash,scrypt,timingSafeEqual}=require('node:crypto');
const {promisify}=require('node:util');
const {isIP}=require('node:net');
const studio=require('./studio.cjs');
const derive=promisify(scrypt),token=()=>randomBytes(32).toString('hex'),digest=v=>createHash('sha256').update(v).digest('hex');
const repository=path.resolve(__dirname,'..');
function outsideRepository(file){const relative=path.relative(repository,path.resolve(file));if(!relative.startsWith('..'+path.sep)&&!path.isAbsolute(relative))throw Error('Private files must live outside the public repository.');}
function createServer(config){
 const origin=new URL(config.origin);const development=['127.0.0.1','localhost'].includes(origin.hostname);
 if(origin.protocol!=='https:'&&!development)throw Error('HTTPS site origin required.');
 outsideRepository(config.dbPath);outsideRepository(config.libraryPath);
 if(config.mailEndpoint&&new URL(config.mailEndpoint).protocol!=='https:')throw Error('HTTPS mail adapter required.');
 const db=new DatabaseSync(config.dbPath);db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
 CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,password TEXT NOT NULL,verified INTEGER NOT NULL DEFAULT 0);
 CREATE TABLE IF NOT EXISTS sessions(hash TEXT PRIMARY KEY,user_id TEXT REFERENCES users(id),csrf TEXT NOT NULL,expires INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS links(hash TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),kind TEXT NOT NULL,expires INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS entitlements(user_id TEXT PRIMARY KEY REFERENCES users(id),expires INTEGER NOT NULL,source TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS audit(at INTEGER NOT NULL,event TEXT NOT NULL,user_id TEXT);`);
 studio.setup(db);
 const cookieName=development?'valedria_session':'__Host-valedria_session',limits=new Map();
 const now=()=>Date.now();
 function audit(event,id){db.prepare('INSERT INTO audit VALUES(?,?,?)').run(now(),event,id||null);}
 function rate(key,max,window=900000){const t=now();if(limits.size>10000)for(const [k,v]of limits)if(v.until<t)limits.delete(k);let l=limits.get(key);if(!l||l.until<t){l={count:0,until:t+window};limits.set(key,l);}if(++l.count>max)throw Object.assign(Error(),{status:429});}
 function session(req){const raw=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(cookieName+'='))?.slice(cookieName.length+1);return raw&&/^[a-f0-9]{64}$/.test(raw)?db.prepare('SELECT * FROM sessions WHERE hash=? AND expires>?').get(digest(raw),now()):null;}
 function setSession(res,user,remember=false){const raw=token(),csrf=token(),seconds=user?(remember?30*86400:8*3600):1800;db.prepare('INSERT INTO sessions VALUES(?,?,?,?)').run(digest(raw),user||null,csrf,now()+seconds*1000);res.setHeader('Set-Cookie',`${cookieName}=${raw}; Path=/; HttpOnly; SameSite=Strict${development?'':'; Secure'}${user&&remember?'; Max-Age='+seconds:''}`);return csrf;}
 function reply(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(data));}
 async function body(req){let data='';const limit=req.url.startsWith('/api/studio/')?1500000:8192;for await(const chunk of req){data+=chunk;if(Buffer.byteLength(data)>limit)throw Object.assign(Error(),{status:413});}try{return JSON.parse(data||'{}');}catch{throw Object.assign(Error(),{status:400});}}
 const email=v=>typeof v==='string'&&v.length<=254&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?v.trim().toLowerCase():null;
 async function hashPassword(value){const salt=token();return salt+':'+(await derive(value,salt,64,{N:32768,maxmem:67108864})).toString('hex');}
 async function passwordMatches(value,stored){const [salt,hex]=stored.split(':'),actual=await derive(value,salt,64,{N:32768,maxmem:67108864});return timingSafeEqual(actual,Buffer.from(hex,'hex'));}
 const passwordValid=p=>typeof p==='string'&&p.length>=12&&p.length<=128;
 async function sendLink(user,kind){
  if(!config.mailEndpoint||!config.mailToken)throw Object.assign(Error(),{status:503});
  const raw=token();db.prepare('DELETE FROM links WHERE user_id=? AND kind=?').run(user.id,kind);db.prepare('INSERT INTO links VALUES(?,?,?,?)').run(digest(raw),user.id,kind,now()+(kind==='reset'?30:1440)*60000);
  const link=new URL('/area-mestre.html',origin);link.hash=(kind==='reset'?'reset_token':'verify_token')+'='+raw;
  // Adapter must send transactional email; do not log recipient, token or URL.
  const response=await fetch(config.mailEndpoint,{method:'POST',signal:AbortSignal.timeout(15000),headers:{'Content-Type':'application/json',Authorization:'Bearer '+config.mailToken},body:JSON.stringify({template:kind==='reset'?'password-reset':'verify-email',to:user.email,url:link.href})});
  if(!response.ok){db.prepare('DELETE FROM links WHERE hash=?').run(digest(raw));throw Object.assign(Error(),{status:503});}
 }
 const server=http.createServer(async(req,res)=>{
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
  try{
   const url=new URL(req.url,'http://localhost');
   if(!url.pathname.startsWith('/api/')){
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
    const dir=path.resolve(config.publicDir),file=path.resolve(dir,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
    if(!file.startsWith(dir+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);return res.end();}
    const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.wav':'audio/wav','.mp3':'audio/mpeg','.woff2':'font/woff2'};
    const type=mime[path.extname(file)];if(!type){res.writeHead(404);return res.end();}res.setHeader('Content-Type',type);res.writeHead(200);if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);return;
   }
   // Same-origin deployment: no CORS exceptions, no third-party authentication cookies.
   if(req.headers.origin&&req.headers.origin!==origin.origin)throw Object.assign(Error(),{status:403});
   if(req.headers['sec-fetch-site']==='cross-site')throw Object.assign(Error(),{status:403});
   const forwarded=req.headers['x-forwarded-for'];
   // Enable only behind a loopback proxy that OVERWRITES this header.
   const ip=config.trustProxy&&typeof forwarded==='string'&&isIP(forwarded)?forwarded:req.socket.remoteAddress;
   rate('all:'+ip,2000,60000);
   let s=session(req);
   if(req.method==='GET'&&url.pathname==='/api/session'){
    db.prepare('DELETE FROM sessions WHERE expires<?').run(now());db.prepare('DELETE FROM links WHERE expires<?').run(now());
    const csrf=s?.csrf||setSession(res,null),user=s?.user_id?db.prepare('SELECT id,email FROM users WHERE id=?').get(s.user_id):null;
    const entitlement=studio.entitlement(db,user?.id);
    return reply(res,200,{user:user||null,csrfToken:csrf,entitlement:{status:entitlement?'active':'inactive',plan:entitlement?.plan||null,label:studio.labels[entitlement?.plan]||''}});
   }
   if(req.method==='GET'&&url.pathname==='/api/library'){
    if(!s?.user_id)return reply(res,401,{error:'authentication_required'});
    if(!db.prepare('SELECT 1 FROM entitlements WHERE user_id=? AND expires>?').get(s.user_id,now()))return reply(res,403,{error:'access_required'});
    const e=studio.entitlement(db,s.user_id),library=JSON.parse(fs.readFileSync(config.libraryPath,'utf8'));library.items=library.items.filter(i=>(studio.levels[i.minPlan||'contador']||99)<=studio.levels[e.plan]);
    return reply(res,200,library);
   }
   if(req.method==='GET'&&studio.handle({req,res,url,db,user:s?.user_id,config,reply}))return;
   if(req.method!=='POST')return reply(res,404,{error:'not_found'});
   if(!s||req.headers['x-csrf-token']!==s.csrf||req.headers.origin!==origin.origin)throw Object.assign(Error(),{status:403});
   if(!req.headers['content-type']?.startsWith('application/json'))throw Object.assign(Error(),{status:415});
   const data=await body(req);if(!data||typeof data!=='object'||Array.isArray(data))throw Object.assign(Error(),{status:400});
   if(studio.handle({req,res,url,data,db,user:s?.user_id,config,reply}))return;
   const address=email(data.email);
   if(['/api/login','/api/register','/api/password-reset'].includes(url.pathname)){
    rate('auth:'+ip,30);if(!address)throw Object.assign(Error(),{status:400});rate('email:'+digest(address),15);
   }
   if(url.pathname==='/api/register'){
    if(!passwordValid(data.password))throw Object.assign(Error(),{status:400});
    if(!config.mailEndpoint||!config.mailToken)throw Object.assign(Error(),{status:503});
    let user=db.prepare('SELECT * FROM users WHERE email=?').get(address);
    if(!user){const hashed=await hashPassword(data.password);user={id:token(),email:address};db.prepare('INSERT OR IGNORE INTO users(id,email,password) VALUES(?,?,?)').run(user.id,address,hashed);user=db.prepare('SELECT * FROM users WHERE email=?').get(address);audit('registration',user.id);}
    if(!user.verified)await sendLink(user,'verify');
    return reply(res,202,{accepted:true});
   }
   if(url.pathname==='/api/login'){
    if(typeof data.password!=='string'||data.password.length>128)throw Object.assign(Error(),{status:400});
    const user=db.prepare('SELECT * FROM users WHERE email=?').get(address);
    // Same expensive derivation for missing accounts; response doesn't identify registration.
    const stored=user?.password||('0'.repeat(64)+':'+'0'.repeat(128));const matches=await passwordMatches(data.password,stored);
    if(!matches||!user?.verified)return reply(res,400,{error:'invalid_credentials'});
    db.prepare('DELETE FROM sessions WHERE hash=?').run(s.hash);setSession(res,user.id,data.remember===true);audit('login',user.id);return reply(res,200,{ok:true});
   }
   if(url.pathname==='/api/password-reset'){
    if(!config.mailEndpoint||!config.mailToken)throw Object.assign(Error(),{status:503});
    const user=db.prepare('SELECT * FROM users WHERE email=?').get(address);
    if(user){try{await sendLink(user,'reset');}catch{audit('mail_delivery_failed',user.id);}}
    return reply(res,202,{accepted:true});
   }
   if(url.pathname==='/api/password-update'||url.pathname==='/api/verify-email'){
    rate('token:'+ip,20);const kind=url.pathname.endsWith('verify-email')?'verify':'reset';
    if(typeof data.token!=='string'||!/^[a-f0-9]{64}$/.test(data.token))throw Object.assign(Error(),{status:400});
    const link=db.prepare('SELECT * FROM links WHERE hash=? AND kind=? AND expires>?').get(digest(data.token),kind,now());if(!link)throw Object.assign(Error(),{status:400});
    let hashed;if(kind==='reset'){if(!passwordValid(data.password))throw Object.assign(Error(),{status:400});hashed=await hashPassword(data.password);}
    db.exec('BEGIN IMMEDIATE');try{
     const consumed=db.prepare('DELETE FROM links WHERE hash=? AND expires>?').run(link.hash,now());if(!consumed.changes)throw Object.assign(Error(),{status:400});
     if(kind==='reset'){db.prepare('UPDATE users SET password=?,verified=1 WHERE id=?').run(hashed,link.user_id);db.prepare('DELETE FROM sessions WHERE user_id=?').run(link.user_id);}
     else db.prepare('UPDATE users SET verified=1 WHERE id=?').run(link.user_id);
     db.exec('COMMIT');
    }catch(e){db.exec('ROLLBACK');throw e;}
    audit(kind==='reset'?'password_updated':'email_verified',link.user_id);return reply(res,200,{ok:true});
   }
   if(url.pathname==='/api/logout'){db.prepare('DELETE FROM sessions WHERE hash=?').run(s.hash);res.setHeader('Set-Cookie',`${cookieName}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict${development?'':'; Secure'}`);return reply(res,200,{ok:true});}
   reply(res,404,{error:'not_found'});
  }catch(e){if(!res.headersSent)reply(res,e.status||503,{error:e.status===429?'rate_limited':'request_failed'});else res.end();}
 });
 server.on('close',()=>db.close());return server;
}
if(require.main===module){
 const required=['MASTER_ORIGIN','MASTER_DB','MASTER_LIBRARY'];for(const key of required)if(!process.env[key])throw Error('Missing '+key);
 const server=createServer({origin:process.env.MASTER_ORIGIN,dbPath:process.env.MASTER_DB,libraryPath:process.env.MASTER_LIBRARY,publicDir:path.join(repository,'dist'),mailEndpoint:process.env.MASTER_MAIL_ENDPOINT,mailToken:process.env.MASTER_MAIL_TOKEN,trustProxy:process.env.MASTER_TRUST_PROXY==='true'});
 server.listen(Number(process.env.PORT||4180),'127.0.0.1',()=>console.log('Master service ready on loopback; HTTPS reverse proxy required.'));
}
module.exports={createServer};
