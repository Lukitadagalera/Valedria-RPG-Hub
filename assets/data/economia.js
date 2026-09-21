/* Economia de Valédria — unidade única: Coroa (C). */
window.MOEDAS = [
  {
    "moeda": "Coroa inteira (C)",
    "metal": "Ouro, emissão real",
    "valor": "1,000 C",
    "uso": "Peça de circulação reservada às tesourarias reais, tributos e pagamentos autorizados pela realeza. Não é troco de feira."
  },
  {
    "moeda": "Frações de coroa",
    "metal": "Ligas de cobre ou prata, com valor nominal marcado",
    "valor": "0,001; 0,005; 0,010; 0,050; 0,100 e 0,500 C",
    "uso": "Salários, mantimentos, hospedagem e comércio cotidiano. São denominações da Coroa, sem nomes de moedas separados."
  }
];

window.SALARIOS = [
  {
    "oficio": "Trabalhador comum",
    "diaria": "0,010 C",
    "mensal": "0,260 C"
  },
  {
    "oficio": "Artesão qualificado",
    "diaria": "0,020 C",
    "mensal": "0,520 C"
  },
  {
    "oficio": "Especialista contratado",
    "diaria": "0,040 C",
    "mensal": "1,040 C"
  }
];
window.CUSTO_DE_VIDA = [
  {
    "item": "Moradia e alimentação modestas (adulto, mês)",
    "custo": "0,180–0,240 C; vida residente, sem dependentes"
  },
  {
    "item": "Refeição simples",
    "custo": ""
  },
  {
    "item": "Ração de viagem (1 dia)",
    "custo": ""
  },
  {
    "item": "Diária em estalagem (simples)",
    "custo": ""
  },
  {
    "item": "Diária em estalagem (privada)",
    "custo": ""
  },
  {
    "item": "Cavalo de trabalho",
    "custo": ""
  },
  {
    "item": "Cavalo de guerra",
    "custo": ""
  },
  {
    "item": "Espada longa",
    "custo": ""
  },
  {
    "item": "Gibão de couro",
    "custo": ""
  },
  {
    "item": "Armadura de placas (básica)",
    "custo": ""
  },
  {
    "item": "Passagem em barcaça fluvial",
    "custo": ""
  },
  {
    "item": "Pedágio de ponte (pedestre)",
    "custo": ""
  }
];
window.COMERCIO_POR_REGIAO = [
  { regiao: "Valmeira", exporta: "Peixe salgado, sal, vinho, tecidos e produtos de porto trazidos por navios estrangeiros." },
  { regiao: "Cárdenas", exporta: "Grãos, gado e ferramentas agrícolas; atua como intermediária comercial entre o sul e o norte." },
  { regiao: "Ostenfeld", exporta: "Minério bruto, metais trabalhados e produtos de técnica anã, como ferramentas e ligas metálicas raras." },
  { regiao: "Academia de Valédria", exporta: "Pergaminhos, componentes mágicos e itens ligados às escolas de magia, vendidos a preços elevados e sujeitos a autorização dos anciãos." },
  { regiao: "Encruzilhada", exporta: "Único ponto onde madeira élfica, artefatos anões de clãs fechados e itens de origem demoníaca circulam livremente entre comerciantes de todas as raças." }
];

window.REGRAS_COMERCIO = [
  {
    "titulo": "Uma unidade, diferentes denominações",
    "texto": "Todo preço, salário, dívida e recompensa é expresso em Coroa (C). A menor fração é 0,001 C. Mil peças desse valor somam 1 C; cem peças de 0,010 C também. As frações são cunhadas com valor nominal: ninguém corta uma coroa de ouro para pagar pão. Cobre, prata e ouro designam materiais, não moedas paralelas. As antigas tabelas de Escudos deixam de valer; preços foram reequilibrados item a item."
  },
  {
    "titulo": "O peso de uma coroa inteira",
    "texto": "Valmeira, Cárdenas e Ostenfeld emitem coroas de igual valor, identificadas por seus brasões. A peça inteira de ouro é moeda da realeza: passa pelas tesourarias e por grandes pagamentos com origem registrada. Um plebeu pode receber o valor de uma coroa em frações; receber a peça real é excepcional e exige uma origem na história. Comerciantes comuns não são obrigados a aceitá-la nem dispõem de troco. Casas de câmbio autorizadas verificam a peça e registram sua troca por frações; eventual taxa deve ser informada antes."
  },
  {
    "titulo": "Salário não é dinheiro disponível",
    "texto": "Uma diária de trabalho comum vale 0,010 C. Assim, 1 C representa 100 diárias brutas, quase quatro meses com 26 dias pagos; 4 C representam 400 diárias. Alimentação, moradia, dependentes e dias sem trabalho reduzem a poupança. Uma dívida de várias coroas pode comprometer uma família por anos. Oferecer uma coroa por um recado seria extraordinário e precisaria de justificativa."
  },
  {
    "titulo": "Comércio entre povos",
    "texto": "Todos os valores publicados, inclusive em Eryndal, Kholdrynn, Skral e Encruzilhada, usam coroas. Fora dos mercados autorizados, povos podem preferir escambo; avaliam-se ambos os bens em C e negocia-se a diferença, sem criar outra moeda. Metal bruto é mercadoria avaliada por peso e qualidade. O conselho de Encruzilhada regula avaliação, procedência e tributos."
  },
  {
    "titulo": "Preço, escassez e revenda",
    "texto": "O catálogo representa compra em mercado abastecido. Qualidade, fabricação especializada, importação e falta de estoque justificam diferenças informadas pelo mestre; uma vila pode cobrar até 50% a mais por escassez. Revenda não equivale ao preço de compra: depende de conservação, procura e margem do comprador. Some a compra antes de arredondar ao múltiplo mais próximo de 0,001 C; empate arredonda para cima."
  },
  {
    "titulo": "Impostos e guildas",
    "texto": "Cada reino cobra tributos em coroas ou suas frações nos postos de pedágio. Pedágio de pedestre não inclui carroça, montaria nem tributo sobre carga. Guildas podem obter isenções. Recompensas indicam se o valor é individual ou do grupo; a taxa de 10% da Guilda é descontada antes da divisão."
  },
  {
    "titulo": "Artefatos e pagamentos extraordinários",
    "texto": "O catálogo básico cobre equipamentos sem magia. Artefatos não recebem um preço comum por comparação com armas de ferro: sua negociação depende de raridade, efeito, procedência e autorização. Uma avaliação de várias coroas precisa de comprador capaz de pagar, explicação de origem e consequência econômica para quem recebe."
  },
  {
    "titulo": "Contrabando",
    "texto": "Rotas menos vigiadas entre Valmeira e Cárdenas concentram comércio não declarado. Em Encruzilhada, o conselho pune esse comércio para preservar a confiança entre os povos. A unificação da moeda não elimina alfândegas, fiscalização ou restrições sobre mercadorias."
  }
];

// Shared catalog is loaded first: overlapping prices have one source.
window.CUSTO_DE_VIDA.forEach(function(row){var item=window.ITENS_BASICOS.find(function(x){return x.nome===row.item;});if(item)row.custo=item.preco;});
