/* ============================================================
   GEOGRAFIA DE VALÉDRIA — dados
   Reinos humanos, cidade livre, e visão geral das terras élficas,
   anãs e demoníacas.
   ============================================================ */
window.REINOS = [
  {
    "nome": "Reino de Valmeira",
    "regiao": "Sul e litoral",
    "descricao": "Reino costeiro voltado ao comércio marítimo, governado pelo Rei Halvard a partir da capital Portovale. Enfrenta descontentamento de nobres do interior, que sentem o reino negligenciar vilas afastadas como Amieiro.",
    "img": "assets/img/geografia/reino-de-valmeira.png.webp",
    "cidades": [
      {
        "nome": "Amieiro",
        "tipo": "Vila inicial",
        "populacao": "150–250 habitantes",
        "descricao": "Pequena vila agrícola no interior de Valmeira, cercada por campos de trigo, um riacho e a borda de uma floresta antiga. Vive de agricultura, pesca de rio e pequeno artesanato, sem muralhas, apenas cercas de madeira. Locais: taverna com quartos simples, forja pequena, capela de pedra, moinho junto ao rio e feira semanal. Não há guarda oficial — a ordem é mantida por um chefe de vila e voluntários armados.",
        "img": "assets/img/locais/amieiro-vila.png.webp",
        "localizacao": "Interior, na rota fluvial que segue para Ponte Alta."
      },
      {
        "nome": "Ponte Alta",
        "tipo": "Primeira cidade da rota",
        "populacao": "1.200–2.000 habitantes",
        "descricao": "Construída ao redor de uma ponte de pedra sobre o rio principal da região, com muralha baixa parcial e mercado diário que atende caravanas fluviais e terrestres. Locais: mercado coberto, doca fluvial com barcaças de carga, ferraria, oficina de carpintaria, igreja de pedra, guarda municipal pequena e uma taverna-estalagem de dois andares.",
        "img": "assets/img/locais/ponte-alta-vista-aerea.png.webp",
        "localizacao": "Entre o interior agrícola e a capital, na travessia do rio principal."
      },
      {
        "nome": "Portovale",
        "tipo": "Capital de Valmeira",
        "populacao": "Acima de 15.000 habitantes",
        "descricao": "Erguida na foz de um grande rio, com porto marítimo ativo, muralhas completas, alfândega real e o Palácio de Valmeira. A cidade mais cosmopolita entre os reinos humanos, com bairros de mercadores estrangeiros e frequente presença de elfos costeiros em negócios comerciais.",
        "localizacao": "Litoral sul, na foz do grande rio."
      },
      {
        "nome": "Vaudessa",
        "tipo": "Vila de vinhedos",
        "populacao": "450–650 habitantes",
        "localizacao": "Entre Amieiro e a costa, fora da estrada principal.",
        "descricao": "Vinhedos e pastagens cercam um povoado conhecido pela criação de cavalos. Adegas familiares, um curral de leilões e uma hospedaria recebem tropeiros; trilhas entre as propriedades permitem viajar pelo interior sem passar pelos grandes mercados."
      },
      {
        "nome": "Trigal",
        "tipo": "Vila agrícola",
        "populacao": "600–900 habitantes",
        "localizacao": "Planícies entre Ponte Alta e Portovale.",
        "descricao": "Celeiro regional que abastece as duas cidades com grãos e farinha. Silos comunitários, moinhos e uma feira de sementes concentram a vida local. Durante a colheita, caravanas procuram escolta para levar os carregamentos até o rio."
      },
      {
        "nome": "Bosque Alto",
        "tipo": "Vila de fronteira florestal",
        "populacao": "250–400 habitantes",
        "localizacao": "Extremo interior, junto à borda das terras élficas.",
        "descricao": "Posto madeireiro com comércio direto e cauteloso com os elfos. Serrarias, depósitos de ferramentas e uma casa de negociação ocupam a clareira humana. Guias conhecem as trilhas permitidas; entrar mais fundo na floresta depende de entendimento com seus habitantes."
      },
      {
        "nome": "Ribamar",
        "tipo": "Vila pesqueira",
        "populacao": "350–550 habitantes",
        "localizacao": "Costa sul, afastada do porto da capital.",
        "descricao": "Barcos pequenos encontram abrigo em uma enseada rochosa. Vive da pesca e da salga; possui um cais de madeira, oficina de redes e um farol mantido pelas famílias locais. Grutas costeiras e bancos de areia tornam a navegação uma tarefa para quem conhece as marés."
      },
      {
        "nome": "Vila dos Arcos",
        "tipo": "Cidade de abastecimento",
        "populacao": "3.000–4.000 habitantes",
        "localizacao": "A um dia de estrada de Portovale, antes da entrada na capital.",
        "descricao": "Apesar do nome antigo, cresceu em torno dos arcos de um aqueduto e tornou-se cidade de armazéns e oficinas. Mercadores reorganizam cargas aqui antes da alfândega real. Estábulos, oleiros e mercados de alimentos oferecem trabalho e alojamento mais acessível que o porto."
      },
      {
        "nome": "Salinas da Coroa",
        "tipo": "Cidade salineira",
        "populacao": "2.000–3.000 habitantes",
        "localizacao": "Litoral próximo a Portovale, ligada à capital por estrada costeira.",
        "descricao": "Tanques rasos produzem o sal usado na conservação de pescado e nas viagens marítimas. Um pequeno forte protege os depósitos; barqueiros atravessam os canais entre salinas. Contratos de transporte e disputas pelo uso da água atraem negociadores e escoltas."
      },
      {
        "nome": "Junco Velho",
        "tipo": "Vila ribeirinha afastada",
        "populacao": "120–180 habitantes",
        "localizacao": "Alto curso de um afluente, a vários dias de Ponte Alta.",
        "descricao": "Casas sobre pilares margeiam brejos onde se colhem juncos e ervas. Uma balsa comunitária é a principal ligação com a estrada seca. Na época das cheias, visitantes dependem de canoas e guias locais para alcançar fazendas isoladas."
      }
    ]
  },
  {
    "nome": "Reino de Cárdenas",
    "regiao": "Central",
    "descricao": "Reino militarista governado pela Rainha Ismalda a partir da fortaleza-capital Cárdenas Alta, respeitada pela disciplina, mas criticada por gastar recursos excessivos em expedições contra o Bestiário enquanto estradas comerciais seguem inseguras.",
    "img": "assets/img/geografia/reino-de-cardenas.png.webp",
    "cidades": [
      {
        "nome": "Cárdenas Alta",
        "tipo": "Capital de Cárdenas",
        "populacao": "Cerca de 10.000 habitantes",
        "descricao": "Cidade-fortaleza erguida sobre uma colina, com muralhas duplas, guarnição permanente e o Castelo de Cárdenas no ponto mais alto. Forte presença militar e recrutamento constante para expedições contra ameaças do Bestiário.",
        "localizacao": "Colina fortificada no centro do reino, ligada às estradas militares."
      },
      {
        "nome": "Academia de Valédria",
        "tipo": "Cidade-campus neutra",
        "populacao": "Variável",
        "descricao": "Dedicada ao ensino de Magia Externa, com torres de estudo separadas por escola (Água, Terra, Fogo, Ar, Espacial, Barreiras e Cura), biblioteca central e ala diplomática usada por representantes dos três reinos humanos. Não pertence oficialmente a nenhum reino, protegida por tratado comum.",
        "localizacao": "Região central, em território neutro protegido pelo tratado dos três reinos."
      },
      {
        "nome": "Poço Fundo",
        "tipo": "Vila mineira",
        "populacao": "300–500 habitantes",
        "localizacao": "Colinas afastadas das estradas da capital.",
        "descricao": "Mineiros trabalham perto de poços antigos e ruínas menores. Uma oficina de escoramento e um pátio de seleção de minério sustentam a vila. Galerias abandonadas são evitadas pelos moradores, que contratam exploradores quando um desabamento revela novas passagens."
      },
      {
        "nome": "Feira Nova",
        "tipo": "Cidade mercantil",
        "populacao": "4.000–6.000 habitantes",
        "localizacao": "No cruzamento das grandes estradas, ligada à capital por Cruzeiro do Sul.",
        "descricao": "Caravanas dos três reinos dividem um amplo mercado com cambistas, selarias e armazéns. Pátios de hospedagem permitem reunir grupos antes de partir. A guarda protege o mercado, mas os comboios precisam organizar sua própria segurança fora dos portões."
      },
      {
        "nome": "Torre de Aldenor",
        "tipo": "Fortaleza e povoado de vigia",
        "populacao": "200–350 habitantes",
        "localizacao": "Crista elevada que domina uma rota secundária do interior.",
        "descricao": "Uma torre de sinais e estação de mensageiros abrigam soldados, tratadores e suas famílias. O povoado oferece ferraduras, suprimentos e notícias das estradas. Patrulhas acompanham viajantes apenas nos trechos próximos à fortaleza."
      },
      {
        "nome": "Cruzeiro do Sul",
        "tipo": "Vila de passagem",
        "populacao": "500–750 habitantes",
        "localizacao": "Entroncamento da estrada entre Feira Nova e Cárdenas Alta.",
        "descricao": "Hospedarias, cozinhas de estrada e currais cercam um marco de pedra. É o último grande ponto de descanso de muitos comboios antes da capital. Carreteiros anunciam partidas em um pátio comum, ideal para encontrar transporte ou companhia de viagem."
      },
      {
        "nome": "Campo de Aço",
        "tipo": "Cidade de oficinas",
        "populacao": "2.500–3.500 habitantes",
        "localizacao": "Planície próxima a Cárdenas Alta, a um dia de marcha pelos portões baixos.",
        "descricao": "Ferreiros, curtidores e fabricantes de carroças abastecem a capital e suas guarnições. Campos de treino ficam fora das casas. Oficinas aceitam reparos e encomendas, enquanto intendentes contratam transporte de materiais vindos das regiões mineiras."
      },
      {
        "nome": "Ponte da Rainha",
        "tipo": "Cidade de travessia",
        "populacao": "2.000–3.000 habitantes",
        "localizacao": "Próxima à capital, sobre o rio que cruza sua estrada de abastecimento.",
        "descricao": "Uma ponte fortificada concentra o tráfego de grãos, ferramentas e tropas. Há um mercado sob arcadas, docas e uma casa de registros de carga. Viajantes podem seguir por estrada ou contratar uma barca, conforme o nível do rio."
      },
      {
        "nome": "Urze Baixa",
        "tipo": "Vila pastoril afastada",
        "populacao": "140–220 habitantes",
        "localizacao": "Charnecas do interior, a vários dias das grandes guarnições.",
        "descricao": "Pastores criam ovelhas entre colinas de urze. Um salão comunitário acolhe viajantes e serve de abrigo durante tempestades. Trilhas de pastoreio levam a velhos marcos de fronteira; guias da vila ajudam a atravessar a região sem perder os poucos pontos de água."
      },
      {
        "nome": "Santa Vigília",
        "tipo": "Vila de peregrinação",
        "populacao": "250–400 habitantes",
        "localizacao": "Vale remoto, acessível por uma ramificação da estrada de Aldenor.",
        "descricao": "Uma capela antiga e um albergue recebem peregrinos e famílias das fazendas próximas. Hortas e pequenos rebanhos mantêm o vale. A comunidade cuida de uma passagem estreita usada por viajantes que preferem evitar as estradas mais movimentadas."
      }
    ]
  },
  {
    "nome": "Reino de Ostenfeld",
    "regiao": "Norte",
    "descricao": "Reino governado pelo Rei Bortan, mantendo relação cautelosa com os clãs anões. É o mais dependente de comércio exterior entre os três monarcas, já que tem menos terra agricultável que os vizinhos.",
    "img": "assets/img/geografia/reino-de-ostenfeld.png.webp",
    "cidades": [
      {
        "nome": "Montegris",
        "tipo": "Capital de Ostenfeld",
        "populacao": "Variável",
        "descricao": "Construída em terraços de pedra na base das montanhas, misturando arquitetura humana com técnicas de construção anãs, com ruas em degraus e edifícios parcialmente escavados na rocha. Principal ponto de comércio entre humanos e clãs anões, embora as relações variem conforme o clã.",
        "localizacao": "Sopé das montanhas do norte, no encontro das rotas humanas e anãs."
      },
      {
        "nome": "Pedrafria",
        "tipo": "Cidade mineira de fronteira",
        "populacao": "2.000–3.000 habitantes",
        "localizacao": "Passagens montanhosas além de Montegris.",
        "descricao": "Minas e depósitos de minério dividem espaço com um posto de fronteira. A cidade recebe negociadores dos clãs anões conforme os acordos vigentes. Guias, animais de carga e oficinas de ferramentas são essenciais para quem pretende seguir pelas montanhas."
      },
      {
        "nome": "Vigília Branca",
        "tipo": "Fortaleza e povoado de guarnição",
        "populacao": "400–600 habitantes",
        "localizacao": "Desfiladeiro elevado nas rotas de acesso ao reino.",
        "descricao": "Protege as estradas humanas contra incursões vindas das montanhas. Famílias de soldados e fornecedores vivem junto às muralhas. Um abrigo para caravanas oferece refúgio quando neve ou deslizamentos interrompem a passagem."
      },
      {
        "nome": "Baixapedra",
        "tipo": "Cidade de entrepostos",
        "populacao": "3.000–4.000 habitantes",
        "localizacao": "Vale imediatamente abaixo dos terraços de Montegris.",
        "descricao": "Armazéns recebem grãos importados e distribuem minério, pedra e ferramentas. Carroças grandes descarregam aqui antes da subida para a capital. Pátios de contratação, hospedarias e oficinas fazem dela uma boa base para viagens ao norte."
      },
      {
        "nome": "Fornalha do Vale",
        "tipo": "Cidade de fundição",
        "populacao": "1.800–2.600 habitantes",
        "localizacao": "A um dia de Montegris, junto a um rio de corrente forte.",
        "descricao": "Rodas de água movem os equipamentos das oficinas humanas. Funde minério e produz ferragens, respeitando os contratos comerciais com os clãs. Visitantes encontram reparos especializados, transporte de carga e notícias trazidas pelos trabalhadores das minas."
      },
      {
        "nome": "Cedro Alto",
        "tipo": "Vila florestal",
        "populacao": "250–400 habitantes",
        "localizacao": "Encosta arborizada afastada das estradas de minério.",
        "descricao": "Carpinteiros e coletores de resina vivem entre bosques de altitude. A madeira segue em pequenos lotes para as construções do vale. Uma casa de guias orienta travessias por trilhas antigas, que se tornam difíceis durante o inverno."
      },
      {
        "nome": "Lago do Sino",
        "tipo": "Vila lacustre",
        "populacao": "180–280 habitantes",
        "localizacao": "Bacia montanhosa remota, além de uma passagem sazonal.",
        "descricao": "Pesca, lã e pequenas hortas sustentam casas reunidas em torno de um sino de aviso. Barcos ligam as margens enquanto a passagem está aberta. Viajantes precisam prever abrigo e mantimentos quando o frio isola a comunidade."
      },
      {
        "nome": "Vale Curto",
        "tipo": "Vila agrícola",
        "populacao": "350–500 habitantes",
        "localizacao": "Vale protegido dos ventos, no caminho sul para Montegris.",
        "descricao": "Uma das poucas áreas de cultivo mais favoráveis do reino produz legumes e cereais resistentes. Terraços irrigados, moinhos e celeiros abastecem a capital. Agricultores recebem comboios em uma feira onde também se contratam ajudantes e escoltas."
      },
      {
        "nome": "Passo das Cabras",
        "tipo": "Vila de montanha",
        "populacao": "100–160 habitantes",
        "localizacao": "Trilha alta entre vales, longe dos postos principais.",
        "descricao": "Criadores de cabras mantêm abrigos de pedra e produzem queijo para as caravanas menores. A vila oferece guias para atalhos estreitos, inadequados a carroças. Ruínas de um antigo abrigo de estrada marcam o início de uma travessia pouco frequentada."
      },
      {
        "nome": "Águas de Ferro",
        "tipo": "Povoado de fontes",
        "populacao": "220–320 habitantes",
        "localizacao": "Vale lateral de Pedrafria, junto a nascentes minerais.",
        "descricao": "Hospedarias simples recebem mineiros em descanso e viajantes das montanhas. Pontes de madeira cruzam córregos de água ferruginosa. Pequenas trilhas conectam pedreiras e acampamentos sazonais, oferecendo caminhos alternativos quando a rota principal fecha."
      }
    ]
  }
];

