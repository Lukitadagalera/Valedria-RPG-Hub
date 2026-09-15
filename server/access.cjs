// Operator-only entitlement management until a verified payment webhook is integrated.
const {DatabaseSync}=require('node:sqlite');
const [action,email,date,plan='contador']=process.argv.slice(2);
if(!process.env.MASTER_DB||!['grant','revoke'].includes(action)||!email)throw Error('Set MASTER_DB, then: node server/access.cjs grant email YYYY-MM-DD | revoke email');
const db=new DatabaseSync(process.env.MASTER_DB);
try{
 const user=db.prepare('SELECT id,verified FROM users WHERE email=?').get(email.trim().toLowerCase());
 if(!user?.verified)throw Error('Verified account required.');
 if(action==='grant'){
  if(!['contador','mestre','deus'].includes(plan))throw Error('Unknown plan.');
  const expires=Date.parse(date+'T23:59:59Z');if(!Number.isFinite(expires)||expires<=Date.now())throw Error('Future expiry required.');
  db.prepare('INSERT INTO entitlements(user_id,expires,source,plan) VALUES(?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET expires=excluded.expires,source=excluded.source,plan=excluded.plan').run(user.id,expires,'operator',plan);
 }else db.prepare('DELETE FROM entitlements WHERE user_id=?').run(user.id);
 db.prepare('INSERT INTO audit VALUES(?,?,?)').run(Date.now(),action==='grant'?'access_granted':'access_revoked',user.id);console.log('Access updated.');
}finally{db.close();}
