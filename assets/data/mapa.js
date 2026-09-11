/* Coordinates calibrated to the approved antique map (1536 × 1024). */
window.MAPA_DIMENSOES = {largura:1536,altura:1024};
window.MAPA_IMAGEM = "assets/img/mapas/atlas-valedria-pergaminho.svg";
window.MAPA_PONTOS = [
  {
    "nome": "Amieiro",
    "tipo": "Vila inicial",
    "populacao": "150–250 habitantes",
    "descricao": "Pequena vila agrícola no interior de Valmeira, cercada por campos de trigo, um riacho e a borda de uma floresta antiga. Vive de agricultura, pesca de rio e pequeno artesanato, sem muralhas, apenas cercas de madeira. Locais: taverna com quartos simples, forja pequena, capela de pedra, moinho junto ao rio e feira semanal. Não há guarda oficial — a ordem é mantida por um chefe de vila e voluntários armados.",
    "img": "assets/img/locais/amieiro-vila.png.webp",
    "localizacao": "Interior, na rota fluvial que segue para Ponte Alta.",
    "reino": "Reino de Valmeira",
    "id": "local-1",
    "numero": 1,
    "x": 58.59375,
    "y": 61.328125,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  },
  {
    "nome": "Ponte Alta",
    "tipo": "Primeira cidade da rota",
    "populacao": "1.200–2.000 habitantes",
    "descricao": "Construída ao redor de uma ponte de pedra sobre o rio principal da região, com muralha baixa parcial e mercado diário que atende caravanas fluviais e terrestres. Locais: mercado coberto, doca fluvial com barcaças de carga, ferraria, oficina de carpintaria, igreja de pedra, guarda municipal pequena e uma taverna-estalagem de dois andares.",
    "img": "assets/img/locais/ponte-alta-vista-aerea.png.webp",
    "localizacao": "Entre o interior agrícola e a capital, na travessia do rio principal.",
    "reino": "Reino de Valmeira",
    "id": "local-2",
    "numero": 2,
    "x": 57.421875,
    "y": 69.7265625,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Portovale",
    "tipo": "Capital de Valmeira",
    "populacao": "Acima de 15.000 habitantes",
    "descricao": "Erguida na foz de um grande rio, com porto marítimo ativo, muralhas completas, alfândega real e o Palácio de Valmeira. A cidade mais cosmopolita entre os reinos humanos, com bairros de mercadores estrangeiros e frequente presença de elfos costeiros em negócios comerciais.",
    "localizacao": "Litoral sul, na foz do grande rio.",
    "reino": "Reino de Valmeira",
    "id": "local-3",
    "numero": 3,
    "x": 53.7109375,
    "y": 85.25390625,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Vaudessa",
    "tipo": "Vila de vinhedos",
    "populacao": "450–650 habitantes",
    "localizacao": "Entre Amieiro e a costa, fora da estrada principal.",
    "descricao": "Vinhedos e pastagens cercam um povoado conhecido pela criação de cavalos. Adegas familiares, um curral de leilões e uma hospedaria recebem tropeiros; trilhas entre as propriedades permitem viajar pelo interior sem passar pelos grandes mercados.",
    "reino": "Reino de Valmeira",
    "id": "local-4",
    "numero": 4,
    "x": 49.34895833333333,
    "y": 70.3125,
    "rotulo": {
      "dx": 24,
      "dy": 3,
      "anchor": "start"
    }
  },
  {
    "nome": "Trigal",
    "tipo": "Vila agrícola",
    "populacao": "600–900 habitantes",
    "localizacao": "Planícies entre Ponte Alta e Portovale.",
    "descricao": "Celeiro regional que abastece as duas cidades com grãos e farinha. Silos comunitários, moinhos e uma feira de sementes concentram a vida local. Durante a colheita, caravanas procuram escolta para levar os carregamentos até o rio.",
    "reino": "Reino de Valmeira",
    "id": "local-5",
    "numero": 5,
    "x": 45.44270833333333,
    "y": 76.5625,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Bosque Alto",
    "tipo": "Vila de fronteira florestal",
    "populacao": "250–400 habitantes",
    "localizacao": "Extremo interior, junto à borda das terras élficas.",
    "descricao": "Posto madeireiro com comércio direto e cauteloso com os elfos. Serrarias, depósitos de ferramentas e uma casa de negociação ocupam a clareira humana. Guias conhecem as trilhas permitidas; entrar mais fundo na floresta depende de entendimento com seus habitantes.",
    "reino": "Reino de Valmeira",
    "id": "local-6",
    "numero": 6,
    "x": 30.338541666666668,
    "y": 58.49609375,
    "rotulo": {
      "dx": -24,
      "dy": -3,
      "anchor": "end"
    }
  },
  {
    "nome": "Ribamar",
    "tipo": "Vila pesqueira",
    "populacao": "350–550 habitantes",
    "localizacao": "Costa sul, afastada do porto da capital.",
    "descricao": "Barcos pequenos encontram abrigo em uma enseada rochosa. Vive da pesca e da salga; possui um cais de madeira, oficina de redes e um farol mantido pelas famílias locais. Grutas costeiras e bancos de areia tornam a navegação uma tarefa para quem conhece as marés.",
    "reino": "Reino de Valmeira",
    "id": "local-7",
    "numero": 7,
    "x": 35.80729166666667,
    "y": 81.8359375,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Vila dos Arcos",
    "tipo": "Cidade de abastecimento",
    "populacao": "3.000–4.000 habitantes",
    "localizacao": "A um dia de estrada de Portovale, antes da entrada na capital.",
    "descricao": "Apesar do nome antigo, cresceu em torno dos arcos de um aqueduto e tornou-se cidade de armazéns e oficinas. Mercadores reorganizam cargas aqui antes da alfândega real. Estábulos, oleiros e mercados de alimentos oferecem trabalho e alojamento mais acessível que o porto.",
    "reino": "Reino de Valmeira",
    "id": "local-8",
    "numero": 8,
    "x": 53.776041666666664,
    "y": 78.61328125,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  },
  {
    "nome": "Salinas da Coroa",
    "tipo": "Cidade salineira",
    "populacao": "2.000–3.000 habitantes",
    "localizacao": "Litoral próximo a Portovale, ligada à capital por estrada costeira.",
    "descricao": "Tanques rasos produzem o sal usado na conservação de pescado e nas viagens marítimas. Um pequeno forte protege os depósitos; barqueiros atravessam os canais entre salinas. Contratos de transporte e disputas pelo uso da água atraem negociadores e escoltas.",
    "reino": "Reino de Valmeira",
    "id": "local-9",
    "numero": 9,
    "x": 62.565104166666664,
    "y": 83.49609375,
    "rotulo": {
      "dx": 24,
      "dy": 0,
      "anchor": "start"
    }
  },
  {
    "nome": "Junco Velho",
    "tipo": "Vila ribeirinha afastada",
    "populacao": "120–180 habitantes",
    "localizacao": "Alto curso de um afluente, a vários dias de Ponte Alta.",
    "descricao": "Casas sobre pilares margeiam brejos onde se colhem juncos e ervas. Uma balsa comunitária é a principal ligação com a estrada seca. Na época das cheias, visitantes dependem de canoas e guias locais para alcançar fazendas isoladas.",
    "reino": "Reino de Valmeira",
    "id": "local-10",
    "numero": 10,
    "x": 67.05729166666666,
    "y": 72.4609375,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  },
  {
    "nome": "Cárdenas Alta",
    "tipo": "Capital de Cárdenas",
    "populacao": "Cerca de 10.000 habitantes",
    "descricao": "Cidade-fortaleza erguida sobre uma colina, com muralhas duplas, guarnição permanente e o Castelo de Cárdenas no ponto mais alto. Forte presença militar e recrutamento constante para expedições contra ameaças do Bestiário.",
    "localizacao": "Colina fortificada no centro do reino, ligada às estradas militares.",
    "reino": "Reino de Cárdenas",
    "id": "local-11",
    "numero": 11,
    "x": 43.03385416666667,
    "y": 57.91015625,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  },
  {
    "nome": "Academia de Valédria",
    "tipo": "Cidade-campus neutra",
    "populacao": "Variável",
    "descricao": "Dedicada ao ensino de Magia Externa, com torres de estudo separadas por escola (Água, Terra, Fogo, Ar, Espacial, Barreiras e Cura), biblioteca central e ala diplomática usada por representantes dos três reinos humanos. Não pertence oficialmente a nenhum reino, protegida por tratado comum.",
    "localizacao": "Região central, em território neutro protegido pelo tratado dos três reinos.",
    "reino": "Reino de Cárdenas",
    "id": "local-12",
    "numero": 12,
    "x": 33.984375,
    "y": 47.0703125,
    "rotulo": {
      "dx": -24,
      "dy": -2,
      "anchor": "end"
    }
  },
  {
    "nome": "Poço Fundo",
    "tipo": "Vila mineira",
    "populacao": "300–500 habitantes",
    "localizacao": "Colinas afastadas das estradas da capital.",
    "descricao": "Mineiros trabalham perto de poços antigos e ruínas menores. Uma oficina de escoramento e um pátio de seleção de minério sustentam a vila. Galerias abandonadas são evitadas pelos moradores, que contratam exploradores quando um desabamento revela novas passagens.",
    "reino": "Reino de Cárdenas",
    "id": "local-13",
    "numero": 13,
    "x": 39.58333333333333,
    "y": 43.1640625,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  },
  {
    "nome": "Feira Nova",
    "tipo": "Cidade mercantil",
    "populacao": "4.000–6.000 habitantes",
    "localizacao": "No cruzamento das grandes estradas, ligada à capital por Cruzeiro do Sul.",
    "descricao": "Caravanas dos três reinos dividem um amplo mercado com cambistas, selarias e armazéns. Pátios de hospedagem permitem reunir grupos antes de partir. A guarda protege o mercado, mas os comboios precisam organizar sua própria segurança fora dos portões.",
    "reino": "Reino de Cárdenas",
    "id": "local-14",
    "numero": 14,
    "x": 36.00260416666667,
    "y": 59.27734375,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Torre de Aldenor",
    "tipo": "Fortaleza e povoado de vigia",
    "populacao": "200–350 habitantes",
    "localizacao": "Crista elevada que domina uma rota secundária do interior.",
    "descricao": "Uma torre de sinais e estação de mensageiros abrigam soldados, tratadores e suas famílias. O povoado oferece ferraduras, suprimentos e notícias das estradas. Patrulhas acompanham viajantes apenas nos trechos próximos à fortaleza.",
    "reino": "Reino de Cárdenas",
    "id": "local-15",
    "numero": 15,
    "x": 51.106770833333336,
    "y": 44.04296875,
    "rotulo": {
      "dx": 24,
      "dy": 34,
      "anchor": "start"
    }
  },
  {
    "nome": "Cruzeiro do Sul",
    "tipo": "Vila de passagem",
    "populacao": "500–750 habitantes",
    "localizacao": "Entroncamento da estrada entre Feira Nova e Cárdenas Alta.",
    "descricao": "Hospedarias, cozinhas de estrada e currais cercam um marco de pedra. É o último grande ponto de descanso de muitos comboios antes da capital. Carreteiros anunciam partidas em um pátio comum, ideal para encontrar transporte ou companhia de viagem.",
    "reino": "Reino de Cárdenas",
    "id": "local-16",
    "numero": 16,
    "x": 45.83333333333333,
    "y": 64.84375,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Campo de Aço",
    "tipo": "Cidade de oficinas",
    "populacao": "2.500–3.500 habitantes",
    "localizacao": "Planície próxima a Cárdenas Alta, a um dia de marcha pelos portões baixos.",
    "descricao": "Ferreiros, curtidores e fabricantes de carroças abastecem a capital e suas guarnições. Campos de treino ficam fora das casas. Oficinas aceitam reparos e encomendas, enquanto intendentes contratam transporte de materiais vindos das regiões mineiras.",
    "reino": "Reino de Cárdenas",
    "id": "local-17",
    "numero": 17,
    "x": 42.44791666666667,
    "y": 51.07421875,
    "rotulo": {
      "dx": 24,
      "dy": 3,
      "anchor": "start"
    }
  },
  {
    "nome": "Ponte da Rainha",
    "tipo": "Cidade de travessia",
    "populacao": "2.000–3.000 habitantes",
    "localizacao": "Próxima à capital, sobre o rio que cruza sua estrada de abastecimento.",
    "descricao": "Uma ponte fortificada concentra o tráfego de grãos, ferramentas e tropas. Há um mercado sob arcadas, docas e uma casa de registros de carga. Viajantes podem seguir por estrada ou contratar uma barca, conforme o nível do rio.",
    "reino": "Reino de Cárdenas",
    "id": "local-18",
    "numero": 18,
    "x": 55.859375,
    "y": 53.3203125,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Urze Baixa",
    "tipo": "Vila pastoril afastada",
    "populacao": "140–220 habitantes",
    "localizacao": "Charnecas do interior, a vários dias das grandes guarnições.",
    "descricao": "Pastores criam ovelhas entre colinas de urze. Um salão comunitário acolhe viajantes e serve de abrigo durante tempestades. Trilhas de pastoreio levam a velhos marcos de fronteira; guias da vila ajudam a atravessar a região sem perder os poucos pontos de água.",
    "reino": "Reino de Cárdenas",
    "id": "local-19",
    "numero": 19,
    "x": 61.5234375,
    "y": 65.72265625,
    "rotulo": {
      "dx": 24,
      "dy": 3,
      "anchor": "start"
    }
  },
  {
    "nome": "Santa Vigília",
    "tipo": "Vila de peregrinação",
    "populacao": "250–400 habitantes",
    "localizacao": "Vale remoto, acessível por uma ramificação da estrada de Aldenor.",
    "descricao": "Uma capela antiga e um albergue recebem peregrinos e famílias das fazendas próximas. Hortas e pequenos rebanhos mantêm o vale. A comunidade cuida de uma passagem estreita usada por viajantes que preferem evitar as estradas mais movimentadas.",
    "reino": "Reino de Cárdenas",
    "id": "local-20",
    "numero": 20,
    "x": 64.71354166666666,
    "y": 49.51171875,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  },
  {
    "nome": "Montegris",
    "tipo": "Capital de Ostenfeld",
    "populacao": "Variável",
    "descricao": "Construída em terraços de pedra na base das montanhas, misturando arquitetura humana com técnicas de construção anãs, com ruas em degraus e edifícios parcialmente escavados na rocha. Principal ponto de comércio entre humanos e clãs anões, embora as relações variem conforme o clã.",
    "localizacao": "Sopé das montanhas do norte, no encontro das rotas humanas e anãs.",
    "reino": "Reino de Ostenfeld",
    "id": "local-21",
    "numero": 21,
    "x": 47.59114583333333,
    "y": 33.3984375,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Pedrafria",
    "tipo": "Cidade mineira de fronteira",
    "populacao": "2.000–3.000 habitantes",
    "localizacao": "Passagens montanhosas além de Montegris.",
    "descricao": "Minas e depósitos de minério dividem espaço com um posto de fronteira. A cidade recebe negociadores dos clãs anões conforme os acordos vigentes. Guias, animais de carga e oficinas de ferramentas são essenciais para quem pretende seguir pelas montanhas.",
    "reino": "Reino de Ostenfeld",
    "id": "local-22",
    "numero": 22,
    "x": 40.95052083333333,
    "y": 30.17578125,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  },
  {
    "nome": "Vigília Branca",
    "tipo": "Fortaleza e povoado de guarnição",
    "populacao": "400–600 habitantes",
    "localizacao": "Desfiladeiro elevado nas rotas de acesso ao reino.",
    "descricao": "Protege as estradas humanas contra incursões vindas das montanhas. Famílias de soldados e fornecedores vivem junto às muralhas. Um abrigo para caravanas oferece refúgio quando neve ou deslizamentos interrompem a passagem.",
    "reino": "Reino de Ostenfeld",
    "id": "local-23",
    "numero": 23,
    "x": 63.28125,
    "y": 28.02734375,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  },
  {
    "nome": "Baixapedra",
    "tipo": "Cidade de entrepostos",
    "populacao": "3.000–4.000 habitantes",
    "localizacao": "Vale imediatamente abaixo dos terraços de Montegris.",
    "descricao": "Armazéns recebem grãos importados e distribuem minério, pedra e ferramentas. Carroças grandes descarregam aqui antes da subida para a capital. Pátios de contratação, hospedarias e oficinas fazem dela uma boa base para viagens ao norte.",
    "reino": "Reino de Ostenfeld",
    "id": "local-24",
    "numero": 24,
    "x": 47.39583333333333,
    "y": 39.0625,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Fornalha do Vale",
    "tipo": "Cidade de fundição",
    "populacao": "1.800–2.600 habitantes",
    "localizacao": "A um dia de Montegris, junto a um rio de corrente forte.",
    "descricao": "Rodas de água movem os equipamentos das oficinas humanas. Funde minério e produz ferragens, respeitando os contratos comerciais com os clãs. Visitantes encontram reparos especializados, transporte de carga e notícias trazidas pelos trabalhadores das minas.",
    "reino": "Reino de Ostenfeld",
    "id": "local-25",
    "numero": 25,
    "x": 53.90625,
    "y": 41.796875,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  },
  {
    "nome": "Cedro Alto",
    "tipo": "Vila florestal",
    "populacao": "250–400 habitantes",
    "localizacao": "Encosta arborizada afastada das estradas de minério.",
    "descricao": "Carpinteiros e coletores de resina vivem entre bosques de altitude. A madeira segue em pequenos lotes para as construções do vale. Uma casa de guias orienta travessias por trilhas antigas, que se tornam difíceis durante o inverno.",
    "reino": "Reino de Ostenfeld",
    "id": "local-26",
    "numero": 26,
    "x": 34.50520833333333,
    "y": 38.76953125,
    "rotulo": {
      "dx": -24,
      "dy": 0,
      "anchor": "end"
    }
  },
  {
    "nome": "Lago do Sino",
    "tipo": "Vila lacustre",
    "populacao": "180–280 habitantes",
    "localizacao": "Bacia montanhosa remota, além de uma passagem sazonal.",
    "descricao": "Pesca, lã e pequenas hortas sustentam casas reunidas em torno de um sino de aviso. Barcos ligam as margens enquanto a passagem está aberta. Viajantes precisam prever abrigo e mantimentos quando o frio isola a comunidade.",
    "reino": "Reino de Ostenfeld",
    "id": "local-27",
    "numero": 27,
    "x": 58.919270833333336,
    "y": 34.86328125,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  },
  {
    "nome": "Vale Curto",
    "tipo": "Vila agrícola",
    "populacao": "350–500 habitantes",
    "localizacao": "Vale protegido dos ventos, no caminho sul para Montegris.",
    "descricao": "Uma das poucas áreas de cultivo mais favoráveis do reino produz legumes e cereais resistentes. Terraços irrigados, moinhos e celeiros abastecem a capital. Agricultores recebem comboios em uma feira onde também se contratam ajudantes e escoltas.",
    "reino": "Reino de Ostenfeld",
    "id": "local-28",
    "numero": 28,
    "x": 44.07552083333333,
    "y": 44.140625,
    "rotulo": {
      "dx": -24,
      "dy": 24,
      "anchor": "end"
    }
  },
  {
    "nome": "Passo das Cabras",
    "tipo": "Vila de montanha",
    "populacao": "100–160 habitantes",
    "localizacao": "Trilha alta entre vales, longe dos postos principais.",
    "descricao": "Criadores de cabras mantêm abrigos de pedra e produzem queijo para as caravanas menores. A vila oferece guias para atalhos estreitos, inadequados a carroças. Ruínas de um antigo abrigo de estrada marcam o início de uma travessia pouco frequentada.",
    "reino": "Reino de Ostenfeld",
    "id": "local-29",
    "numero": 29,
    "x": 35.41666666666667,
    "y": 27.24609375,
    "rotulo": {
      "dx": -24,
      "dy": 0,
      "anchor": "end"
    }
  },
  {
    "nome": "Águas de Ferro",
    "tipo": "Povoado de fontes",
    "populacao": "220–320 habitantes",
    "localizacao": "Vale lateral de Pedrafria, junto a nascentes minerais.",
    "descricao": "Hospedarias simples recebem mineiros em descanso e viajantes das montanhas. Pontes de madeira cruzam córregos de água ferruginosa. Pequenas trilhas conectam pedreiras e acampamentos sazonais, oferecendo caminhos alternativos quando a rota principal fecha.",
    "reino": "Reino de Ostenfeld",
    "id": "local-30",
    "numero": 30,
    "x": 38.99739583333333,
    "y": 34.375,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Encruzilhada",
    "tipo": "Cidade livre",
    "reino": "Fronteiras e território neutro",
    "descricao": "Única grande cidade aberta oficialmente a todas as raças, governada por um conselho formado por representantes eleitos de cada comunidade residente — humanos, elfos, anões e demônios —, sem exército de nenhum reino, apenas uma guarda mista mantida pelo conselho. Conflitos armados dentro da cidade são considerados quebra grave do tratado de neutralidade.",
    "id": "local-31",
    "numero": 31,
    "x": 66.27604166666666,
    "y": 54.6875,
    "rotulo": {
      "dx": 24,
      "dy": 0,
      "anchor": "start"
    }
  },
  {
    "nome": "Ponte Rubra",
    "tipo": "Cidade-guarnição",
    "descricao": "Cobra passagem de caravanas rumo às Terras Demoníacas.",
    "reino": "Fronteiras e território neutro",
    "id": "local-32",
    "numero": 32,
    "x": 71.74479166666666,
    "y": 58.203125,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Limiar de Cinzas",
    "tipo": "Último assentamento humano antes do deserto",
    "descricao": "Posto avançado de comércio e vigilância na fronteira com as Terras Demoníacas.",
    "reino": "Fronteiras e território neutro",
    "id": "local-33",
    "numero": 33,
    "x": 75.1953125,
    "y": 62.5,
    "rotulo": {
      "dx": 24,
      "dy": 3,
      "anchor": "start"
    }
  },
  {
    "nome": "Silvanneth",
    "titulo": "Silvanneth — A Coroa das Copas",
    "tipo": "Centro de poder",
    "reino": "Terras Élficas — O Véu Verde",
    "descricao": "Capital, construída no topo de cinco árvores colossais entrelaçadas, mais de 80 metros do solo. Pontos de interesse: Trono das Raízes, Arquivo Susurrante (proibido a não-elfos), Mercado da Borda, Casas-Casulo.",
    "figura": "Conselheira Aelindra — voz mais ouvida do Conselho das Folhas, cética sobre alianças com humanos.",
    "id": "local-34",
    "numero": 34,
    "x": 18.5546875,
    "y": 35.64453125,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  },
  {
    "nome": "Eryndal",
    "titulo": "Eryndal — A Vila das Beiras",
    "tipo": "Localidade",
    "reino": "Terras Élficas — O Véu Verde",
    "descricao": "Único ponto de entrada aberto a visitantes, na Borda Pálida. Posto de triagem para humanos, anões e demônios. Pontos de interesse: Porta de Galho, Estalagem da Folha Virada, Posto dos Batedores.",
    "figura": "Batedor-Chefe Therion — jovem, pragmático, pode se tornar aliado se o grupo for honesto.",
    "id": "local-35",
    "numero": 35,
    "x": 29.622395833333332,
    "y": 49.31640625,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Thal'Miryn",
    "titulo": "Thal'Miryn — A Cidade das Águas",
    "tipo": "Localidade",
    "reino": "Terras Élficas — O Véu Verde",
    "descricao": "No interior do Coração Verde, em torno de um lago subterrâneo cristalino que emerge à superfície.",
    "figura": "",
    "id": "local-36",
    "numero": 36,
    "x": 22.916666666666664,
    "y": 40.4296875,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Durrak-Thol",
    "titulo": "Durrak-Thol — O Coração da Pedra",
    "tipo": "Centro de poder",
    "reino": "Terras Anãs — O Ventre de Pedra",
    "descricao": "Capital política, sede do Grande Conselho de Clãs, escavada no maior pico, sete níveis concêntricos. Pontos de interesse: Grande Forja, Câmara do Grande Conselho, Mercado do Nível Três, Tabernas de Pedra.",
    "figura": "Alto Ferreiro Bragdar Ironvein — líder do Clã Ironvein e porta-voz do Conselho, velho e desconfiado de estrangeiros.",
    "id": "local-37",
    "numero": 37,
    "x": 49.47916666666667,
    "y": 20.01953125,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  },
  {
    "nome": "Kholdrynn",
    "titulo": "Kholdrynn — A Cidade das Pontes",
    "tipo": "Localidade",
    "reino": "Terras Anãs — O Ventre de Pedra",
    "descricao": "Centro comercial em uma ravina com 23 pontes que conectam clãs, humanos e elfos em território neutro. Pontos de interesse: Ponte Alta do Acordo, Empório das Pedras, Forja Aberta.",
    "figura": "Matriarca Heldra do Clã Stonemarrow — resolve conflitos por reputação, não por cargo formal.",
    "id": "local-38",
    "numero": 38,
    "x": 42.96875,
    "y": 26.171875,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  },
  {
    "nome": "Gryndak",
    "titulo": "Gryndak — A Cidade Mineira",
    "tipo": "Localidade",
    "reino": "Terras Anãs — O Ventre de Pedra",
    "descricao": "No Abismo Interior, cidade de trabalhadores sem ornamentação, temperatura quase insuportável para não-anões. Pontos de interesse: Minas do Fogo Interno, Posto do Abismo, Sala do Eco.",
    "figura": "Supervisora Gretta Ashenhand — sem afiliação de clã declarada, respeitada pelo trabalho.",
    "id": "local-39",
    "numero": 39,
    "x": 59.635416666666664,
    "y": 24.0234375,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  },
  {
    "nome": "Vrak'Thon",
    "titulo": "Vrak'Thon — O Trono das Brasas",
    "tipo": "Centro de poder",
    "reino": "Terras Demoníacas — As Areias da Maldição",
    "descricao": "Principal centro de poder, estrutura orgânica ao redor de um ponto geotérmico com torres de obsidiana. Pontos de interesse: Torre do Juízo, Mercado de Ossos (troca, sem moeda), Fornalhas de Vrak.",
    "figura": "Kal'Veth, o Consumidor — demônio de casta alta próximo de um Deus Demônio, governa pela força e pelo medo, mas calculista.",
    "id": "local-40",
    "numero": 40,
    "x": 82.6171875,
    "y": 39.2578125,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Skral",
    "titulo": "Skral — A Cidade dos Goblins",
    "tipo": "Localidade",
    "reino": "Terras Demoníacas — As Areias da Maldição",
    "descricao": "Na Borda das Cinzas, maior concentração de casta baixa, caótica e superlotada, ponto de contato com o mundo externo. Pontos de interesse: Labirinto de Tendas, Poço Central, Guarita da Fronteira.",
    "figura": "Grix, o Velho — goblin sobrevivente mais antigo de Skral, intermediário informal com visitantes.",
    "id": "local-41",
    "numero": 41,
    "x": 80.20833333333334,
    "y": 65.234375,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Sem'Kar",
    "titulo": "Sem'Kar — O Templo do Deserto",
    "tipo": "Santuário",
    "reino": "Terras Demoníacas — As Areias da Maldição",
    "descricao": "Ponto de peregrinação no coração do Mar de Areia, não habitado permanentemente, interfere em magias e bússolas. Pontos de interesse: Altar Central, Corredores da Memória.",
    "figura": "A Voz de Sem'Kar — entidade que fala em nome do local; ninguém que se aproximou o suficiente voltou para contar.",
    "id": "local-42",
    "numero": 42,
    "x": 76.82291666666666,
    "y": 49.12109375,
    "rotulo": {
      "dx": 0,
      "dy": 34,
      "anchor": "middle"
    }
  },
  {
    "nome": "Fauces do Norte",
    "tipo": "Entrada das terras anãs",
    "reino": "Terras Anãs — O Ventre de Pedra",
    "descricao": "Principal acesso às cidades subterrâneas. Um posto anão registra visitantes e cobra pedágio. Os trajetos sob a montanha são representados por linhas pontilhadas.",
    "id": "local-43",
    "numero": 43,
    "x": 54.6875,
    "y": 29.296875,
    "rotulo": {
      "dx": 0,
      "dy": -23,
      "anchor": "middle"
    }
  }
];
window.MAPA_ROTAS = [
  {
    "nome": "Rota Fluvial do Sul",
    "trecho": "Amieiro → Ponte Alta → Portovale",
    "descricao": "Liga o interior agrícola ao porto principal do reino de Valmeira.",
    "locais": [
      "Amieiro",
      "Ponte Alta",
      "Portovale"
    ]
  },
  {
    "nome": "Rota Terrestre Central",
    "trecho": "Feira Nova → Cruzeiro do Sul → Cárdenas Alta",
    "descricao": "Conecta o centro comercial do continente à capital militar de Cárdenas.",
    "locais": [
      "Feira Nova",
      "Cruzeiro do Sul",
      "Cárdenas Alta"
    ]
  },
  {
    "nome": "Rota Norte",
    "trecho": "Cárdenas → Montegris → Pedrafria",
    "descricao": "Garante o fluxo de minério e produtos anões para o resto do reino.",
    "locais": [
      "Cárdenas Alta",
      "Montegris",
      "Pedrafria"
    ]
  },
  {
    "nome": "Circuito da Costa",
    "trecho": "Ribamar → Salinas da Coroa → Portovale",
    "descricao": "Liga pesca, produção de sal e comércio marítimo por caminhos costeiros e pequenos trajetos de barco.",
    "locais": [
      "Ribamar",
      "Salinas da Coroa",
      "Portovale"
    ]
  },
  {
    "nome": "Estrada dos Celeiros",
    "trecho": "Amieiro → Vaudessa → Trigal → Ponte Alta",
    "descricao": "Une as comunidades agrícolas de Valmeira; desvios rurais alcançam propriedades afastadas e a rota de Bosque Alto.",
    "locais": [
      "Amieiro",
      "Vaudessa",
      "Trigal",
      "Ponte Alta"
    ]
  },
  {
    "nome": "Cinturão da Capital",
    "trecho": "Campo de Aço → Cárdenas Alta → Ponte da Rainha",
    "descricao": "Estradas curtas concentram oficinas e abastecimento perto da capital de Cárdenas; caminhos secundários seguem para Aldenor e o interior.",
    "locais": [
      "Campo de Aço",
      "Cárdenas Alta",
      "Ponte da Rainha"
    ]
  },
  {
    "nome": "Caminho dos Vales",
    "trecho": "Vale Curto → Baixapedra → Montegris → Pedrafria",
    "descricao": "Leva alimentos à capital do norte e conecta entrepostos às passagens de minério. As ramificações para vilas altas dependem das condições da estação.",
    "locais": [
      "Vale Curto",
      "Baixapedra",
      "Montegris",
      "Pedrafria"
    ]
  },
  {
    "nome": "Rio Prateado",
    "tipo": "acesso",
    "locais": [
      "Bosque Alto",
      "Eryndal"
    ],
    "descricao": "Acesso comercial às terras élficas; entrada controlada em Eryndal."
  },
  {
    "nome": "Passagem das Fauces",
    "tipo": "subterranea",
    "locais": [
      "Pedrafria",
      "Fauces do Norte",
      "Durrak-Thol",
      "Kholdrynn",
      "Gryndak"
    ],
    "descricao": "Entrada e conexões subterrâneas anãs, mostradas de forma esquemática."
  },
  {
    "nome": "Estrada da Fronteira",
    "tipo": "acesso",
    "locais": [
      "Feira Nova",
      "Encruzilhada",
      "Ponte Rubra",
      "Limiar de Cinzas",
      "Skral"
    ],
    "descricao": "Conexão comercial para a Borda das Cinzas."
  }
];
