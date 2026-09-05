/* ============================================================
   GEOGRAFIA DE VALÉDRIA — dados
   Reinos humanos, cidade livre, e visão geral das terras élficas,
   anãs e demoníacas.
   ============================================================ */
window.REINOS = [
  {
    nome: "Reino de Valmeira", regiao: "Sul e litoral",
    descricao: "Reino costeiro voltado ao comércio marítimo, governado pelo Rei Halvard a partir da capital Portovale. Enfrenta descontentamento de nobres do interior, que sentem o reino negligenciar vilas afastadas como Amieiro.",
    img: "assets/img/geografia/reino-de-valmeira.jpg",
    cidades: [
      { nome: "Amieiro", tipo: "Vila inicial", populacao: "150–250 habitantes", descricao: "Pequena vila agrícola no interior de Valmeira, cercada por campos de trigo, um riacho e a borda de uma floresta antiga. Vive de agricultura, pesca de rio e pequeno artesanato, sem muralhas, apenas cercas de madeira. Locais: taverna com quartos simples, forja pequena, capela de pedra, moinho junto ao rio e feira semanal. Não há guarda oficial — a ordem é mantida por um chefe de vila e voluntários armados.", img: "assets/img/locais/amieiro-vila.jpg" },
      { nome: "Ponte Alta", tipo: "Primeira cidade da rota", populacao: "1.200–2.000 habitantes", descricao: "Construída ao redor de uma ponte de pedra sobre o rio principal da região, com muralha baixa parcial e mercado diário que atende caravanas fluviais e terrestres. Locais: mercado coberto, doca fluvial com barcaças de carga, ferraria, oficina de carpintaria, igreja de pedra, guarda municipal pequena e uma taverna-estalagem de dois andares.", img: "assets/img/locais/ponte-alta-vista-aerea.jpg" },
      { nome: "Portovale", tipo: "Capital de Valmeira", populacao: "Acima de 15.000 habitantes", descricao: "Erguida na foz de um grande rio, com porto marítimo ativo, muralhas completas, alfândega real e o Palácio de Valmeira. A cidade mais cosmopolita entre os reinos humanos, com bairros de mercadores estrangeiros e frequente presença de elfos costeiros em negócios comerciais." },
      { nome: "Vaudessa, Trigal, Bosque Alto e Ribamar", tipo: "Povoados regionais", populacao: "Variável", descricao: "Vaudessa é um povoado de vinhedos e criação de cavalos entre Amieiro e a costa. Trigal funciona como celeiro regional, abastecendo Ponte Alta e Portovale. Bosque Alto é um posto madeireiro na borda da floresta élfica, com relação comercial direta e cautelosa com os elfos da floresta. Ribamar é um pequeno porto pesqueiro na costa sul." }
    ]
  },
  {
    nome: "Reino de Cárdenas", regiao: "Central",
    descricao: "Reino militarista governado pela Rainha Ismalda a partir da fortaleza-capital Cárdenas Alta, respeitada pela disciplina, mas criticada por gastar recursos excessivos em expedições contra o Bestiário enquanto estradas comerciais seguem inseguras.",
    img: "assets/img/geografia/reino-de-cardenas.jpg",
    cidades: [
      { nome: "Cárdenas Alta", tipo: "Capital de Cárdenas", populacao: "Cerca de 10.000 habitantes", descricao: "Cidade-fortaleza erguida sobre uma colina, com muralhas duplas, guarnição permanente e o Castelo de Cárdenas no ponto mais alto. Forte presença militar e recrutamento constante para expedições contra ameaças do Bestiário." },
      { nome: "Academia de Valédria", tipo: "Cidade-campus neutra", populacao: "Variável", descricao: "Dedicada ao ensino de Magia Externa, com torres de estudo separadas por escola (Água, Terra, Fogo, Ar, Espacial, Barreiras e Cura), biblioteca central e ala diplomática usada por representantes dos três reinos humanos. Não pertence oficialmente a nenhum reino, protegida por tratado comum." },
      { nome: "Poço Fundo, Feira Nova, Torre de Aldenor e Cruzeiro do Sul", tipo: "Povoados e postos regionais", populacao: "Variável", descricao: "Poço Fundo é uma vila mineira próxima a poços antigos e ruínas menores. Feira Nova é uma cidade mercantil de médio porte em cruzamento de estradas, ponto de encontro de caravanas de todos os reinos. Torre de Aldenor é uma fortaleza de vigia e estação de mensageiros. Cruzeiro do Sul é um entroncamento com hospedarias." }
    ]
  },
  {
    nome: "Reino de Ostenfeld", regiao: "Norte",
    descricao: "Reino governado pelo Rei Bortan, mantendo relação cautelosa com os clãs anões. É o mais dependente de comércio exterior entre os três monarcas, já que tem menos terra agricultável que os vizinhos.",
    img: "assets/img/geografia/reino-de-ostenfeld.jpg",
    cidades: [
      { nome: "Montegris", tipo: "Capital de Ostenfeld", populacao: "Variável", descricao: "Construída em terraços de pedra na base das montanhas, misturando arquitetura humana com técnicas de construção anãs, com ruas em degraus e edifícios parcialmente escavados na rocha. Principal ponto de comércio entre humanos e clãs anões, embora as relações variem conforme o clã." },
      { nome: "Pedrafria e Vigília Branca", tipo: "Cidade mineira e fortaleza", populacao: "Variável", descricao: "Pedrafria é uma cidade mineira e posto de fronteira nas passagens montanhosas. Vigília Branca é uma fortaleza que protege as rotas humanas contra incursões vindas das montanhas." }
    ]
  }
];

