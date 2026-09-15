const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const {DatabaseSync}=require('node:sqlite');
const {createServer}=require('./index.cjs');
const temp=fs.mkdtempSync(path.join(require('node:os').tmpdir(),'valedria-master-test-'));const dbPath=path.join(temp,'accounts.sqlite'),origin='http://127.0.0.1:4181';
const realFetch=global.fetch,mail=[];
global.fetch=(url,opts)=>url==='https://mail-adapter.test/send'?(mail.push(JSON.parse(opts.body)),Promise.resolve(new Response('{}',{status:202}))):realFetch(url,opts);
const fixture={items:Array.from({length:18},(_,i)=>({id:'livro-'+i})),generators:{}};fs.writeFileSync(path.join(temp,'library.json'),JSON.stringify(fixture));
const server=createServer({origin,dbPath,libraryPath:path.join(temp,'library.json'),publicDir:path.resolve(__dirname,'../dist'),mailEndpoint:'https://mail-adapter.test/send',mailToken:'test-only'});
server.listen(4181,'127.0.0.1',async()=>{
 let cookie='',csrf='';const email='master@example.test',password='A very strong test password';
 async function call(route,data,extra={}){const res=await realFetch(origin+'/api'+route,{method:data===undefined?'GET':'POST',headers:{Cookie:cookie,Origin:origin,...(data===undefined?{}:{'Content-Type':'application/json','X-CSRF-Token':csrf}),...extra},...(data===undefined?{}:{body:JSON.stringify(data)})});if(res.headers.get('set-cookie'))cookie=res.headers.get('set-cookie').split(';')[0];const body=await res.json();if(body.csrfToken)csrf=body.csrfToken;return{status:res.status,body,headers:res.headers};}
 try{
  assert.equal((await call('/library')).status,401);
  assert.equal((await call('/session')).body.user,null);
  assert.equal((await call('/register',{email,password},{'X-CSRF-Token':'bad'})).status,403);
  assert.equal((await call('/register',{email,password},{Origin:'https://evil.test'})).status,403);
  assert.equal((await call('/register',{email,password})).status,202);assert.equal(mail.length,1);
  assert.equal((await call('/login',{email,password})).status,400);
  const verify=new URLSearchParams(new URL(mail[0].url).hash.slice(1)).get('verify_token');
  assert.equal((await call('/verify-email',{token:verify})).status,200);
  assert.equal((await call('/verify-email',{token:verify})).status,400);
  const login=await call('/login',{email,password,remember:true});assert.equal(login.status,200);assert.match(login.headers.get('set-cookie'),/HttpOnly/);assert.match(login.headers.get('set-cookie'),/Max-Age=2592000/);
  let session=await call('/session');assert.equal(session.body.entitlement.status,'inactive');assert.equal((await call('/library')).status,403);
  const db=new DatabaseSync(dbPath);db.prepare('INSERT INTO entitlements(user_id,expires,source) VALUES(?,?,?)').run(session.body.user.id,Date.now()+600000,'test');
  assert.equal((await call('/session')).body.entitlement.status,'active');const lib=await call('/library');assert.equal(lib.status,200);assert.equal(lib.body.items.filter(x=>x.id.startsWith('livro-')).length,18);assert.equal(lib.headers.get('cache-control'),'no-store');
  const oldCookie=cookie;
  assert.equal((await call('/password-reset',{email})).status,202);
  const reset=new URLSearchParams(new URL(mail.at(-1).url).hash.slice(1)).get('reset_token');
  assert.equal((await call('/password-update',{token:reset,password:password+' new'})).status,200);
  assert.equal((await call('/library')).status,401);
  await call('/session');assert.equal((await call('/password-update',{token:reset,password:password+' newer'})).status,400);
  assert.equal((await call('/login',{email,password})).status,400);
  assert.equal((await call('/login',{email,password:password+' new'})).status,200);session=await call('/session');
  db.prepare('UPDATE entitlements SET expires=0').run();assert.equal((await call('/library')).status,403);
  assert.equal((await call('/logout',{})).status,200);assert.equal((await call('/library')).status,401);
  assert.equal((await realFetch(origin+'/assets/data/mestre.js')).status,404);
  assert.equal((await realFetch(origin+'/../master-vault/library.json')).status,404);
  db.close();console.log('PASS: confirmation, login, persistence cookie, CSRF, origin, access, recovery, single-use tokens, session revocation, expiration, logout, private file protection. '+lib.body.items.length+' materials.');
 }catch(e){console.error(e);process.exitCode=1;}finally{server.close();}
});
