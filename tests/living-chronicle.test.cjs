const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const C=require('../assets/js/living-chronicle.js');
const d=C.create('c','Crônica de teste');
d.summary='A aldeia recebeu ajuda.';d.notes='SEGREDO DO MESTRE';
d.pressures=[{id:'p',name:'Cerco',progress:1,limit:2,automatic:true,revealed:true,consequence:'CONSEQUÊNCIA PRIVADA'},{id:'h',name:'AMEAÇA OCULTA',progress:0,limit:4,automatic:false,revealed:false,consequence:'OCULTA'}];
d.factions=[{id:'f',name:'Guarda',standing:2,objective:'OBJETIVO PRIVADO',revealed:true},{id:'g',name:'FACÇÃO OCULTA',standing:-3,objective:'PLANO',revealed:false}];
assert.ok(C.valid(d));const initial=JSON.stringify(d);C.advance(d);assert.equal(d.session,2);assert.equal(d.pressures[0].progress,2);assert.equal(d.pressures[1].progress,0);assert.equal(d.journal.length,1);assert.ok(C.valid(d));
const player=JSON.stringify(C.playerView(d));for(const secret of ['SEGREDO','PRIVADA','PRIVADO','OCULTA','PLANO'])assert.ok(!player.includes(secret));assert.ok(player.includes('aldeia'));
assert.ok(C.undo(d));assert.equal(JSON.stringify(d),initial);C.advance(d);C.advance(d);assert.equal(d.pressures[0].progress,2);assert.equal(d.journal.length,2);C.undo(d);assert.equal(d.session,2);
for(const mutate of [x=>x.pressures[0].progress=99,x=>x.pressures[0].limit=1,x=>x.factions[0].standing=4,x=>x.pressures.push(x.pressures[0]),x=>x.journal[0].summary=42]){const bad=structuredClone(d);mutate(bad);assert.equal(C.valid(bad),false);assert.throws(()=>C.advance(bad));}
const full=structuredClone(d);full.journal=Array.from({length:100},()=>({session:1,text:'',summary:'',changes:[]}));assert.throws(()=>C.advance(full));
const context={window:{ValedriaChronicle:C}};vm.runInNewContext(fs.readFileSync('assets/js/chronicle-view.js','utf8'),context);d.name='<script>';d.pressures[0].name='<img onerror=alert(1)>';
const html=context.window.ValedriaChronicleView.content(d,true);assert.ok(html.includes('&lt;img'));assert.ok(!html.includes('<img'));assert.ok(!html.includes('SEGREDO'));
console.log('PASS: chronicle advancement, caps, undo, history, validation, private/player separation and escaped exports.');
