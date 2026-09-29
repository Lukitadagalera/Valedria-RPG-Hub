const {readFileSync}=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c={window:{}};vm.createContext(c);vm.runInContext(readFileSync('assets/data/regras.js','utf8'),c);const r=c.window.VALEDRIA_REGRAS;
const base={forca:4,destreza:3,constituicao:3,sabedoria:3,carisma:2};
const s={atributos:base,caminho:'Aura',auraCaminho:'Morte',auraGrau:'Guerreiro',armadura:'leve',escudo:'sim'};
let d=r.derivados(s);assert.equal(d.vida,13);assert.equal(d.defesa,13);assert.equal(d.atributos.forca,5);assert.equal(d.atributos.constituicao,4);assert.equal(base.constituicao,3);
for(const path of ['Força','Velocidade','Morte','Técnica'])for(const [index,grade]of ['Aprendiz','Guerreiro','Mestre','Grande Mestre','Imperador','Deus'].entries()){const b=r.auraBonus(path,grade);assert.equal(Object.values(b).reduce((a,b)=>a+b,0),index+1);}
assert.equal(r.auraBonus('Técnica','Deus').carisma,2);assert.equal(r.auraBonus('Morte','Deus').constituicao,3);
assert.equal(r.derivados({...s,caminho:'Magia'}).vida,11);assert.equal(r.derivados({...s,auraCaminho:''}).vida,11);
assert.equal(r.derivados({atributos:base}).defesa,11);assert.equal(r.derivados({atributos:base}).vida,11);
assert.equal(r.derivados({...s,auraCaminho:'Velocidade',auraGrau:'Mestre',armadura:'pesada'}).defesa,17);
assert.equal(r.derivados(JSON.parse(JSON.stringify(s))).vida,13);
console.log('PASS: every Aura path and grade, no base mutation, legacy defaults, disabled Aura, equipment and saved-state roundtrip.');