window.ENCRUZILHADA = {
  "nome": "Cidade Livre de Encruzilhada",
  "regiao": "Ponto de encontro entre Terras Humanas, Élficas e Demoníacas",
  "descricao": "Única grande cidade aberta oficialmente a todas as raças, governada por um conselho formado por representantes eleitos de cada comunidade residente — humanos, elfos, anões e demônios —, sem exército de nenhum reino, apenas uma guarda mista mantida pelo conselho. Conflitos armados dentro da cidade são considerados quebra grave do tratado de neutralidade.",
  "img": "assets/img/geografia/encruzilhada.png.webp",
  "cidades": [
    {
      "nome": "Ponte Rubra",
      "tipo": "Cidade-guarnição",
      "descricao": "Cobra passagem de caravanas rumo às Terras Demoníacas."
    },
    {
      "nome": "Limiar de Cinzas",
      "tipo": "Último assentamento humano antes do deserto",
      "descricao": "Posto avançado de comércio e vigilância na fronteira com as Terras Demoníacas."
    }
  ]
};

window.TERRAS_OUTROS_POVOS = [
  {
    "nome": "Terras Élficas",
    "regiao": "Oeste do continente — \"Floresta Eterna, antiga e selvagem\"",
    "descricao": "Cobertas por floresta densa e antiga. A sociedade élfica se divide em Elfos da Floresta (interior arborizado, conselhos de anciãos ligados a linhagens antigas), Elfos Negros (áreas sombrias e isoladas, raramente vistos em terras humanas) e Elfos Costeiros (borda litorânea, mais acostumados a comércio com humanos). Bosque Alto, na borda humana da floresta, é o principal ponto de contato comercial, trocando madeira e produtos florestais élficos por ferramentas e grãos humanos.",
    "img": "assets/img/geografia/terras-elficas.png"
  },
  {
    "nome": "Terras dos Anões",
    "regiao": "Extremo norte — \"Montanhas Eternas, forjadas em Pedra e Céu\"",
    "descricao": "Região de picos altíssimos, escavada por túneis e salões subterrâneos que conectam clãs distantes sem exposição à superfície. Três clãs mantêm relação direta de comércio com Ostenfeld: Clã Ferro-Fundo (favorável ao comércio aberto), Clã Veio-Negro (pragmático, condições rígidas) e Clã Pedra-Funda (tradicionalista, desconfiado de humanos). Cada clã é governado por um Alto Ferreiro ou Alta Matriarca, com decisões tomadas em conselho — a honra e a palavra dada têm peso quase sagrado na cultura anã.",
    "img": "assets/img/geografia/terras-dos-anoes.png"
  },
  {
    "nome": "Terras Demoníacas",
    "regiao": "Extremo leste — \"Deserto Ardente, Areias da Maldição\"",
    "descricao": "Região árida, marcada por ruínas antigas e magia corrompida ou esquecida. Diferente de humanos, elfos e anões, os demônios não organizam sua sociedade em reinos territoriais fixos, mas em linhagens de poder que competem entre si — prestígio pessoal, força e linhagem substituem a nobreza hereditária. O contato oficial com o resto do continente ocorre quase exclusivamente via Encruzilhada e postos de fronteira como Ponte Rubra e Limiar de Cinzas.",
    "img": "assets/img/geografia/terras-demoniacas.png"
  }
];

