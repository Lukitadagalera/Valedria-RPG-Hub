/* ============================================================
   RAÇAS E CASTAS DE VALÉDRIA — dados
   Humanos (castas sociais), Elfos (3 sub-raças), Anões (4 clãs),
   Demônios (5 sub-raças) e Transformação de Linhagem.
   Nenhuma criatura desta enciclopédia pertence ao Bestiário.
   ============================================================ */
window.CASTAS_HUMANAS = [
  {
    nome: "Plebeus", descricao: "A grande maioria da população: fazendeiros, criadores, artesãos, pescadores, trabalhadores de estrada e serviçais. Vivem em casas simples de madeira, barro ou pedra local, organizadas em aldeias, bairros de cidade ou acampamentos de caravana. A fé plebeia é prática e cotidiana, ligada a templos locais, capelas de estrada e tradições familiares transmitidas oralmente.",
    profissoes: "Lavoura, criação de animais, pesca, carpintaria, ferraria simples e comércio de pequena escala.",
    img: "assets/img/racas/casta-plebeus.jpg"
  },
  {
    nome: "Artesãos e mercadores estabelecidos", descricao: "Casta intermediária de comerciantes prósperos, mestres de guilda, ferreiros reconhecidos e proprietários de oficinas. Moram em casas de dois ou três andares dentro das muralhas da cidade, frequentemente com a oficina no andar de baixo. Cultuam os mesmos templos dos plebeus, mas com maior influência sobre festivais e doações, o que lhes garante status simbólico.",
    profissoes: "Comércio estabelecido, mestria de guilda, ferraria de renome, gestão de oficinas.",
    img: "assets/img/racas/casta-artesaos.jpg"
  },
  {
    nome: "Nobreza menor", descricao: "Famílias com terras, títulos locais ou cargos administrativos herdados, como prefeitos hereditários, capitães de guarda regional e pequenos senhores de vale. Vivem em casas-fortes ou manoirs modestos, próximos ao centro administrativo de uma cidade. Sua fé costuma ser mais formal, com capelas privadas e clérigos contratados.",
    profissoes: "Administração, justiça local e comando militar.",
    img: "assets/img/racas/casta-nobreza-menor.jpg"
  },
  {
    nome: "Alta nobreza e realeza", descricao: "Famílias que governam cidades muradas maiores, regiões inteiras ou aspiram ao trono de um reino humano. Vivem em castelos, palácios e cidadelas fortificadas, com corte própria, guarda pessoal e cerimonial elaborado. A fé da realeza costuma se entrelaçar com legitimidade política, com templos principais consagrando coroações e alianças.",
    profissoes: "Governo, comando militar de alto escalão, diplomacia real.",
    img: "assets/img/racas/casta-alta-nobreza.jpg"
  }
];

window.HUMANOS = {
  intro: "Humanos não possuem sub-raças. Toda a diversidade humana em Valédria nasce de região, cultura, ofício e posição social, não de biologia. Todos os personagens jogadores começam humanos, vindos de uma mesma cidade do interior, embora possam vir a conhecer ou se relacionar com outras castas sociais ao longo da campanha.",
  mobilidade: "Passar de uma casta a outra é raro, mas não impossível: um mercador excepcionalmente rico pode comprar um título menor, e um nobre menor pode cair à pobreza após desgraça política. Personagens jogadores tipicamente começam como plebeus, o que reforça o tom de \"partir de pouco e crescer muito\" já estabelecido para a campanha.",
  img: "assets/img/racas/humanos.jpg"
};

