window.TERRITORIOS = [
  {
    nome: "Terras Élficas — O Véu Verde",
    regiao: "Norte de Valédria",
    capital: "Silvanneth",
    governo: "Conselho das Folhas",
    bioma: "Floresta densa em três camadas: Borda Pálida, Coração Verde e Raízes Antigas",
    acesso: "Eryndal (fronteira)",
    visao: "Floresta antiga e densa que os elfos chamam de O Véu Verde. Acreditam que a floresta é uma extensão viva de Valédria — enquanto ela estiver de pé, o mundo estará seguro — o que explica a hostilidade imediata contra invasores.",
    cidades: [
      { nome: "Silvanneth — A Coroa das Copas", papel: "Capital, construída no topo de cinco árvores colossais entrelaçadas, mais de 80 metros do solo. Pontos de interesse: Trono das Raízes, Arquivo Susurrante (proibido a não-elfos), Mercado da Borda, Casas-Casulo.", figura: "Conselheira Aelindra — voz mais ouvida do Conselho das Folhas, cética sobre alianças com humanos." },
      { nome: "Eryndal — A Vila das Beiras", papel: "Único ponto de entrada aberto a visitantes, na Borda Pálida. Posto de triagem para humanos, anões e demônios. Pontos de interesse: Porta de Galho, Estalagem da Folha Virada, Posto dos Batedores.", figura: "Batedor-Chefe Therion — jovem, pragmático, pode se tornar aliado se o grupo for honesto." },
      { nome: "Thal'Miryn — A Cidade das Águas", papel: "No interior do Coração Verde, em torno de um lago subterrâneo cristalino que emerge à superfície.", figura: "" }
    ],
    grupos: [],
    rotas: ["Rota do Rio Prateado — a mais conhecida, única tolerada por elfos para comerciantes, termina em Eryndal", "Rota das Pedras Frias — caminho montanhoso perigoso, sem posto élfico, entrar por aqui é ilegal", "Passagem das Raízes — rota subterrânea quase mítica, ninguém confirmou percorrê-la inteira nos últimos dois séculos"],
    relacoes: [
      { com: "Humanos", texto: "Distante e cautelosa. Comércio tolerado em Eryndal. Última grande aliança humano-élfica há mais de 300 anos." },
      { com: "Anões", texto: "Rivalidade histórica por território de fronteira no noroeste; desentendimentos comerciais frequentes por madeira." },
      { com: "Demônios", texto: "Desconfiança profunda, sem contato diplomático ativo, monitoram qualquer movimentação demoníaca com alarme." }
    ],
    img: "assets/img/territorios/terras-elficas.jpg"
  },
  {
    nome: "Terras Anãs — O Ventre de Pedra",
    regiao: "Oeste de Valédria",
    capital: "Durrak-Thol",
    governo: "Grande Conselho de Clãs",
    bioma: "Montanhas e cavernas em três níveis: Fauces, Salões Médios e Abismo Interior",
    acesso: "Fauces do Norte",
    visao: "Três cadeias de montanhas onde os anões constroem para baixo — cidades no interior da montanha, conectadas por túneis, pontes suspensas e elevadores de contrapeso. Sem governo unificado: organizados em clãs em negociação perpétua, com a honra e a palavra dada tendo peso quase sagrado.",
    cidades: [
      { nome: "Durrak-Thol — O Coração da Pedra", papel: "Capital política, sede do Grande Conselho de Clãs, escavada no maior pico, sete níveis concêntricos. Pontos de interesse: Grande Forja, Câmara do Grande Conselho, Mercado do Nível Três, Tabernas de Pedra.", figura: "Alto Ferreiro Bragdar Ironvein — líder do Clã Ironvein e porta-voz do Conselho, velho e desconfiado de estrangeiros." },
      { nome: "Kholdrynn — A Cidade das Pontes", papel: "Centro comercial em uma ravina com 23 pontes que conectam clãs, humanos e elfos em território neutro. Pontos de interesse: Ponte Alta do Acordo, Empório das Pedras, Forja Aberta.", figura: "Matriarca Heldra do Clã Stonemarrow — resolve conflitos por reputação, não por cargo formal." },
      { nome: "Gryndak — A Cidade Mineira", papel: "No Abismo Interior, cidade de trabalhadores sem ornamentação, temperatura quase insuportável para não-anões. Pontos de interesse: Minas do Fogo Interno, Posto do Abismo, Sala do Eco.", figura: "Supervisora Gretta Ashenhand — sem afiliação de clã declarada, respeitada pelo trabalho." }
    ],
    grupos: [
      { nome: "Clã Ironvein", papel: "O maior e mais influente, especialistas em metalurgia de guerra, controlam a Grande Forja, conservadores e desconfiados de estrangeiros." },
      { nome: "Clã Stonemarrow", papel: "Especialistas em arquitetura e engenharia de pedra, mais abertos ao diálogo por necessidade comercial." },
      { nome: "Clã Ashdeep", papel: "Trabalhadores do Abismo, menor em número, enorme importância econômica, frequentemente ignorados." },
      { nome: "Clã Crystalborn", papel: "Cultivam os Cristais-Sol que iluminam toda a cidade, poder de negociação desproporcional ao tamanho." },
      { nome: "Clã Goldenbeard", papel: "Comerciantes natos, os anões mais vistos fora das montanhas, vistos com desprezo e gratidão pelos outros clãs." }
    ],
    rotas: ["Rota das Fauces do Norte — principal entrada, posto anão registra visitantes e cobra pedágio", "Passagem do Vento Cortante — alternativa pelo sul, menos vigiada e mais perigosa", "Túnel do Clã Goldenbeard — rota semi-secreta para comércio rápido com o oeste humano, fora dos mapas oficiais"],
    relacoes: [
      { com: "Humanos", texto: "Comercial e pragmática, sem afeto particular, apenas negócio. O Clã Goldenbeard tem a relação mais próxima." },
      { com: "Elfos", texto: "Rivalidade histórica por madeira e fronteira, desconfiança mútua constante, sem conflito armado recente." },
      { com: "Demônios", texto: "Historicamente hostil, memória de conflitos antigos guardada como cicatriz cultural pelos mais velhos." }
    ],
    img: "assets/img/territorios/terras-anas.jpg"
  },
  {
    nome: "Terras Demoníacas — As Areias da Maldição",
    regiao: "Leste de Valédria",
    capital: "Vrak'Thon (poder) / Skral (fronteira)",
    governo: "Castas e poder individual",
    bioma: "Deserto árido em quatro faixas: Borda das Cinzas, Mar de Areia, Ruínas Ardentes e Coração Íntimo",
    acesso: "Borda das Cinzas / Skral",
    visao: "Deserto árido e quente com temperaturas extremas, mas um ecossistema funcional com lógica e recursos próprios. Sem governo centralizado: castas definem função e hierarquia, da numerosa casta inferior (goblins) até os raros e poderosos próximos ao divino.",
    cidades: [
      { nome: "Vrak'Thon — O Trono das Brasas", papel: "Principal centro de poder, estrutura orgânica ao redor de um ponto geotérmico com torres de obsidiana. Pontos de interesse: Torre do Juízo, Mercado de Ossos (troca, sem moeda), Fornalhas de Vrak.", figura: "Kal'Veth, o Consumidor — demônio de casta alta próximo de um Deus Demônio, governa pela força e pelo medo, mas calculista." },
      { nome: "Skral — A Cidade dos Goblins", papel: "Na Borda das Cinzas, maior concentração de casta baixa, caótica e superlotada, ponto de contato com o mundo externo. Pontos de interesse: Labirinto de Tendas, Poço Central, Guarita da Fronteira.", figura: "Grix, o Velho — goblin sobrevivente mais antigo de Skral, intermediário informal com visitantes." },
      { nome: "Sem'Kar — O Templo do Deserto", papel: "Ponto de peregrinação no coração do Mar de Areia, não habitado permanentemente, interfere em magias e bússolas. Pontos de interesse: Altar Central, Corredores da Memória.", figura: "A Voz de Sem'Kar — entidade que fala em nome do local; ninguém que se aproximou o suficiente voltou para contar." }
    ],
    grupos: [
      { nome: "Casta Inferior", papel: "Numerosa, instintiva, forte — goblins, hobgoblins." },
      { nome: "Casta Média", papel: "Mais inteligentes, especializados — demônios guerreiros, ferreiros, exploradores." },
      { nome: "Casta Alta", papel: "Raros, poderosos, estratégicos — senhores de território, generais." },
      { nome: "Próximos ao Divino", papel: "Únicos, quase lendários — protodemônios." },
      { nome: "Deuses Demônios", papel: "Extremamente raros, poder absoluto — mencionados em lore, raramente presentes." }
    ],
    rotas: ["Borda das Cinzas (rota direta) — caminho mais curto desde as terras humanas do leste, sem posto de controle formal do lado demoníaco", "Rota do Mercador de Risco — usada por comerciantes humanos corajosos que negociam com goblins de Skral", "Rota das Ruínas — mais longa, mas as zonas de energia das ruínas tornam a passagem mais segura para quem tem conhecimento de magia"],
    relacoes: [
      { com: "Humanos", texto: "Desconfiança mútua, sem aliança formal; goblins de Skral comercializam oportunisticamente na fronteira." },
      { com: "Elfos", texto: "Nenhum contato diplomático; os elfos monitoram de longe." },
      { com: "Anões", texto: "Hostilidade histórica sem conflito ativo recente; anões mais velhos guardam memórias de incursões antigas." }
    ],
    img: "assets/img/territorios/terras-demoniacas.jpg"
  }
];