window.ENCRUZILHADA = {
  nome: "Cidade Livre de Encruzilhada", regiao: "Ponto de encontro entre Terras Humanas, Élficas e Demoníacas",
  descricao: "Única grande cidade aberta oficialmente a todas as raças, governada por um conselho formado por representantes eleitos de cada comunidade residente — humanos, elfos, anões e demônios —, sem exército de nenhum reino, apenas uma guarda mista mantida pelo conselho. Conflitos armados dentro da cidade são considerados quebra grave do tratado de neutralidade.",
  img: "assets/img/geografia/encruzilhada.jpg",
  cidades: [
    { nome: "Ponte Rubra", tipo: "Cidade-guarnição", descricao: "Cobra passagem de caravanas rumo às Terras Demoníacas." },
    { nome: "Limiar de Cinzas", tipo: "Último assentamento humano antes do deserto", descricao: "Posto avançado de comércio e vigilância na fronteira com as Terras Demoníacas." }
  ]
};

window.TERRAS_OUTROS_POVOS = [
  {
    nome: "Terras Élficas", regiao: "Oeste do continente — \"Floresta Eterna, antiga e selvagem\"",
    descricao: "Cobertas por floresta densa e antiga. A sociedade élfica se divide em Elfos da Floresta (interior arborizado, conselhos de anciãos ligados a linhagens antigas), Elfos Negros (áreas sombrias e isoladas, raramente vistos em terras humanas) e Elfos Costeiros (borda litorânea, mais acostumados a comércio com humanos). Bosque Alto, na borda humana da floresta, é o principal ponto de contato comercial, trocando madeira e produtos florestais élficos por ferramentas e grãos humanos.",
    img: "assets/img/geografia/terras-elficas.jpg"
  },
  {
    nome: "Terras dos Anões", regiao: "Extremo norte — \"Montanhas Eternas, forjadas em Pedra e Céu\"",
    descricao: "Região de picos altíssimos, escavada por túneis e salões subterrâneos que conectam clãs distantes sem exposição à superfície. Três clãs mantêm relação direta de comércio com Ostenfeld: Clã Ferro-Fundo (favorável ao comércio aberto), Clã Veio-Negro (pragmático, condições rígidas) e Clã Pedra-Funda (tradicionalista, desconfiado de humanos). Cada clã é governado por um Alto Ferreiro ou Alta Matriarca, com decisões tomadas em conselho — a honra e a palavra dada têm peso quase sagrado na cultura anã.",
    img: "assets/img/geografia/terras-dos-anoes.jpg"
  },
  {
    nome: "Terras Demoníacas", regiao: "Extremo leste — \"Deserto Ardente, Areias da Maldição\"",
    descricao: "Região árida, marcada por ruínas antigas e magia corrompida ou esquecida. Diferente de humanos, elfos e anões, os demônios não organizam sua sociedade em reinos territoriais fixos, mas em linhagens de poder que competem entre si — prestígio pessoal, força e linhagem substituem a nobreza hereditária. O contato oficial com o resto do continente ocorre quase exclusivamente via Encruzilhada e postos de fronteira como Ponte Rubra e Limiar de Cinzas.",
    img: "assets/img/geografia/terras-demoniacas.jpg"
  }
];

window.ROTAS_COMERCIAIS = [
  { nome: "Rota Fluvial do Sul", trecho: "Amieiro → Ponte Alta → Portovale", descricao: "Liga o interior agrícola ao porto principal do reino de Valmeira." },
  { nome: "Rota Terrestre Central", trecho: "Feira Nova → Cruzeiro do Sul → Cárdenas Alta", descricao: "Conecta o centro comercial do continente à capital militar de Cárdenas." },
  { nome: "Rota Norte", trecho: "Cárdenas → Montegris → Pedrafria", descricao: "Garante o fluxo de minério e produtos anões para o resto do reino." }
];
