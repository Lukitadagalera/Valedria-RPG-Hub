(function(root){
'use strict';
const copy=v=>JSON.parse(JSON.stringify(v));
const text=(v,max=20000)=>typeof v==='string'&&v.length<=max;
const integer=(v,min,max)=>Number.isInteger(v)&&v>=min&&v<=max;
function records(rows,check){return Array.isArray(rows)&&rows.length<=100&&new Set(rows.map(r=>r?.id)).size===rows.length&&rows.every(r=>r&&text(r.id,80)&&r.id&&text(r.name,200)&&check(r));}
function state(d){return d&&integer(d.session,1,9999)&&records(d.pressures,p=>integer(p.limit,2,12)&&integer(p.progress,0,p.limit)&&text(p.consequence)&&typeof p.automatic==='boolean'&&typeof p.revealed==='boolean')&&records(d.factions,f=>integer(f.standing,-3,3)&&text(f.objective)&&typeof f.revealed==='boolean');}
function valid(d){return !!(state(d)&&text(d.id,80)&&d.id&&text(d.name,200)&&text(d.summary)&&text(d.notes)&&text(d.source,200)&&Array.isArray(d.journal)&&d.journal.length<=100&&d.journal.every(j=>j&&integer(j.session,1,9999)&&text(j.text)&&text(j.summary)&&Array.isArray(j.changes)&&j.changes.length<=100&&j.changes.every(c=>text(c,400)))&&(d.undo===null||state(d.undo)&&integer(d.undo.journalLength,0,99)&&d.undo.journalLength===d.journal.length-1&&d.undo.session===d.session-1&&text(d.undo.summary)&&text(d.undo.notes)));}
function create(id,name='Minha crônica',source=''){return {id,name,source,session:1,summary:'',notes:'',pressures:[],factions:[],journal:[],undo:null};}
function advance(d){
 if(!valid(d))throw Error('Revise os campos da crônica antes de avançar.');
 if(d.session>=9999||d.journal.length>=100)throw Error('Exporte esta crônica e comece um novo volume para continuar.');
 d.undo=copy({session:d.session,pressures:d.pressures,factions:d.factions,journalLength:d.journal.length,summary:d.summary,notes:d.notes});
 const advanced=[];
 for(const p of d.pressures)if(p.automatic&&p.progress<p.limit){p.progress++;advanced.push(p.name+': '+p.progress+'/'+p.limit+(p.progress===p.limit?' — chegou ao limite; avalie a consequência.':''));}
 d.journal.push({session:d.session,summary:d.summary,text:d.notes,changes:advanced});
 d.session++;d.summary='';d.notes='';return d;
}
function undo(d){if(!d.undo)return false;d.session=d.undo.session;d.pressures=copy(d.undo.pressures);d.factions=copy(d.undo.factions);d.journal.length=d.undo.journalLength;d.summary=d.undo.summary;d.notes=d.undo.notes;d.undo=null;return true;}
function playerView(d){return {name:d.name,session:d.session,summary:d.summary,pressures:d.pressures.filter(p=>p.revealed).map(p=>({name:p.name,progress:p.progress,limit:p.limit})),factions:d.factions.filter(f=>f.revealed).map(f=>({name:f.name,standing:f.standing})),journal:d.journal.map(j=>({session:j.session,summary:j.summary})).filter(j=>j.summary)};}
const api={create,valid,advance,undo,playerView};
if(typeof module==='object'&&module.exports)module.exports=api;else root.ValedriaChronicle=api;
})(typeof window==='object'?window:globalThis);
