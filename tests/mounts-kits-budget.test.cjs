const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const c={window:{},document:{createElement:()=>({}),head:{append(){}}},fetch:async()=>({ok:true,blob:async()=>({})}),FileReader:class{readAsDataURL(){this.result='data:image/webp;base64,dGVzdA==';this.onload();}}};vm.createContext(c);
for(const f of ['assets/data/regras.js','assets/data/montarias.js','assets/js/session-kits.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);
const r=c.window.VALEDRIA_REGRAS,keys=['forca','destreza','constituicao','sabedoria','carisma'];
for(let level=1;level<=10;level++)for(let seed=0;seed<50;seed++){
 const attrs=Object.fromEntries(keys.map((k,i)=>[k,(seed*7+i*11)%80-5]));const result=r.limitarAtributos(attrs,level);
 assert.ok(Object.values(result).every(x=>Number.isInteger(x)&&x>=1));assert.ok(Object.values(result).reduce((a,b)=>a+b,0)<=15+(level-1)*5);
}
const over=r.limitarAtributos({forca:1,destreza:1,constituicao:1,sabedoria:15,carisma:1},1);assert.equal(over.sabedoria,11);
assert.equal(Object.values(r.limitarAtributos(over,2)).reduce((a,b)=>a+b,0),15,'level increase does not spend points automatically');
const base={forca:3,destreza:3,constituicao:3,sabedoria:3,carisma:3};assert.deepEqual(JSON.parse(JSON.stringify(r.limitarAtributos(base,1))),base);
const mounts=c.window.VALEDRIA_MONTARIAS;assert.equal(mounts.length,3);for(const m of mounts){assert.ok(fs.existsSync(m.imagem));assert.ok(m.vida>0&&m.defesa>0&&m.movimento>=9);}
const {rank}=require('../server/content.cjs');const db={prepare:()=>({get:()=>undefined})};assert.equal(rank(db,null),rank(db,'free'),'same content for anonymous and free members');
const kits=JSON.parse(fs.readFileSync('assets/demo/studio.json','utf8')).kits;
(async()=>{
 assert.equal(kits.length,5);assert.equal(new Set(kits.map(k=>k.id)).size,5);
 for(const k of kits){assert.equal(k.map.locations.length,4);assert.ok(fs.existsSync(k.map.image));assert.ok(k.gmSections.length>=7);assert.ok(k.npcs.length>=4);assert.equal(k.handouts.length,5);assert.equal(k.maps.length,2);for(const m of k.maps)assert.ok(fs.existsSync(m.image));assert.ok(k.gmSections.some(s=>s.title.startsWith('6 ')));
  const player=await c.window.ValedriaKits.pack(k,false),gm=await c.window.ValedriaKits.pack(k,true);
  assert.ok(player.includes('data:image/webp;base64,'),'offline artwork embedded');assert.ok(player.includes('tactical-grid'));assert.equal((player.match(/data:image\/webp;base64,/g)||[]).length,2,'both boards embedded offline');assert.equal((c.window.ValedriaKits.mapGallery(k,true).match(/data-kit-map-download=/g)||[]).length,2);
  assert.ok(gm.includes(k.gmSections[0].text));assert.ok(!player.includes(k.gmSections[0].text),'no GM truth in player packet');
  for(const h of k.handouts)assert.ok(!player.includes(h.text),'future clue withheld');
  assert.ok(!c.window.ValedriaKits.map(k.map,false).includes('class="map-number"'),'player map has no GM markers');
 }
 console.log('PASS: level budgets 1–10, mount catalog assets, equal visitor/free access, five complete kits, offline maps and player spoiler separation.');
})().catch(e=>{console.error(e);process.exitCode=1;});
