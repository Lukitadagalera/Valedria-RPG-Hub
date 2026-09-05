/* ============================================================
   DOSSIÊS DE CIDADES — dados
   Consolida geografia.js, sociedade.js, guilda.js e faccoes.js em
   uma ficha por localidade. Nunca inclui a Camada 2/3 do Livro do
   Mestre — apenas o que já é público/Camada 1.
   ============================================================ */
window.DOSSIES_CIDADES = [
  {
    nome: "Amieiro",
    reino: "Valmeira",
    tipo: "Vila inicial",
    populacao: "150–250 habitantes",
    geografia: "Pequena vila agrícola no interior de Valmeira, cercada por campos de trigo, um riacho e a borda de uma floresta antiga, sem muralhas.",
    locaisInternos: ["Taverna com quartos simples", "Forja pequena", "Capela de pedra", "Moinho junto ao rio", "Feira semanal"],
    npcs: ["Mara, a Curandeira", "Doran, o Vigia"],
    missoesGuilda: ["O Poço Silencioso", "Carroça Perdida na Estrada de Ponte Alta", "A Floresta que Sussurra"],
    faccoesPresentes: [],
    ganchoPublico: "Ataque recente à vila, aparentemente organizado — moradores suspeitam que crianças e jovens foram alvo específico, embora o motivo exato permaneça desconhecido."
  },
  {
    nome: "Ponte Alta",
    reino: "Valmeira",
    tipo: "Primeira cidade da rota",
    populacao: "1.200–2.000 habitantes",
    geografia: "Construída ao redor de uma ponte de pedra sobre o rio principal da região, com muralha baixa parcial e mercado diário.",
    locaisInternos: ["Mercado coberto", "Doca fluvial com barcaças de carga", "Ferraria", "Oficina de carpintaria", "Igreja de pedra", "Guarda municipal", "Taverna-estalagem de dois andares"],
    npcs: ["Mestra Oriane", "Velho Tancredo", "Osmar Vantte (Liga dos Caminhos)"],
    missoesGuilda: ["Contrabando no Rio", "A Dívida do Ferreiro", "Enchente Próxima"],
    faccoesPresentes: ["Liga dos Caminhos"],
    ganchoPublico: "Ponto nodal de comércio fluvial entre Amieiro, Ponte Alta e Portovale — boatos de contrabando circulam entre os mercadores da doca."
  },
  {
    nome: "Portovale",
    reino: "Valmeira",
    tipo: "Capital de Valmeira",
    populacao: "Acima de 15.000 habitantes",
    geografia: "Erguida na foz de um grande rio, com porto marítimo ativo, muralhas completas, alfândega real e o Palácio de Valmeira.",
    locaisInternos: ["Porto marítimo", "Alfândega real", "Palácio de Valmeira", "Bairros de mercadores estrangeiros"],
    npcs: ["Rei Halvard de Valmeira"],
    missoesGuilda: [],
    faccoesPresentes: [],
    ganchoPublico: "Nobres do interior sentem que a coroa negligencia vilas afastadas como Amieiro — tensão política crescente."
  },
  {
    nome: "Cárdenas Alta",
    reino: "Cárdenas",
    tipo: "Capital de Cárdenas",
    populacao: "Cerca de 10.000 habitantes",
    geografia: "Cidade-fortaleza erguida sobre uma colina, com muralhas duplas, guarnição permanente e o Castelo de Cárdenas.",
    locaisInternos: ["Castelo de Cárdenas", "Guarnição militar"],
    npcs: ["Rainha Ismalda de Cárdenas"],
    missoesGuilda: ["Recrutamento em Cárdenas Alta", "Escolta até Feira Nova"],
    faccoesPresentes: ["Ordem do Alvorecer"],
    ganchoPublico: "Recursos concentrados em expedições contra o Bestiário enquanto estradas comerciais seguem inseguras."
  },
  {
    nome: "Academia de Valédria",
    reino: "Cárdenas (neutra)",
    tipo: "Cidade-campus neutra",
    populacao: "Variável",
    geografia: "Dedicada ao ensino de Magia Externa, com torres de estudo por escola, biblioteca central e ala diplomática.",
    locaisInternos: ["Torres de estudo (Água, Terra, Fogo, Ar, Espacial, Barreiras, Cura)", "Biblioteca central", "Ala diplomática"],
    npcs: ["Arquimago Salendir"],
    missoesGuilda: ["Componente Roubado", "O Aluno Desertor"],
    faccoesPresentes: [],
    ganchoPublico: "Guardiã de registros sobre Transformação de Linhagem — alunos desertores levam conhecimento proibido."
  },
  {
    nome: "Montegris",
    reino: "Ostenfeld",
    tipo: "Capital de Ostenfeld",
    populacao: "Variável",
    geografia: "Construída em terraços de pedra na base das montanhas, misturando arquitetura humana e anã.",
    locaisInternos: ["Ruas em degraus", "Edifícios escavados na rocha"],
    npcs: ["Rei Bortan de Ostenfeld"],
    missoesGuilda: ["Disputa com o Clã Pedra-Funda"],
    faccoesPresentes: [],
    ganchoPublico: "Principal ponto de comércio entre humanos e clãs anões, com relações que variam conforme o clã."
  },
  {
    nome: "Encruzilhada",
    reino: null,
    tipo: "Cidade Livre",
    populacao: "Variável",
    geografia: "Única grande cidade aberta a todas as raças, governada por um conselho eleito, sem exército de reino, apenas guarda mista.",
    locaisInternos: ["Sede do conselho", "Guarda mista"],
    npcs: ["Conselheira Nyx", "Velho Aerith"],
    missoesGuilda: [],
    faccoesPresentes: [],
    ganchoPublico: "Conflitos armados dentro da cidade são quebra grave do tratado de neutralidade entre humanos, elfos, anões e demônios."
  }
];
