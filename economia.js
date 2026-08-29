/* ============================================================
   ECONOMIA DE VALÉDRIA — dados
   Sistema monetário, custo de vida e regras de comércio.
   ============================================================ */
window.MOEDAS = [
  { moeda: "Cobre (C)", metal: "Cobre", valor: "1 Cobre", uso: "Compras miúdas: pão, cerveja, taxas de estrada" },
  { moeda: "Prata (P)", metal: "Prata", valor: "1 Prata = 10 Cobre", uso: "Hospedagem, refeições, ferramentas, serviços comuns" },
  { moeda: "Ouro (O)", metal: "Ouro", valor: "1 Ouro = 10 Prata = 100 Cobre", uso: "Armas, armaduras, montarias, negócios de mercador" },
  { moeda: "Coroa", metal: "Ouro (emissão real)", valor: "1 Coroa = 5 Ouro", uso: "Transações grandes, impostos reais e pagamentos de nobreza. Cada reino (Valmeira, Cárdenas, Ostenfeld) emite sua própria Coroa, de mesmo valor entre si mas com brasão distinto." }
];

window.CUSTO_DE_VIDA = [
  { item: "Refeição simples", custo: "2 a 4 Cobre" },
  { item: "Cerveja ou vinho comum", custo: "1 a 2 Cobre" },
  { item: "Quarto simples em taverna (noite)", custo: "3 a 5 Prata" },
  { item: "Quarto de luxo em cidade grande", custo: "1 a 2 Ouro" },
  { item: "Cavalo de trabalho", custo: "8 a 12 Ouro" },
  { item: "Cavalo de guerra treinado", custo: "25 Ouro ou mais" },
  { item: "Espada simples de ferro", custo: "10 a 15 Ouro" },
  { item: "Armadura de couro", custo: "5 a 8 Ouro" },
  { item: "Armadura de placas completa", custo: "50 Ouro ou mais" },
  { item: "Passagem em barcaça fluvial", custo: "2 a 4 Prata por trecho" },
  { item: "Taxa de pedágio em ponte ou cidade murada", custo: "1 Cobre a 1 Prata" }
];

window.COMERCIO_POR_REGIAO = [
  { regiao: "Valmeira", exporta: "Peixe salgado, sal, vinho, tecidos e produtos de porto trazidos por navios estrangeiros." },
  { regiao: "Cárdenas", exporta: "Grãos, gado e ferramentas agrícolas; atua como intermediária comercial entre o sul e o norte." },
  { regiao: "Ostenfeld", exporta: "Minério bruto, metais trabalhados e produtos de técnica anã, como ferramentas e ligas metálicas raras." },
  { regiao: "Academia de Valédria", exporta: "Pergaminhos, componentes mágicos e itens ligados às escolas de magia, vendidos a preços elevados e sujeitos a autorização dos anciãos." },
  { regiao: "Encruzilhada", exporta: "Único ponto onde madeira élfica, artefatos anões de clãs fechados e itens de origem demoníaca circulam livremente entre comerciantes de todas as raças." }
];

window.REGRAS_COMERCIO = [
  { titulo: "Moeda fora dos reinos humanos", texto: "Anões, elfos e demônios não usam necessariamente o mesmo sistema. Em Montegris e Pedrafria, comerciantes anões preferem pagamento em barras de metal bruto ou trocam bens por bens, aceitando moeda humana com pequeno desconto. Em Encruzilhada, o conselho fixa taxas de câmbio mensais entre a moeda humana e os meios de troca élficos e demoníacos." },
  { titulo: "Impostos e guildas", texto: "Cada reino cobra impostos próprios sobre mercadorias que cruzam suas fronteiras internas, pagos em postos de pedágio (Ponte Alta, Ponte Rubra, muralhas de Portovale e Cárdenas Alta). Mercadores organizados em guildas locais recebem descontos ou isenções parciais." },
  { titulo: "Contrabando", texto: "Existe principalmente em rotas menos vigiadas entre Valmeira e Cárdenas, tolerado silenciosamente em vilas pequenas como Trigal e Poço Fundo. Em Encruzilhada, o conselho multirracial pune contrabando com dureza, pois a cidade depende da confiança comercial de todas as raças." }
];
