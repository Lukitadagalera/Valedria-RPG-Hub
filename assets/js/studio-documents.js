(function(root){
'use strict';
const chronicle=typeof module==='object'&&module.exports?require('./living-chronicle.js'):root.ValedriaChronicle;
const string=(v,max=20000)=>typeof v==='string'&&v.length<=max;
function validDoc(kind,docs){
 if(!['campaigns','adventures','atlas','creations','chronicles'].includes(kind)||!Array.isArray(docs)||docs.length>100)return false;
 const ids=new Set();
 for(const d of docs){
  if(!d||!string(d.id,80)||!d.id||ids.has(d.id)||!string(d.name,200))return false;ids.add(d.id);
  if(kind==='chronicles'&&!chronicle.valid(d))return false;
  const arrays=kind==='campaigns'?['sessions','npcs','quests','inventory','encounter']:kind==='adventures'?['scenes']:kind==='atlas'?['locations','routes']:[];
  for(const key of arrays)if(!Array.isArray(d[key])||d[key].length>300)return false;
  for(const key of arrays)if(d[key].some(r=>!r||typeof r!=='object'||Array.isArray(r)))return false;
  if(kind==='creations'&&(!d.fields||typeof d.fields!=='object'||Array.isArray(d.fields)||Object.entries(d.fields).some(([k,v])=>k.includes('.')||!string(v))))return false;
  for(const key of arrays.filter(k=>k!=='routes'))if(d[key].some(r=>!string(r.id,80)||!r.id||!string(r.name,200)))return false;
  if(kind==='atlas'&&d.locations.some(p=>!Number.isFinite(p.x)||p.x<0||p.x>100||!Number.isFinite(p.y)||p.y<0||p.y>100))return false;
  if(kind==='adventures'){
   const sceneIds=new Set(d.scenes.map(s=>s.id));
   if(sceneIds.size!==d.scenes.length||d.scenes.some(s=>!Array.isArray(s.next)||s.next.some(id=>!sceneIds.has(id))))return false;
  }
  if(kind==='atlas'){const pointIds=new Set(d.locations.map(p=>p.id));if(pointIds.size!==d.locations.length||d.routes.some(r=>!pointIds.has(r.from)||!pointIds.has(r.to)))return false;}
 }
 // Stored content is text-only structured data; reject very deep or oversized individual strings.
 const check=(v,depth=0)=>depth>12?false:typeof v==='string'?v.length<=20000:v===null||typeof v==='boolean'?true:typeof v==='number'?Number.isFinite(v):Array.isArray(v)?v.every(x=>check(x,depth+1)):v&&typeof v==='object'?Object.keys(v).length<=60&&Object.entries(v).every(([k,x])=>!['__proto__','prototype','constructor'].includes(k)&&check(x,depth+1)):false;
 return check(docs);
}
const api={valid:validDoc};if(typeof module==='object'&&module.exports)module.exports=api;else root.ValedriaDocuments=api;
})(typeof window==='object'?window:globalThis);
