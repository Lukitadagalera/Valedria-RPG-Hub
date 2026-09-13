/* Keep repeated reference views derived from their canonical data. */
const fs=require('node:fs'),vm=require('node:vm');
const context={window:{}};vm.createContext(context);
for(const file of ['pericias','geografia','territorios','mapa'])vm.runInContext(fs.readFileSync('assets/data/'+file+'.js','utf8'),context,{timeout:1500});
const data=context.window,esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const system=fs.readFileSync('livro-04-sistema.html','utf8');
const rows=data.PERICIAS.map(p=>'<tr><td>'+esc(p.nome)+'</td><td>'+esc(p.atributo)+'</td><td>'+esc(p.descricao)+'</td></tr>').join('');
const updated=system.replace(/(<thead><tr><th>Perícia<\/th><th>Atributo<\/th><th>Uso típico<\/th><\/tr><\/thead><tbody>)[\s\S]*?(<\/tbody>)/,'$1'+rows+'$2');
if(updated!==system)fs.writeFileSync('livro-04-sistema.html',updated);
const normalize=s=>s.split(' — ')[0].normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const cities=new Map();
for(const kingdom of data.REINOS)for(const city of kingdom.cidades)cities.set(normalize(city.nome),city);
for(const territory of data.TERRITORIOS)for(const city of territory.cidades||[])cities.set(normalize(city.nome),city);
let synced=0;
for(const point of data.MAPA_PONTOS){
 const city=cities.get(normalize(point.nome));if(!city)continue;synced++;
 for(const key of ['populacao','localizacao','figura'])if(city[key]!=null)point[key]=city[key];
 if(city.descricao||city.papel)point.descricao=city.descricao||city.papel;
}
// Preserve the approved artwork and coordinates; synchronize descriptive information only.
const output=['MAPA_DIMENSOES','MAPA_IMAGEM','MAPA_PONTOS','MAPA_ROTAS'].map(key=>'window.'+key+' = '+JSON.stringify(data[key],null,2)+';').join('\n');
const target='assets/data/mapa.js',old=fs.readFileSync(target,'utf8');
const current='/* Coordinates belong to the approved artwork. Descriptions are synchronized by build-content.cjs. */\n'+output+'\n';
if(old!==current)fs.writeFileSync(target,current);
console.log('Canonical data: '+data.PERICIAS.length+' skills; '+synced+' map descriptions linked to geography.');
