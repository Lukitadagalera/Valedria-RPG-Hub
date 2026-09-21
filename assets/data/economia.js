window.MOEDAS = [
  {
    "moeda": "Coroa de cobre (CC)",
    "metal": "Cobre, com o brasão do reino emissor",
    "valor": "Menor unidade: 1 CC",
    "uso": "Pão, velas, refeições, pedágios e salários cotidianos. Não há frações de moeda."
  },
  {
    "moeda": "Coroa de prata (CP)",
    "metal": "Prata, com o brasão do reino emissor",
    "valor": "1 CP = 100 CC",
    "uso": "Armas, armaduras, montarias, pagamentos de guildas e compras de maior valor."
  },
  {
    "moeda": "Coroa de ouro (CO)",
    "metal": "Ouro, com o brasão do reino emissor",
    "valor": "1 CO = 100 CP = 10.000 CC",
    "uso": "Imóveis, navios, títulos de nobreza menor e grandes contratos. Rara no cotidiano das vilas."
  }
];

window.CUSTO_DE_VIDA = [
  {
    "item": "Pão de vila (unidade)",
    "custo": "1 CC"
  },
  {
    "item": "Vela comum (unidade)",
    "custo": "1 CC"
  },
  {
    "item": "Refeição simples",
    "custo": "4 CC"
  },
  {
    "item": "Cerveja comum (caneca)",
    "custo": "2 CC"
  },
  {
    "item": "Ração de viagem (1 dia)",
    "custo": "5 CC"
  },
  {
    "item": "Diária em estalagem (simples)",
    "custo": "10 CC"
  },
  {
    "item": "Diária em estalagem (privada)",
    "custo": "30 CC"
  },
  {
    "item": "Pedágio a pé",
    "custo": "1 CC"
  },
  {
    "item": "Passagem em barcaça fluvial",
    "custo": "15 CC a 30 CC por trecho"
  },
  {
    "item": "Espada longa",
    "custo": "1 CP e 50 CC"
  },
  {
    "item": "Gibão de couro",
    "custo": "1 CP e 20 CC"
  },
  {
    "item": "Cota de malha",
    "custo": "8 CP"
  },
  {
    "item": "Armadura de placas (básica)",
    "custo": "25 CP"
  },
  {
    "item": "Cavalo de trabalho",
    "custo": "6 CP"
  },
  {
    "item": "Cavalo de montaria",
    "custo": "12 CP"
  },
  {
    "item": "Cavalo de guerra",
    "custo": "35 CP"
  },
  {
    "item": "Barco pequeno (uso fluvial)",
    "custo": "40 CP"
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
    "titulo": "Três reinos, três metais",
    "texto": "Valmeira, Cárdenas e Ostenfeld cunham suas próprias Coroas de cobre, prata e ouro, identificadas pelo brasão real. Moedas legítimas do mesmo metal e peso têm o mesmo valor nos três reinos. A emissão pertence à realeza; a circulação não é exclusiva dos nobres. Uma Coroa deve sempre ser identificada pelo metal. Escudos não são moeda."
  },
  {
    "titulo": "Troco sem frações",
    "texto": "1 CP vale 100 CC; 1 CO vale 100 CP. Uma espada de 1 CP e 50 CC pode ser paga com 150 CC. Ao receber 2 CP, o vendedor devolve 50 CC. Calcule lotes, descontos e impostos em cobre e arredonde apenas o resultado final para CC inteiras; metade arredonda para cima. Cobranças positivas têm mínimo de 1 CC. Água de fonte pública continua gratuita."
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
    "titulo": "Salários e poder de compra",
    "texto": "Referências por dia de trabalho: ajudante rural ou carregador, 12 CC a 20 CC; artesão treinado, 30 CC a 60 CC; especialista, 80 CC a 1 CP e 50 CC. Considere apenas dias efetivamente trabalhados. Uma refeição simples custa 4 CC; hospedagem compartilhada com uma refeição custa 10 CC. Famílias que produzem parte do alimento gastam menos dinheiro, mas ainda pagam ferramentas, impostos e manutenção."
  },
  {
    "titulo": "Patrimônio e grandes compras",
    "texto": "Referências de compra, sujeitas à localização e ao estado do bem: casa simples em vila, 1 CO e 20 CP a 2 CO e 50 CP; oficina equipada, 3 CO a 6 CO; residência urbana, 5 CO a 12 CO; navio mercante, 15 CO a 40 CO. Incluem apenas o bem descrito: pessoal, tributos, estoque e manutenção são despesas adicionais."
  },
  {
    "titulo": "O peso do ouro",
    "texto": "Uma Coroa de ouro equivale a 10.000 de cobre: não é troco de taverna. Uma casa simples custa de 1 CO e 20 CP a 2 CO e 50 CP; um navio mercante, de 15 CO a 40 CO. Grandes contratos registram metal, quantidade, emissor e obrigações. Joias e metais em bruto são avaliados como mercadorias, não como moedas cunhadas."
  },
  {
    "titulo": "Elfos — partilha e preservação",
    "texto": "Nas comunidades élficas, alimento, ferramentas e abrigo são partilhados conforme a necessidade e a contribuição de cada pessoa. A coleta respeita a regeneração da floresta; reparar, reutilizar e evitar desperdícios importa mais do que acumular riqueza. Visitantes combinam contribuições, serviços ou trocas autorizadas. Em Eryndal, comerciantes de fronteira podem aceitar Coroas humanas para negócios externos; isso não transforma a vida comunitária em um mercado monetário."
  },
  {
    "titulo": "Anões — o ouro branco das montanhas",
    "texto": "Os clãs usam entre si moedas de ouro branco, cunhadas com um minério único de suas montanhas. Esse ouro branco não é platina nem uma liga humana: é um material próprio de Valédria. O minério, sua técnica de cunhagem e as moedas não são compartilhados nem exportados para fora das montanhas. Não há conversão pública fixa com as Coroas. Mercadores autorizados negociam bens de exportação por Coroas ou escambo nas fronteiras, sem entregar ouro branco; visitantes acertam serviços e mercadorias com um intermediário do clã."
  },
  {
    "titulo": "Demônios — valor pactuado",
    "texto": "Nos territórios demoníacos, o comércio se baseia em escambo: serviços, objetos de valor, provisões, proteção e conhecimentos. Cada troca é negociada segundo a necessidade local, o risco, a qualidade e a reputação. Serviços futuros devem ter tarefa, prazo e contrapartida claros. Ouro humano pode interessar como objeto valioso, mas uma Coroa não tem aceitação automática como moeda. Não existe taxa fixa que converta todos os favores em dinheiro."
  },
  {
    "titulo": "Mercados entre povos",
    "texto": "O catálogo apresenta preços de referência nos reinos humanos e em mercados que aceitam Coroas, como Encruzilhada. Não impõe esses preços à partilha élfica, ao ouro branco anão ou ao escambo demoníaco. Antes de fechar negócio, confirme o que a comunidade aceita. Em Encruzilhada circulam bens autorizados dos clãs, nunca seu ouro branco."
  },
  {
    "titulo": "Ascensão comprada, com limite",
    "texto": "Um plebeu pode prosperar como artesão ou mercador e comprar um título de nobreza menor quando a autoridade do reino o disponibiliza e reconhece. A carta deve registrar direitos, deveres, impostos e eventual hereditariedade; terras não estão automaticamente incluídas. O preço depende do título e do reino e é uma negociação alta em ouro. Dinheiro não compra alta nobreza nem realeza: não importa a fortuna acumulada, a ascensão por compra termina na nobreza menor."
  }
];