window.ELFOS = [
  {
    nome: "Elfos da Floresta",
    descricao: "Vivem em comunidades isoladas dentro de florestas antigas, entre árvores tão altas que parecem maiores que torres humanas. Suas moradias são construídas em harmonia com a vegetação viva — plataformas entre copas, cabanas de madeira entrelaçada e salões abertos protegidos por magia natural, nunca por muralhas de pedra. Sua fé gira em torno da memória das árvores antigas e de espíritos ligados à floresta, cultuados sem templos fixos, mas em clareiras e santuários naturais marcados por pedras ou raízes sagradas.",
    profissoes: "Guarda florestal, arqueiro, herbalista, tecelão de fibras vegetais e guardião de santuário.",
    caracteristica: "Ligação sensorial com a floresta onde nasceram: percebe perturbações sutis em sua região natal mesmo a certa distância, como se a mata inteira fosse uma extensão de seus sentidos.",
    img: "assets/img/racas/elfos-da-floresta.jpg"
  },
  {
    nome: "Elfos Negros",
    descricao: "Sub-raça elfa que se afastou das florestas superficiais gerações atrás, buscando refúgio em cavernas profundas, ravinas escuras e vales onde a luz do sol raramente alcança o solo. Sua pele adquiriu tons acinzentados ou azulados, e seus olhos se adaptaram à penumbra. Vivem em assentamentos escavados na rocha, iluminados por fungos luminescentes, cristais fracos ou fogo controlado, organizados em câmaras concêntricas ao redor de um salão central de conselho. Sua fé é mais sombria e reservada, ligada a divindades ou espíritos do silêncio, da sombra e da paciência, cultuados em rituais privados.",
    profissoes: "Batedor noturno, alquimista de venenos e antídotos, escultor de pedra escura e negociante discreto de informações.",
    caracteristica: "Visão adaptada à penumbra, permitindo perceber formas e movimento em escuridão quase total, ao custo de desconforto e desvantagem em testes sob luz solar direta muito forte. São vistos com desconfiança tanto por humanos quanto por Elfos da Floresta, mais por isolamento histórico e diferença de costumes do que por qualquer inclinação natural à maldade.",
    img: "assets/img/racas/elfos-negros.jpg"
  },
  {
    nome: "Elfos Costeiros",
    descricao: "Comunidades élficas estabelecidas ao longo de baías, penhascos costeiros e ilhas próximas ao continente, adaptando sua tradição florestal à vida junto ao mar. Vivem em casas de madeira tratada contra a maresia, muitas vezes erguidas sobre pilares acima da linha de maré, conectadas por pontes e trilhas de corda. Sua fé mistura reverência pelas árvores ancestrais com respeito profundo ao mar e às marés, venerando entidades aquáticas antigas com cautela, nunca abertamente hostil.",
    profissoes: "Pescador, navegador, construtor de barcos e guardião de faróis.",
    caracteristica: "Afinidade natural com correntes e navegação, concedendo vantagem em testes relacionados a orientação marítima e previsão de tempestades.",
    img: "assets/img/racas/elfos-costeiros.jpg"
  }
];

window.ANOES = {
  intro: "Anões não possuem sub-raças, mas se organizam em clãs distintos, cada um com sua própria fortaleza, tradição e relação — amistosa ou hostil — com os demais clãs. Não existe uma nação anã unificada; existe uma teia de alianças, rivalidades antigas e tratados frágeis entre montanhas.",
  cultura: "Anões vivem em fortalezas escavadas na própria rocha, cidades subterrâneas de múltiplos níveis conectadas por túneis, minas e câmaras de forja que nunca se apagam completamente. Sua arquitetura favorece pedra maciça, colunas monumentais e portas pesadas que raramente se abrem para estranhos sem boa razão. A fé anã gira em torno de ancestrais fundadores de clã e entidades associadas à forja, à pedra e à resistência, cultuadas em capelas de pedra dentro da própria fortaleza.",
  profissoes: "Engenharia, mineração, forja e construção, além de comerciantes, cartógrafos de túneis, curandeiros de mina e guardas de fronteira subterrânea.",
  caracteristica: "Resistência natural da pedra: tolerância elevada a venenos, exaustão e ambientes hostis de profundidade, além de percepção instintiva de estruturas instáveis ou passagens ocultas em rocha.",
  img: "assets/img/racas/anoes.jpg",
  clas: [
    { nome: "Clã Ferro-Fundo", descricao: "Especialistas em forja e metalurgia, controlam algumas das minas mais profundas e ricas em minério. Mantêm relação tensa com o Clã Pedra-Funda por disputas antigas de território de mineração, mas comercializam abertamente com humanos e elfos costeiros." },
    { nome: "Clã Pedra-Funda", descricao: "Focado em construção, arquitetura e engenharia de túneis, responsável por algumas das fortalezas mais duradouras do mundo anão. Vê o Clã Ferro-Fundo com desconfiança, mas mantém aliança estreita e histórica com o Clã Chama-Antiga." },
    { nome: "Clã Chama-Antiga", descricao: "Guardião de forjas rituais e tradições de fé ligadas ao fogo sagrado das profundezas. Considerado o clã mais espiritual, frequentemente mediando disputas entre outros clãs quando a tradição exige um árbitro neutro." },
    { nome: "Clã Veio-Negro", descricao: "Especializado em mineração de materiais raros e comércio com regiões demoníacas próximas às montanhas. Visto com certa suspeita pelos demais clãs por seus negócios discretos, mas tolerado por sua riqueza e utilidade comercial." }
  ]
};

