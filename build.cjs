require('./scripts/build-content.cjs');
require('./scripts/build-search.cjs');
const fs=require('node:fs');const path=require('node:path');
// Rebuild only the verified local output directory so retired assets cannot linger.
const output=path.resolve(__dirname,'dist');
if(path.dirname(output)!==path.resolve(__dirname)||path.basename(output)!=='dist')throw new Error('Invalid output directory');
fs.rmSync(output,{recursive:true,force:true});
fs.mkdirSync(output,{recursive:true});
for(const entry of fs.readdirSync('.')){
  if(entry==='assets'||/\.(html|css|js|ico)$/.test(entry)){
    fs.cpSync(entry,path.join('dist',entry),{recursive:true,filter:src=>!(/\.png$/i.test(src)&&src.startsWith('assets'))});
  }
}
console.log('Static site built.');
