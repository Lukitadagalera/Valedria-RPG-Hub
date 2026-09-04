/* ============================================================
   BESTIÁRIO DE VALÉDRIA — dados
   Para adicionar uma criatura nova: copie um objeto do array
   BESTIARIO e edite os campos. "img" aponta para o arquivo que
   deve existir em assets/img/monstros/ — se o arquivo não existir
   ainda, o site mostra um quadro de espaço reservado automático.
   Todas as criaturas aqui são monstros: sem fala, sem cultura
   jogável e sem organização social complexa.
   ============================================================ */
window.BESTIARIO = [
  // ---------------- Criaturas comuns ----------------
  {
    nome: "Lobo das Estradas", categoria: "Comum", ameaca: "Baixa", nivel: "1",
    atributos: { forca: 2, destreza: 3, constituicao: 2, sabedoria: 2, carisma: 1 },
    defesa: 11, vida: 14,
    local: "Estradas, colinas e bordas de floresta de todas as nações",
    descricao: "Fera comum de pelagem cinza-acastanhada, encontrada em florestas, colinas e beiras de estrada. Caça em grupos e tenta isolar alvos frágeis antes de recuar diante de força superior.",
    img: "assets/img/monstros/lobo-das-estradas.jpg"
  },
  {
    nome: "Javali Selvagem", categoria: "Comum", ameaca: "Baixa (Moderada em bando)", nivel: "1–2",
    atributos: { forca: 4, destreza: 2, constituicao: 3, sabedoria: 1, carisma: 1 },
    defesa: 10, vida: 20,
    local: "Florestas, matas úmidas e campos abertos das regiões temperadas",
    descricao: "Fera baixa e musculosa, de presas curvas, dorso blindado por placas naturais espessas e temperamento extremamente territorial. Ataca em linha reta e pode derrubar qualquer um em seu caminho quando surpreendido ou acuado.",
    img: "assets/img/monstros/javali-selvagem.jpg"
  },
  {
    nome: "Corvos-Sombra", categoria: "Comum", ameaca: "Baixa", nivel: "1",
    atributos: { forca: 1, destreza: 3, constituicao: 1, sabedoria: 3, carisma: 1 },
    defesa: 13, vida: 8,
    local: "Ruínas, torres antigas, santuários quebrados e regiões de magia instável",
    descricao: "Aves negras de olhos brilhantes, atraídas por magia instável, ruínas e proteções antigas enfraquecidas. Não são naturalmente agressivas, mas em grande número tornam-se um presságio de corrupção mágica e atacam olhos, rostos e feridos expostos.",
    img: "assets/img/monstros/corvos-sombra.jpg"
  },
  {
    nome: "Aranha-de-Casca", categoria: "Comum", ameaca: "Baixa a Moderada", nivel: "1–2",
    atributos: { forca: 2, destreza: 4, constituicao: 2, sabedoria: 2, carisma: 1 },
    defesa: 12, vida: 18,
    local: "Florestas densas, matas antigas e trilhas fechadas",
    descricao: "Aranha grande, de corpo pesado e textura de madeira úmida, perfeitamente camuflada entre troncos, raízes e copas escuras. Fica imóvel por longos períodos e ataca quando a presa cruza sua trilha ou toca sua teia.",
    img: "assets/img/monstros/aranha-de-casca.jpg"
  },
  // ---------------- Floresta e ruína ----------------
  {
    nome: "Rasga-Bruma", categoria: "Floresta e ruína", ameaca: "Baixa a Moderada", nivel: "1",
    atributos: { forca: 2, destreza: 4, constituicao: 2, sabedoria: 2, carisma: 1 },
    defesa: 12, vida: 16,
    local: "Florestas próximas a selos, santuários e monumentos antigos enfraquecidos",
    descricao: "Criatura pequena e inquieta, formada por névoa, galhos, pelos úmidos e olhos apagados. Surge em áreas onde proteções antigas falharam e tende a agir em grupo, atacando sob escuridão e neblina.",
    img: "assets/img/monstros/rasga-bruma.jpg"
  },
  {
    nome: "Uivador de Névoa", categoria: "Floresta e ruína", ameaca: "Moderada", nivel: "3–4",
    atributos: { forca: 3, destreza: 5, constituicao: 3, sabedoria: 3, carisma: 2 },
    defesa: 13, vida: 34,
    local: "Florestas sombrias, caminhos abandonados e ruínas cobertas por névoa",
    descricao: "Predador noturno de porte médio, semelhante a um lobo espectral de pelagem escura e névoa arrastando pelo corpo. Caça sozinho ou em pares, usando seu uivo para desorientar antes do bote.",
    img: "assets/img/monstros/uivador-de-nevoa.jpg"
  },
  {
    nome: "Lobo da Floresta", categoria: "Floresta e ruína", ameaca: "Moderada em matilha", nivel: "2–3",
    atributos: { forca: 3, destreza: 4, constituicao: 3, sabedoria: 2, carisma: 1 },
    defesa: 12, vida: 30,
    local: "Florestas densas, montes arborizados e regiões de caça afastadas",
    descricao: "Predador lupino maior que o lobo comum, de pelagem branca ou azulada, marcada por espinhos, cristas ou placas ósseas. Vive em matilhas organizadas e domina trilhas profundas de florestas antigas.",
    img: "assets/img/monstros/lobo-da-floresta.jpg"
  },
  {
    nome: "Escamado das Ruínas", categoria: "Floresta e ruína", ameaca: "Moderada", nivel: "3–4",
    atributos: { forca: 4, destreza: 4, constituicao: 3, sabedoria: 2, carisma: 1 },
    defesa: 13, vida: 38,
    local: "Ruínas antigas, entradas de tumbas, santuários quebrados e vales pedregosos",
    descricao: "Predador reptiliano bípede, coberto de escamas secas, com garras fortes e hábito de usar armas ou ferramentas roubadas de antigos exploradores. É hostil, territorial e embosca intrusos em passagens estreitas.",
    img: "assets/img/monstros/escamado-das-ruinas.jpg"
  },
  {
    nome: "Lagarto de Ruína", categoria: "Floresta e ruína", ameaca: "Moderada a Alta", nivel: "4–5",
    atributos: { forca: 5, destreza: 2, constituicao: 5, sabedoria: 2, carisma: 1 },
    defesa: 14, vida: 55,
    local: "Ruínas ensolaradas, vales rochosos, templos semiabertos e cavernas rasas",
    descricao: "Réptil pesado e blindado por placas minerais, de patas curtas e mordida esmagadora. Hostil por natureza, caça qualquer intruso que se aproxime de seu território, ovos ou área de aquecimento nas pedras antigas.",
    img: "assets/img/monstros/lagarto-de-ruina.jpg"
  },
  {
    nome: "Saqueador Verde", categoria: "Floresta e ruína", ameaca: "Moderada em grupo", nivel: "2–3",
    atributos: { forca: 3, destreza: 4, constituicao: 3, sabedoria: 2, carisma: 1 },
    defesa: 12, vida: 32,
    local: "Beiras de estrada, gargantas de pedra, vales estreitos e fronteiras ermas",
    descricao: "Humanoide selvagem de pele esverdeada, corpo ágil e hábito de emboscar viajantes em estradas secundárias. Não possui linguagem nem cultura; age por instinto de caça, oportunismo e território.",
    img: "assets/img/monstros/saqueador-verde.jpg"
  },
  {
    nome: "Raposa de Nove Caudas", categoria: "Floresta e ruína", ameaca: "Alta", nivel: "5–6",
    atributos: { forca: 2, destreza: 6, constituicao: 4, sabedoria: 5, carisma: 3 },
    defesa: 15, vida: 220,
    local: "Florestas encantadas, regiões crepusculares e áreas de Mana instável ligadas ao fogo",
    descricao: "Fera arcana de pelo vermelho intenso, patas aquecidas e múltiplas caudas flamejantes. Não fala nem raciocina como um povo, mas possui astúcia sobrenatural, evitando confrontos desnecessários e manipulando o terreno com fogo e distração.",
    img: "assets/img/monstros/raposa-de-nove-caudas.jpg"
  },
  {
    nome: "Cervo dos Galhos Mortos", categoria: "Floresta e ruína", ameaca: "Moderada", nivel: "4–5",
    atributos: { forca: 4, destreza: 5, constituicao: 4, sabedoria: 4, carisma: 2 },
    defesa: 14, vida: 48,
    local: "Bosques antigos, clareiras sagradas e trilhas florestais esquecidas",
    descricao: "Cervo branco e silencioso, de olhos pálidos e galhadas que lembram raízes secas, galhos retorcidos e madeira antiga. É normalmente pacífico e arisco, mas reage com violência se for caçado, ferido ou encurralado.",
    img: "assets/img/monstros/cervo-dos-galhos-mortos.jpg"
  },
  {
    nome: "Náiade da Fonte Antiga", categoria: "Floresta e ruína", ameaca: "Alta em território próprio", nivel: "5–6",
    atributos: { forca: 2, destreza: 5, constituicao: 4, sabedoria: 6, carisma: 3 },
    defesa: 15, vida: 240,
    local: "Nascentes antigas, riachos profundos, bosques sagrados e fontes escondidas",
    descricao: "Entidade de água viva com forma humanoide fluida, ligada a nascentes, poços e riachos protegidos. É pacífica e raramente inicia hostilidade, mas reage se sua fonte for corrompida, saqueada ou profanada.",
    img: "assets/img/monstros/naiade-da-fonte-antiga.jpg"
  },
  {
    nome: "Guardião de Raiz", categoria: "Floresta e ruína", ameaca: "Alta", nivel: "6–7",
    atributos: { forca: 7, destreza: 1, constituicao: 7, sabedoria: 4, carisma: 2 },
    defesa: 15, vida: 320,
    local: "Florestas élficas antigas, santuários naturais e regiões protegidas por magia vegetal",
    descricao: "Colosso de tronco, pedra, raízes e musgo, semelhante a uma estátua viva da própria floresta. Costuma apenas vigiar e expulsar intrusos, atacando somente quando a mata, um santuário natural ou ele mesmo são ameaçados.",
    img: "assets/img/monstros/guardiao-de-raiz.jpg"
  },
  // ---------------- Montanha, pedra e profundidade ----------------
  {
    nome: "Urso de Pedra", categoria: "Montanha e profundidade", ameaca: "Alta", nivel: "5–6",
    atributos: { forca: 6, destreza: 2, constituicao: 6, sabedoria: 2, carisma: 1 },
    defesa: 14, vida: 260,
    local: "Desfiladeiros, montanhas altas, cavernas e passagens anãs",
    descricao: "Urso enorme de pelagem áspera, garras minerais e placas de cristal ou rocha incrustadas no dorso. Extremamente territorial, combate até expulsar ou esmagar quem invadiu sua caverna ou passagem de montanha.",
    img: "assets/img/monstros/urso-de-pedra.jpg"
  },
  {
    nome: "Harpia das Fendas", categoria: "Montanha e profundidade", ameaca: "Moderada", nivel: "4–5",
    atributos: { forca: 2, destreza: 5, constituicao: 3, sabedoria: 4, carisma: 4 },
    defesa: 13, vida: 40,
    local: "Penhascos, fendas profundas e cânions montanhosos",
    descricao: "Criatura alada de rosto quase humano e voz enganosa, especializada em atrair vítimas para precipícios. Atua com emboscada e evita combate sem vantagem.",
    img: "assets/img/monstros/harpia-das-fendas.jpg"
  },
  {
    nome: "Golem de Fronteira", categoria: "Montanha e profundidade", ameaca: "Alta", nivel: "6–8",
    atributos: { forca: 7, destreza: 1, constituicao: 7, sabedoria: 1, carisma: 1 },
    defesa: 16, vida: 350,
    local: "Ruínas antigas, fronteiras esquecidas, santuários e corredores monumentais",
    descricao: "Construto colossal de pedra rúnica, criado por civilizações antigas para guardar limites sagrados, ruínas e entradas proibidas. Não tem malícia nem fala, apenas ordens muito antigas e poder suficiente para massacrar invasores descuidados.",
    img: "assets/img/monstros/golem-de-fronteira.jpg"
  },
  {
    nome: "Grifo das Alturas", categoria: "Montanha e profundidade", ameaca: "Alta", nivel: "6–7",
    atributos: { forca: 5, destreza: 6, constituicao: 5, sabedoria: 4, carisma: 2 },
    defesa: 15, vida: 280,
    local: "Cordilheiras, penhascos, ninhos de altitude e picos acima das nuvens",
    descricao: "Predador nobre de corpo felino e asas enormes, capaz de planar entre picos nevados e atacar de cima com precisão brutal. Caça cabras montesas, cervos e viajantes isolados em trilhas de altitude.",
    img: "assets/img/monstros/grifo-das-alturas.jpg"
  },
  {
    nome: "Minotauro das Ruínas", categoria: "Montanha e profundidade", ameaca: "Regional", nivel: "7–8",
    atributos: { forca: 8, destreza: 3, constituicao: 7, sabedoria: 4, carisma: 2 },
    defesa: 15, vida: 520,
    local: "Labirintos de pedra, templos subterrâneos, ruínas profundas e salões abandonados",
    descricao: "Monstro taurino gigantesco, musculoso e agressivo, que vagueia por labirintos, corredores de pedra e ruínas subterrâneas como dono absoluto do espaço. Não fala, mas demonstra inteligência tática elevada, reconhecendo armadilhas, rotas e fraquezas de grupos invasores.",
    img: "assets/img/monstros/minotauro-das-ruinas.jpg"
  },
  // ---------------- Pântano, rio e água parada ----------------
  {
    nome: "Troll do Pântano", categoria: "Pântano e água", ameaca: "Alta", nivel: "5–6",
    atributos: { forca: 7, destreza: 2, constituicao: 6, sabedoria: 2, carisma: 1 },
    defesa: 13, vida: 300,
    local: "Pântanos, ruínas inundadas, mangues e rios mortos",
    descricao: "Gigante disforme coberto por lodo, musgo e pele grossa, capaz de atravessar água rasa e lama sem perder velocidade. Não é racional, mas escolhe o melhor ângulo para atacar, esperando até que suas presas afundem ou se cansem.",
    img: "assets/img/monstros/troll-do-pantano.jpg"
  },
  {
    nome: "Hidra do Pântano", categoria: "Pântano e água", ameaca: "Regional", nivel: "8–10",
    atributos: { forca: 8, destreza: 4, constituicao: 8, sabedoria: 5, carisma: 2 },
    defesa: 16, vida: 800,
    local: "Grandes pântanos, lagos escuros, deltas isolados e ruínas afundadas",
    descricao: "Réptil colossal de múltiplas cabeças, pele encharcada e corpo semissubmerso, adaptado a emboscadas em águas turvas. Cada cabeça observa um ângulo diferente, tornando quase impossível surpreendê-la em seu território.",
    img: "assets/img/monstros/hidra-do-pantano.jpg"
  },
  {
    nome: "Serpente da Lua Velada", categoria: "Pântano e água", ameaca: "Alta", nivel: "6–7",
    atributos: { forca: 4, destreza: 6, constituicao: 5, sabedoria: 5, carisma: 2 },
    defesa: 15, vida: 270,
    local: "Brejos de luar, riachos antigos, círculos de pedra e bosques noturnos",
    descricao: "Serpente longa e elegante de escamas azul-violeta, sempre envolta por névoa fina e brilho lunar. Caça em silêncio absoluto perto de água parada, monólitos e regiões onde a magia da noite é forte.",
    img: "assets/img/monstros/serpente-da-lua-velada.jpg"
  },
  // ---------------- Mortos, ruínas e magia antiga ----------------
  {
    nome: "Guardião Esquecido", categoria: "Mortos e magia antiga", ameaca: "Alta", nivel: "6–7",
    atributos: { forca: 4, destreza: 3, constituicao: 5, sabedoria: 6, carisma: 3 },
    defesa: 15, vida: 280,
    local: "Faróis antigos, torres, ruínas sagradas e monumentos de proteção",
    descricao: "Espírito ligado a santuários, torres ou selos antigos. Nem sempre é hostil; ataca apenas quando algo tenta destruir, corromper ou remover o que protege.",
    img: "assets/img/monstros/guardiao-esquecido.jpg"
  },
  {
    nome: "Enxame de Sussurros", categoria: "Mortos e magia antiga", ameaca: "Alta", nivel: "6–8",
    atributos: { forca: 1, destreza: 5, constituicao: 3, sabedoria: 6, carisma: 5 },
    defesa: 14, vida: 240,
    local: "Locais de corrupção mágica, selos rompidos e ruínas contaminadas",
    descricao: "Nuvem etérea de memórias corrompidas, vozes fragmentadas e culpa antiga condensada. Surge quando uma proteção antiga falha lentamente e se alimenta de medo, confusão e presença prolongada.",
    img: "assets/img/monstros/enxame-de-sussurros.jpg"
  },
  // ---------------- Lendários ----------------
  {
    nome: "Cavaleiro Sepulcral", categoria: "Lendário", ameaca: "Lendária", nivel: "Lendário",
    atributos: null,
    defesa: "Desconhecida", vida: "Desconhecida",
    local: "Necrópoles, ruínas fúnebres, caminhos amaldiçoados e marcos esquecidos",
    descricao: "Figura negra de armadura completa, espada longa e presença funerária esmagadora, surgindo em estradas mortas, cemitérios antigos e rotas onde juramentos foram quebrados. Não fala, mas parece julgar, escolher e punir aqueles que considera indignos.",
    img: "assets/img/monstros/cavaleiro-sepulcral.jpg"
  },
  {
    nome: "Dragão de Cristal", categoria: "Lendário", ameaca: "Lendária", nivel: "Lendário",
    atributos: null,
    defesa: "Desconhecida", vida: "Desconhecida",
    local: "Cavernas de cristal, montanhas profundas e veios de Mana mineral",
    descricao: "Dracônico colossal de escamas facetadas e brilho mineral, ligado a cavernas de cristal, Mana condensada e profundezas montanhosas. Observa, mede e protege seu domínio com cálculo frio, reagindo apenas quando percebe ameaça real ou cobiça excessiva.",
    img: "assets/img/monstros/dragao-de-cristal.jpg"
  },
  {
    nome: "Grifo Solar", categoria: "Lendário", ameaca: "Lendária", nivel: "Lendário",
    atributos: null,
    defesa: "Desconhecida", vida: "Desconhecida",
    local: "Montanhas sagradas, picos solares e templos altos",
    descricao: "Criatura majestosa de asas douradas e porte celeste, associada a picos acima das nuvens, antigos santuários e lugares tocados por luz sagrada. Não age como predador comum; escolhe quando intervir, quando caçar e quando apenas observar do alto.",
    img: "assets/img/monstros/grifo-solar.jpg"
  },
  {
    nome: "Serpente das Profundezas Frias", categoria: "Lendário", ameaca: "Lendária", nivel: "Lendário",
    atributos: null,
    defesa: "Desconhecida", vida: "Desconhecida",
    local: "Mares e quedas d'água ligadas aos Portais do Paraíso",
    descricao: "Entidade ancestral das águas ligadas às Lágrimas do Criador, colossal, silenciosa e quase impossível de descrever por completo. Marinheiros e peregrinos a conhecem por marés estranhas, cardumes em fuga e o brilho anormal da água antes do desastre.",
    img: "assets/img/monstros/serpente-das-profundezas-frias.jpg"
  },
  {
    nome: "Fênix Carmesim", categoria: "Lendário", ameaca: "Lendária", nivel: "Lendário",
    atributos: null,
    defesa: "Desconhecida", vida: "Desconhecida",
    local: "Vulcões, ruínas incendiadas, desertos quentes e montanhas de fogo",
    descricao: "Ave lendária de fogo vivo, cinza ardente e brilho vulcânico, que paira sobre ruínas queimadas, crateras e regiões marcadas por cataclismos antigos. Sua presença altera o clima, aquece a pedra e deixa rastros de brasa mesmo quando não combate.",
    img: "assets/img/monstros/fenix-carmesim.jpg"
  }
  ,
  // ---------------- Territórios não-humanos ----------------
  {
    nome: "Guardião do Véu Verde", categoria: "Floresta e ruína", ameaca: "Alta", nivel: "6-7",
    atributos: { forca: 5, destreza: 4, constituicao: 5, sabedoria: 3, carisma: 1 },
    defesa: 16, vida: 190,
    local: "Coração Verde e Raízes Antigas, nas Terras Élficas",
    descricao: "Ser feito de casca viva, raízes entrelaçadas e musgo luminoso, criado pela própria floresta para expulsar invasores que ameacem o Véu Verde. Move-se em silêncio absoluto entre as árvores e ataca com galhos que se comportam como lâminas quando provocado.",
    img: "assets/img/monstros/guardiao-do-veu-verde.jpg"
  },
  {
    nome: "Verme de Granito", categoria: "Montanha e profundidade", ameaca: "Moderada a Alta", nivel: "4-6",
    atributos: { forca: 4, destreza: 1, constituicao: 6, sabedoria: 1, carisma: 1 },
    defesa: 15, vida: 140,
    local: "Abismo Interior e túneis profundos das Terras Anãs",
    descricao: "Criatura cega e blindada que escava através da pedra maciça no Ventre de Pedra, atraída pelo calor de forjas e corpos vivos. Anões de Gryndak treinam para reconhecer o tremor característico de sua aproximação antes que rompa o piso de uma galeria.",
    img: "assets/img/monstros/verme-de-granito.jpg"
  },
  {
    nome: "Devorador de Areia", categoria: "Deserto e cinzas", ameaca: "Moderada", nivel: "3-5",
    atributos: { forca: 3, destreza: 4, constituicao: 3, sabedoria: 2, carisma: 1 },
    defesa: 13, vida: 60,
    local: "Mar de Areia e Ruínas Ardentes, nas Terras Demoníacas",
    descricao: "Massa de areia animada por energia residual das Ruínas Ardentes, que assume forma vagamente humanoide para emboscar viajantes. Dissolve-se em uma nuvem de poeira quando destruído, apenas para se reformar horas depois se a energia da ruína próxima permanecer instável.",
    img: "assets/img/monstros/devorador-de-areia.jpg"
  },
  {
    nome: "Cão de Brasa de Vrak'Thon", categoria: "Deserto e cinzas", ameaca: "Alta", nivel: "6",
    atributos: { forca: 4, destreza: 5, constituicao: 4, sabedoria: 2, carisma: 1 },
    defesa: 15, vida: 120,
    local: "Borda das Cinzas e proximidades de Vrak'Thon",
    descricao: "Fera de pelagem incandescente criada ou domesticada por castas altas demoníacas para patrulhar as fronteiras de Vrak'Thon. Caça em pares, deixando marcas de queimadura no solo por onde passa, e é temida até por goblins de Skral que conhecem bem o deserto.",
    img: "assets/img/monstros/cao-de-brasa.jpg"
  }
];

window.BESTIARIO_AMEACA_VIDA = [
  { grau: "Baixa", vida: "12 a 24", papel: "Pode cair em poucos golpes ou em pequenos grupos" },
  { grau: "Moderada", vida: "28 a 55", papel: "Exige alguma coordenação e mais de uma rodada" },
  { grau: "Alta", vida: "180 a 350", papel: "Exige grupo completo, várias rodadas e recursos" },
  { grau: "Regional", vida: "500 a 900", papel: "Encontro central de missão, não combate casual" },
  { grau: "Lendária", vida: "Desconhecida", papel: "Nunca deve depender apenas de dano bruto" }
];