window.DEMONIOS = {
  intro: "Demônios formam uma grande raça dividida em muitas linhagens. Demônio descreve origem, não caráter: dentro dela existem povos organizados, culturas ricas e tradições tão legítimas quanto as de qualquer outro povo de Valédria.",
  img: "assets/img/racas/demonios.jpg",
  subracas: [
    {
      nome: "Orcs das Planícies",
      descricao: "Pele verde-oliva, porte alto e musculoso, habitantes das grandes planícies áridas marcadas por monólitos de pedra e campos de sepultamento ancestral. Vivem em tendas de couro reforçado organizadas em círculos ao redor de fogueiras cerimoniais, formando acampamentos que se movem conforme a estação e a caça. Sua fé venera ancestrais guerreiros e espíritos da terra aberta.",
      profissoes: "Caça, pastoreio, guerra tribal e liderança por mérito de combate.",
      caracteristica: "Resistência natural à fadiga em longas marchas e vantagem em testes de intimidação baseados em presença física.",
      img: "assets/img/racas/orcs-das-planicies.jpg"
    },
    {
      nome: "Goblins das Minas",
      descricao: "Pequenos e ágeis, pele acinzentada ou avermelhada pelo calor constante, adaptados à vida em cidades subterrâneas em cavernas vulcânicas ou próximas a veios de minério raro. Vivem em assentamentos verticais escavados nas paredes de grandes cavernas, conectados por pontes de corda e escadas talhadas na rocha, iluminados por lanternas alquímicas. Sua fé é prática e supersticiosa, ligada à sorte, ao fogo subterrâneo e a rituais de proteção contra desmoronamentos.",
      profissoes: "Mineração, alquimia rudimentar, comércio de materiais raros e engenharia de armadilhas.",
      caracteristica: "Visão adaptada a ambientes de pouca luz e habilidade natural para identificar minerais raros pelo cheiro e textura da rocha.",
      img: "assets/img/racas/goblins-das-minas.jpg"
    },
    {
      nome: "Demônios do Mar Profundo",
      descricao: "Pele azulada ou acinzentada, porte alto e traços adaptados à vida costeira, habitantes de vilas de pesca erguidas sobre penhascos e enseadas protegidas. Vivem em casas de madeira escura e osso de criaturas marinhas, decoradas com redes, conchas e ornamentos rituais. Sua fé venera entidades das profundezas com respeito e cautela, com oferendas ao mar antes de grandes viagens ou tempestades.",
      profissoes: "Pesca, construção naval, guerra costeira e comércio marítimo com portos humanos distantes.",
      caracteristica: "Tolerância excepcional a água fria e correntes fortes, além de vantagem em testes de natação e retenção de fôlego.",
      img: "assets/img/racas/demonios-do-mar-profundo.jpg"
    },
    {
      nome: "Naga-Demônios do Deserto",
      descricao: "Corpo híbrido, torso humanoide e cauda serpentina coberta por escamas douradas e brancas, habitantes de ruínas antigas semienterradas em desertos de areia fina. Adaptam estruturas antigas de civilizações esquecidas como suas próprias moradias, decoradas com joias, tecidos leves e ornamentos de metal precioso. Sua fé é ligada a divindades solares e serpentinas antigas, praticada em rituais de dança sob o sol do meio-dia.",
      profissoes: "Guarda de ruínas, comércio de artefatos antigos, alquimia de venenos e magia derivada de encantamento antigo.",
      caracteristica: "Resistência natural a veneno e calor extremo, além de presença hipnótica sutil que concede vantagem em testes de Carisma ligados a persuasão ou intimidação silenciosa.",
      img: "assets/img/racas/naga-demonios-do-deserto.jpg"
    },
    {
      nome: "Demônios das Montanhas Vermelhas",
      descricao: "Pele acinzentada com tons avermelhados, chifres curvos e traços marciais, habitantes de fortalezas erguidas em picos vulcânicos e vales cercados por lava resfriada. Vivem em cidadelas de pedra escura, com telhados inclinados no estilo das terras orientais de Valédria, decoradas com lanternas de papel e estandartes cerimoniais. Sua fé mistura disciplina marcial com veneração a espíritos de honra e ancestralidade.",
      profissoes: "Esgrima, forja de armas cerimoniais, administração de clã e diplomacia entre territórios demoníacos rivais.",
      caracteristica: "Disciplina natural em combate, com vantagem em testes de resistência contra medo e intimidação, além de afinidade cultural elevada com técnicas de Aura marcial.",
      img: "assets/img/racas/demonios-das-montanhas-vermelhas.jpg"
    }
  ]
};

window.TRANSFORMACAO_DE_LINHAGEM = "A Transformação de Linhagem é o único método pelo qual um humano pode adquirir características físicas ou mágicas permanentes de outra raça. É um evento raríssimo, tratado sempre como conquista narrativa maior, nunca como opção corriqueira de criação de personagem.";
