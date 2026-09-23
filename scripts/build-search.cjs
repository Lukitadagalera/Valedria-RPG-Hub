const fs=require('node:fs'),vm=require('node:vm');
const books=[
 ['livro-01-geografia.html','Geografia',['geografia','territorios']],['livro-02-sociedade.html','Sociedade',['sociedade']],
 ['livro-03-economia.html','Economia',['itens_basicos','economia']],['livro-04-sistema.html','Sistema',['pericias']],
 ['livro-05-racas.html','Raças',['racas']],['livro-06-magia.html','Magia',['magia']],['livro-07-aura.html','Aura',['aura']],
 ['livro-08-artefatos.html','Artefatos',['itens']],['livro-09-bestiario.html','Bestiário',['bestiario']],
 ['livro-10-faccoes.html','Facções',['faccoes','guilda']],['livro-11-exploracao.html','Exploração',['exploracao']],
 ['area-mestre.html','Área do Mestre',[]],['livro-13-mapa.html','Mapa e Aventuras',['mapa']],
 ['comece-aqui.html','Primeiros passos',[]],['ficha.html','Ficha de personagem',[]],['mundo.html','Mundo',[]]
];
const clean=s=>String(s).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]+>/g,' ').replace(/&(?:nbsp|mdash|ndash);/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
const entries=[],seen=new Set();
function add(title,text,url,category){title=clean(title);text=clean(text);const key=category+'|'+title;if(!title||seen.has(key))return;seen.add(key);entries.push({title,text:text.slice(0,1800),url,category});}
for(const [file,category,sources] of books){
 const html=fs.readFileSync(file,'utf8'),main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||'';
 add(category,html.match(/<meta name="description" content="([^"]*)"/)?.[1]||category,file,category);
 // Only public, server-independent prose. Locked chronicles are never indexed.
 for(const match of main.matchAll(/<(h[234])\b[^>]*>([\s\S]*?)<\/\1>([\s\S]*?)(?=<h[234]\b|$)/gi)){
   const title=clean(match[2]);add(title,match[3],file+'?encontrar='+encodeURIComponent(title),category);
 }
 const context={window:{}};vm.createContext(context);
 for(const source of sources)vm.runInContext(fs.readFileSync('assets/data/'+source+'.js','utf8'),context,{timeout:1500});
 const flatten=(obj)=>Object.entries(obj).filter(([key])=>!['img','foto','x','y','rotulo','segredo','segredos','senha','password'].includes(key)).map(([k,v])=>typeof v==='string'?v:Array.isArray(v)?v.filter(x=>typeof x==='string').join(' '):'').join(' ');
 function walk(obj){if(!obj||typeof obj!=='object')return;if(typeof obj.nome==='string')add(obj.nome,flatten(obj),file+'?encontrar='+encodeURIComponent(obj.nome),category);for(const [k,v] of Object.entries(obj))if(!/segred|senha|password/i.test(k))walk(v);}
 walk(context.window);
}
fs.writeFileSync('assets/data/search-index.json',JSON.stringify(entries));
console.log('Search index: '+entries.length+' entries.');
