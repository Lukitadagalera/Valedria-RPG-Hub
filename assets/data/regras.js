/* Shared numeric rules: the sheet and reference tables use the same values. */
window.VALEDRIA_REGRAS={
  pontosIniciais:15,pontosPorNivel:5,nivelMaximo:10,vidaBase:5,vidaPorConstituicao:2,manaBase:50,
  manaCrescimento:{Estagnada:0,Comum:.10,Elevado:.20,Superior:.50,'Anomalia de Mana':1},
  folegoPorGrau:{Aprendiz:3,Guerreiro:4,Mestre:5,'Grande Mestre':8,Imperador:null,Deus:null},
  manaMax(nivel,potencial){const taxa=this.manaCrescimento[potencial]??this.manaCrescimento.Comum;return Math.round(this.manaBase*Math.pow(1+taxa,Math.max(0,Math.min(this.nivelMaximo,Number(nivel)||1)-1)));},
  auraBonus(caminho,grau){
    const bonus={forca:0,destreza:0,constituicao:0,sabedoria:0,carisma:0};
    const ordem={Força:['forca'],Velocidade:['destreza'],Morte:['forca','constituicao'],Técnica:['destreza','sabedoria','carisma']}[caminho];
    const n=['Aprendiz','Guerreiro','Mestre','Grande Mestre','Imperador','Deus'].indexOf(grau)+1;
    if(ordem)for(let i=0;i<n;i++)bonus[ordem[i%ordem.length]]++;
    return bonus;
  },
  derivados(s){
    const bonus=this.auraBonus(s.caminho==='Aura'?s.auraCaminho:'',s.auraGrau);
    const atributos={};for(const k of Object.keys(bonus))atributos[k]=Math.max(1,Math.floor(Number(s.atributos?.[k])||1))+bonus[k];
    const armadura=({nenhuma:0,leve:1,media:2,pesada:3})[s.armadura]||0;
    const escudo=s.escudo==='sim'?1:0;
    return {atributos,bonus,defesa:10+Math.floor(atributos.destreza/2)+armadura+escudo,vida:this.vidaMax(atributos.constituicao)};
  },
  vidaMax(constituicao){return this.vidaBase+Math.max(1,Number(constituicao)||1)*this.vidaPorConstituicao;}
};
