/* Shared numeric rules: the sheet and reference tables use the same values. */
window.VALEDRIA_REGRAS={
  pontosIniciais:15,pontosPorNivel:5,nivelMaximo:10,vidaBase:5,vidaPorConstituicao:2,manaBase:50,
  manaCrescimento:{Estagnada:0,Comum:.10,Elevado:.20,Superior:.50,'Anomalia de Mana':1},
  folegoPorGrau:{Aprendiz:3,Guerreiro:4,Mestre:5,'Grande Mestre':8,Imperador:null,Deus:null},
  manaMax(nivel,potencial){const taxa=this.manaCrescimento[potencial]??this.manaCrescimento.Comum;return Math.round(this.manaBase*Math.pow(1+taxa,Math.max(0,Math.min(this.nivelMaximo,Number(nivel)||1)-1)));},
  vidaMax(constituicao){return this.vidaBase+Math.max(1,Number(constituicao)||1)*this.vidaPorConstituicao;}
};
