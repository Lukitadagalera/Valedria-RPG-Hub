const fs=require('node:fs');const path=require('node:path');
fs.mkdirSync('dist',{recursive:true});
// Keep PNG masters in the source repository; publish only their WebP versions.
function removePublishedPng(dir){
  if(!fs.existsSync(dir))return;
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const file=path.join(dir,entry.name);
    if(entry.isDirectory())removePublishedPng(file);
    else if(entry.isFile()&&/\.png$/i.test(entry.name))fs.unlinkSync(file);
  }
}
removePublishedPng(path.resolve('dist/assets/img'));
for(const entry of fs.readdirSync('.')){
  if(entry==='assets'||/\.(html|css|js|ico)$/.test(entry)){
    fs.cpSync(entry,path.join('dist',entry),{recursive:true,filter:src=>!(/\.png$/i.test(src)&&src.startsWith('assets'))});
  }
}
console.log('Static site built.');
