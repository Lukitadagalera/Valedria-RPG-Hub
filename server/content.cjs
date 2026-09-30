const fs=require('node:fs'),path=require('node:path');
const labels=['Visitante','Visitante','Contador de Histórias','Mestre das Aventuras','Deus das Lendas'];
function rank(db,user){if(!user)return 1;const row=db.prepare('SELECT plan FROM entitlements WHERE user_id=? AND expires>?').get(user,Date.now());return row?({contador:2,mestre:3,deus:4}[row.plan]||1):1;}
function serve({req,res,url,config,db,user}){if(!config.contentDir)return false;const manifest=JSON.parse(fs.readFileSync(path.join(config.contentDir,'manifest.json'),'utf8'));const item=manifest[decodeURIComponent(url.pathname)];if(!item)return false;
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return true;}
 const authorized=rank(db,user)>=item.rank;const base=authorized?config.contentDir:config.publicDir;const file=path.resolve(base,authorized?item.privateFile:item.publicFile||'');if(!file.startsWith(path.resolve(base)+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(403);res.end();return true;}
 res.setHeader('Cache-Control','private, no-store');res.setHeader('Vary','Cookie');res.writeHead(authorized?200:403,{'Content-Type':item.type});if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);return true;}
module.exports={rank,serve,labels};
