const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {valid}=require('../assets/js/studio-documents.js');
const campaign={id:'c',name:'Mesa',sessions:[],npcs:[],quests:[],inventory:[],encounter:[]};
assert.ok(valid('campaigns',[campaign]));
for(const bad of [null,{},[null],[campaign,campaign],[{...campaign,sessions:null}],[{...campaign,sessions:[{id:'s',name:'Sessão',value:Infinity}]}],JSON.parse('[{"id":"c","name":"Mesa","sessions":[],"npcs":[],"quests":[],"inventory":[],"encounter":[],"__proto__":{}}]')])assert.equal(valid('campaigns',bad),false);
assert.equal(valid('unknown',[]),false);
assert.equal(valid('adventures',[{id:'a',name:'Aventura',scenes:[{id:'s',name:'Cena',next:['missing']}]}]),false);
assert.equal(valid('atlas',[{id:'a',name:'Atlas',locations:[],routes:[{from:'x',to:'y'}]}]),false);
const source=fs.readFileSync('assets/js/master-studio.js','utf8');
const importSource=source.slice(source.indexOf('async function importDocument'),source.indexOf('function addDocument'));
const save=source.slice(source.indexOf('async function save(){'),source.indexOf('async function importDocument'));
function harness(){let resolve,started;const ready=new Promise(r=>started=r);const c={kind:'campaigns',opened:'account-a',docs:{campaigns:[structuredClone(campaign)],atlas:[]},versions:{campaigns:0,atlas:4},dirty:new Set(['campaigns','atlas']),clone:structuredClone,window:{ValedriaDocuments:{valid}},uid:()=> 'imported',selected:'',renderEditor:()=>{},status:()=>{},api:()=>new Promise(r=>{resolve=r;started();})};vm.createContext(c);vm.runInContext(save+importSource,c);return {c,ready,finish:()=>resolve({version:1})};}
(async()=>{
 let h=harness(),saving=h.c.save();h.c.kind='atlas';h.finish();await saving;assert.equal(h.c.versions.campaigns,1);assert.equal(h.c.versions.atlas,4);assert.ok(h.c.dirty.has('atlas'));assert.ok(!h.c.dirty.has('campaigns'));
 h=harness();saving=h.c.save();h.c.docs.campaigns[0].name='Editada enquanto salvava';h.finish();await saving;assert.ok(h.c.dirty.has('campaigns'));
 h=harness();saving=h.c.save();h.c.opened='account-b';h.finish();await saving;assert.equal(h.c.versions.campaigns,0);assert.ok(h.c.dirty.has('campaigns'));
 const file={size:200,text:async()=>JSON.stringify({format:'valedria-studio',version:1,kind:'campaigns',document:campaign})};
 h=harness();let importing=h.c.importDocument(file);await h.ready;h.c.kind='atlas';h.finish();await importing;assert.equal(h.c.docs.campaigns.length,2);assert.equal(h.c.docs.atlas.length,0);assert.equal(h.c.versions.atlas,4);
 h=harness();importing=h.c.importDocument(file);await h.ready;h.c.docs.campaigns[0].name='Outra edição';h.finish();await importing;assert.equal(h.c.docs.campaigns[0].name,'Outra edição');assert.ok(h.c.dirty.has('campaigns'));
 const lib=JSON.parse(fs.readFileSync('assets/demo/library.json','utf8'));for(const item of lib.items)for(const s of item.sections){assert.ok(s.text.trim());assert.ok(!/VR\.esc|&mdash;/.test(s.text));}
 console.log('PASS: document validation, unsafe imports, cross-tab saves, pending edits, account changes and clean library text.');
})().catch(e=>{console.error(e);process.exitCode=1;});
