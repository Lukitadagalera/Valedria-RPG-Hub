/* Verify local references after asset moves; no network required. */
const fs=require('node:fs'),path=require('node:path');
const errors=new Set();let checked=0;
function check(ref,base,from){
 if(!ref||/^(?:https?:|data:|#|mailto:|javascript:)/i.test(ref)||/[{}*+]/.test(ref))return;
 const file=ref.split(/[?#]/)[0];if(!file)return;
 checked++;if(!fs.existsSync(path.resolve(base,file)))errors.add(from+': '+ref);
}
for(const name of fs.readdirSync('.').filter(n=>n.endsWith('.html'))){
 const source=fs.readFileSync(name,'utf8');
 for(const m of source.matchAll(/(?:src|href)=["']([^"']+)["']/g))check(m[1],'.',name);
 for(const m of source.matchAll(/srcset="([^"]+)"/g))for(const entry of m[1].split(','))check(entry.trim().split(/\s+/)[0],'.',name);
}
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,entry.name);if(entry.isDirectory()){walk(file);continue;}
 if(!/\.(?:css|js)$/.test(file))continue;
 const source=fs.readFileSync(file,'utf8');
 if(file.endsWith('.css'))for(const m of source.matchAll(/url\(["']?([^"')]+)["']?\)/g))check(m[1],path.dirname(file),file);
 else for(const m of source.matchAll(/["'](assets\/[^"']+\.(?:webp|png|wav|mp3|css|js|json))(?:\?[^"']*)?["']/g))check(m[1],'.',file);
}}
walk('assets');
if(errors.size){console.error([...errors].join('\n'));process.exitCode=1;}else console.log(checked+' local references verified.');
