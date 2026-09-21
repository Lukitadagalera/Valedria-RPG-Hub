window.MOEDAS = [
  {
    "moeda": "Coroa (C)",
    "metal": "Liga de cobre e níquel, com selo real",
    "valor": "1 C é a unidade mínima de pagamento",
    "uso": "Moeda de circulação comum: alimentação, salários, equipamentos, impostos e grandes contratos. Valmeira, Cárdenas e Ostenfeld cunham exemplares com brasões próprios e igual valor. A realeza garante a emissão; qualquer pessoa pode usar coroas."
  }
];

window.CUSTO_DE_VIDA = [
  {
    "item": "Pão de vila (unidade)",
    "custo": "1 C"
  },
  {
    "item": "Vela comum (unidade)",
    "custo": "1 C"
  },
  {
    "item": "Refeição simples",
    "custo": "4 C"
  },
  {
    "item": "Cerveja comum (caneca)",
    "custo": "2 C"
  },
  {
    "item": "Ração de viagem (1 dia)",
    "custo": "5 C"
  },
  {
    "item": "Diária em estalagem (simples)",
    "custo": "10 C"
  },
  {
    "item": "Diária em estalagem (privada)",
    "custo": "30 C"
  },
  {
    "item": "Pedágio a pé",
    "custo": "1 C"
  },
  {
    "item": "Passagem em barcaça fluvial",
    "custo": "15 a 30 C por trecho"
  },
  {
    "item": "Espada longa",
    "custo": "150 C"
  },
  {
    "item": "Gibão de couro",
    "custo": "120 C"
  },
  {
    "item": "Cota de malha",
    "custo": "800 C"
  },
  {
    "item": "Armadura de placas (básica)",
    "custo": "2.500 C"
  },
  {
    "item": "Cavalo de trabalho",
    "custo": "600 C"
  },
  {
    "item": "Cavalo de montaria",
    "custo": "1.200 C"
  },
  {
    "item": "Cavalo de guerra",
    "custo": "3.500 C"
  },
  {
    "item": "Barco pequeno (uso fluvial)",
    "custo": "4.000 C"
  }
];

window.COMERCIO_POR_REGIAO = [
  {
    "regiao": "Valmeira",
    "exporta": "Peixe salgado, sal, vinho, tecidos e produtos de porto trazidos por navios estrangeiros."
  },
  {
    "regiao": "Cárdenas",
    "exporta": "Grãos, gado e ferramentas agrícolas; atua como intermediária comercial entre o sul e o norte."
  },
  {
    "regiao": "Ostenfeld",
    "exporta": "Minério bruto, metais trabalhados e produtos de técnica anã, como ferramentas e ligas metálicas raras."
  },
  {
    "regiao": "Academia de Valédria",
    "exporta": "Pergaminhos, componentes mágicos e itens ligados às escolas de magia, vendidos a preços elevados e sujeitos a autorização dos anciãos."
  },
  {
    "regiao": "Encruzilhada",
    "exporta": "Único ponto onde madeira élfica, artefatos anões de clãs fechados e itens de origem demoníaca circulam livremente entre comerciantes de todas as raças."
  }
];

window.REGRAS_COMERCIO = [
  {
    "titulo": "Uma moeda em todos os mercados",
    "texto": "Todos os preços, salários e contratos são expressos em coroas. Não há conversão entre cobre, prata, ouro e escudos: esses nomes podem identificar materiais ou patentes, mas não unidades monetárias. Nos mercados autorizados de Eryndal, Kholdrynn e Skral, a Coroa tem a mesma unidade de conta dos reinos humanos. Comunidades fechadas ainda podem exigir troca direta ou favores; bens oferecidos em troca são avaliados em coroas."
  },
  {
    "titulo": "Impostos e guildas",
    "texto": "Cada reino cobra impostos próprios sobre mercadorias que cruzam suas fronteiras internas, pagos em postos de pedágio (Ponte Alta, Ponte Rubra, muralhas de Portovale e Cárdenas Alta). Mercadores organizados em guildas locais recebem descontos ou isenções parciais."
  },
  {
    "titulo": "Contrabando",
    "texto": "Existe principalmente em rotas menos vigiadas entre Valmeira e Cárdenas, tolerado silenciosamente em vilas pequenas como Trigal e Poço Fundo. Em Encruzilhada, o conselho multirracial pune contrabando com dureza, pois a cidade depende da confiança comercial de todas as raças."
  },
  {
    "titulo": "O selo da realeza",
    "texto": "A importância real da Coroa está na autoridade que garante seu valor e pune falsificadores. A moeda comum é feita de liga resistente, sem depender do peso do ouro. A nobreza movimenta milhares ou dezenas de milhares de coroas; uma coroa isolada é dinheiro cotidiano. Joias e peças cerimoniais de ouro são bens avaliados separadamente."
  },
  {
    "titulo": "Salários e poder de compra",
    "texto": "Referências por dia de trabalho: ajudante rural ou carregador, 12 a 20 C; artesão treinado, 30 a 60 C; especialista, 80 a 150 C. Considere apenas dias efetivamente trabalhados. Uma refeição simples custa 4 C; hospedagem compartilhada com uma refeição custa 10 C. Famílias que produzem parte do alimento gastam menos dinheiro, mas ainda pagam ferramentas, impostos e manutenção."
  },
  {
    "titulo": "Patrimônio e grandes compras",
    "texto": "Referências de compra, sujeitas à localização e ao estado do bem: casa simples em vila, 12.000 a 25.000 C; oficina equipada, 30.000 a 60.000 C; residência urbana, 50.000 a 120.000 C; navio mercante, 150.000 a 400.000 C. Incluem apenas o bem descrito: pessoal, tributos, estoque e manutenção são despesas adicionais."
  },
  {
    "titulo": "Pagamentos e arredondamento",
    "texto": "Use apenas coroas inteiras. Para compras em lote, impostos e descontos, calcule sobre o total e arredonde uma única vez ao inteiro mais próximo, com metade arredondada para cima; cobranças positivas têm mínimo de 1 C. Água de fonte pública e favores gratuitos continuam sem custo. Grandes contratos podem ser liquidados por ordens de pagamento de uma casa de comércio, sempre denominadas em coroas."
  },
  {
    "titulo": "Referência para aventuras e histórias",
    "texto": "Uma coroa resolve uma compra pequena; dezenas cobrem despesas de viagem; centenas compram equipamento e remuneram missões; milhares representam montarias de guerra, embarcações e reservas importantes. Esta escala substitui as antigas tabelas de conversão. Ao adaptar uma história ou campanha antiga, reavalie cada compra, dívida e recompensa pelo bem ou trabalho envolvido, sem trocar apenas o nome da moeda."
  }
];
