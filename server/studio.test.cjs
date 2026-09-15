const assert=require('node:assert/strict'),{DatabaseSync}=require('node:sqlite'),studio=require('./studio.cjs');
const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE users(id TEXT PRIMARY KEY);CREATE TABLE entitlements(user_id TEXT PRIMARY KEY,expires INTEGER,source TEXT);');studio.setup(db);
for(const plan of ['contador','mestre','deus']){db.prepare('INSERT INTO users VALUES(?)').run(plan);db.prepare('INSERT INTO entitlements VALUES(?,?,?,?)').run(plan,Date.now()+60000,'test',plan);}
function call(user,route,data){let result;try{studio.handle({req:{method:data===undefined?'GET':'POST'},res:{},url:new URL('http://localhost/api'+route),data,db,user,config:{},reply:(_,status,body)=>result={status,body}});return result;}catch(e){if(!e.status)throw e;return {status:e.status};}}
assert.equal(call(null,'/studio/documents/campaigns').status,401);assert.equal(call('contador','/studio/documents/campaigns').status,403);assert.equal(call('mestre','/studio/documents/atlas').status,403);
const document={id:'example',name:'Campanha',sessions:[{id:'s',name:'Pública',summary:'Visível',secret:'SEGREDO',revealed:true},{id:'h',name:'Oculta',revealed:false}],npcs:[],quests:[],inventory:[],encounter:[{id:'e',name:'Rival',hp:99,initiative:4,conditions:'',revealed:true}]};
assert.equal(call('mestre','/studio/documents/campaigns',{version:0,documents:[document]}).status,200);
assert.equal(call('mestre','/studio/documents/campaigns',{version:0,documents:[]}).status,409);
assert.deepEqual(call('deus','/studio/documents/campaigns').body.documents,[]);
assert.equal(call('deus','/studio/share',{campaignId:'example'}).status,404);
const token=call('mestre','/studio/share',{campaignId:'example'}).body.token,view=call(null,'/table/'+token).body;
assert.equal(view.sessions.length,1);assert.ok(!JSON.stringify(view).includes('SEGREDO'));assert.ok(!Object.hasOwn(view.encounter[0],'hp'));
db.prepare("UPDATE entitlements SET expires=0 WHERE user_id='mestre'").run();assert.equal(call(null,'/table/'+token).status,403);
db.prepare("UPDATE entitlements SET expires=? WHERE user_id='mestre'").run(Date.now()+60000);call('mestre','/studio/share',{campaignId:'example',revoke:true});assert.equal(call(null,'/table/'+token).status,404);
assert.equal(call('deus','/studio/documents/atlas',{version:0,documents:[{id:'a',name:'Atlas',locations:[{id:'x',name:'Lugar',x:101,y:0}],routes:[]}]}).status,400);
assert.equal(call('deus','/studio/documents/adventures',{version:0,documents:[{id:'a',name:'Aventura',scenes:[{id:'x',name:'Cena',next:['missing']}]}]}).status,400);
assert.equal(call('deus','/studio/documents/creations',{version:0,documents:[{id:'a',name:'Modelo'}]}).status,400);
db.close();console.log('PASS: tiers, ownership, conflicts, private fields, expiration, revocation and document validation.');