window.ROTAS_COMERCIAIS = [
  {
    "nome": "Rota Fluvial do Sul",
    "trecho": "Amieiro → Ponte Alta → Portovale",
    "descricao": "Liga o interior agrícola ao porto principal do reino de Valmeira."
  },
  {
    "nome": "Rota Terrestre Central",
    "trecho": "Feira Nova → Cruzeiro do Sul → Cárdenas Alta",
    "descricao": "Conecta o centro comercial do continente à capital militar de Cárdenas."
  },
  {
    "nome": "Rota Norte",
    "trecho": "Cárdenas → Montegris → Pedrafria",
    "descricao": "Garante o fluxo de minério e produtos anões para o resto do reino."
  },
  {
    "nome": "Circuito da Costa",
    "trecho": "Ribamar → Salinas da Coroa → Portovale",
    "descricao": "Liga pesca, produção de sal e comércio marítimo por caminhos costeiros e pequenos trajetos de barco."
  },
  {
    "nome": "Estrada dos Celeiros",
    "trecho": "Amieiro → Vaudessa → Trigal → Ponte Alta",
    "descricao": "Une as comunidades agrícolas de Valmeira; desvios rurais alcançam propriedades afastadas e a rota de Bosque Alto."
  },
  {
    "nome": "Cinturão da Capital",
    "trecho": "Campo de Aço → Cárdenas Alta → Ponte da Rainha",
    "descricao": "Estradas curtas concentram oficinas e abastecimento perto da capital de Cárdenas; caminhos secundários seguem para Aldenor e o interior."
  },
  {
    "nome": "Caminho dos Vales",
    "trecho": "Vale Curto → Baixapedra → Montegris → Pedrafria",
    "descricao": "Leva alimentos à capital do norte e conecta entrepostos às passagens de minério. As ramificações para vilas altas dependem das condições da estação."
  }
];
