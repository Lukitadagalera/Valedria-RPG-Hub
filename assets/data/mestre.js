/* ============================================================
   LIVRO DO MESTRE — Guia para Narrar Valédria
   Conteúdo permanente e independente de campanhas específicas.
   ============================================================ */

window.MESTRE_INTRO = {
  titulo: "Narrar Valédria",
  texto: "O Livro do Mestre não define uma história obrigatória. Ele ensina a transformar o mundo, seus povos, regiões, monstros, facções e conflitos em campanhas próprias. A regra central é simples: apresente situações, não roteiros; mostre consequências, não destinos predeterminados.",
  regra_de_ouro: "Prepare problemas, interesses e consequências. Deixe que os jogadores decidam o caminho."
};

window.MESTRE_PILARES = [
  { nome: "Exploração", resumo: "Estradas, florestas, ruínas, montanhas e fronteiras devem produzir descoberta, risco e escolha.", pratica: "Toda viagem importante deve revelar algo sobre o mundo, cobrar um custo ou apresentar uma decisão." },
  { nome: "Política", resumo: "Reinos, povos e facções possuem interesses próprios e raramente concordam por completo.", pratica: "Dê a cada conflito pelo menos duas versões plausíveis e interesses compreensíveis dos dois lados." },
  { nome: "Consequência", resumo: "Ações alteram reputações, alianças, preços, segurança, acesso e o comportamento dos NPCs.", pratica: "Registre decisões relevantes e faça pelo menos uma delas reaparecer em sessões futuras." },
  { nome: "Mistério", resumo: "Valédria guarda ruínas, magia antiga, histórias contraditórias e criaturas pouco compreendidas.", pratica: "Entregue pistas em fragmentos. Uma descoberta deve responder uma pergunta e criar outra." },
  { nome: "Escolha", resumo: "Os personagens não existem para seguir uma trama; a campanha existe para reagir às escolhas deles.", pratica: "Nunca dependa de uma única pista, um único NPC ou uma única solução para a aventura continuar." }
];

window.MESTRE_CAPITULOS = [
  {
    id: "papel-do-mestre",
    titulo: "1. O papel do Mestre em Valédria",
    resumo: "O Mestre apresenta o mundo, interpreta suas forças e transforma decisões em consequências.",
    blocos: [
      { subtitulo: "Situação antes de roteiro", texto: "Defina o que está acontecendo antes da chegada dos personagens, quem quer o quê e o que acontecerá se ninguém interferir.", pontos: ["Prepare objetivos dos envolvidos, não falas prontas.", "Aceite soluções que você não previu.", "Quando os jogadores mudarem o cenário, atualize o mundo em vez de forçar o plano antigo."] },
      { subtitulo: "Informação justa", texto: "Perigo interessante é perigo que pode ser percebido. Antes de uma decisão arriscada, ofereça sinais suficientes para que os jogadores entendam o que está em jogo.", pontos: ["Mostre pegadas, rumores, ruínas, clima, comportamento de animais ou reações de NPCs.", "Falha em teste deve complicar a situação, não apagar toda possibilidade de progresso."] }
    ]
  },
  {
    id: "pilares",
    titulo: "2. Os pilares de Valédria",
    resumo: "Exploração, política, consequência, mistério e escolha formam a identidade das campanhas no cenário.",
    blocos: [
      { subtitulo: "Misture pilares", texto: "Uma boa sessão normalmente combina dois ou três pilares. Uma caçada pode ser exploração + mistério; uma audiência real pode ser política + consequência; uma ruína pode ser exploração + escolha moral.", pontos: ["Evite sessões compostas apenas por combate sem contexto.", "Use o cenário como parte do desafio, não apenas como decoração."] },
      { subtitulo: "Escala gradual", texto: "Comece com pessoas e lugares concretos. Ameaças continentais ganham peso quando os jogadores primeiro se importam com uma vila, uma estrada, um aliado ou uma comunidade." }
    ]
  },
  {
    id: "preparando-campanha",
    titulo: "3. Preparando uma campanha",
    resumo: "Uma campanha precisa de direção inicial, não de final definido.",
    blocos: [
      { subtitulo: "As cinco perguntas", texto: "Antes da primeira sessão, responda cinco perguntas simples.", pontos: ["Onde o grupo começa?", "Qual problema já está acontecendo?", "Quem deseja que o problema seja resolvido?", "Quem se beneficia se nada mudar?", "O que piora depois de alguns dias ou semanas?"] },
      { subtitulo: "Três frentes", texto: "Mantenha três acontecimentos ativos no mundo: uma ameaça local, uma tensão regional e um mistério de longo prazo. Os jogadores escolhem qual seguir e você avança as demais quando fizer sentido." }
    ]
  },
  {
    id: "aventuras-arcos",
    titulo: "4. Criando aventuras e arcos",
    resumo: "Construa aventuras como redes de interesses e pistas, não como sequências obrigatórias de cenas.",
    blocos: [
      { subtitulo: "Estrutura básica", texto: "Use: problema → interessados → complicação → descoberta → decisão → consequência. Essa estrutura funciona para investigação, escolta, caça, diplomacia ou exploração." },
      { subtitulo: "Regra das três pistas", texto: "Toda informação indispensável deve poder ser descoberta por pelo menos três caminhos diferentes.", pontos: ["Uma testemunha.", "Uma evidência física.", "Um documento, rumor, magia ou observação do ambiente."] },
      { subtitulo: "Arcos", texto: "Um arco termina quando a situação muda de forma irreversível, não necessariamente quando um inimigo morre. Um reino pode trocar de liderança, uma estrada pode ser reaberta, uma facção pode se dividir ou um segredo pode se tornar público." }
    ]
  },
  {
    id: "regioes-estilos",
    titulo: "5. Regiões e estilos de campanha",
    resumo: "Cada parte de Valédria favorece tipos diferentes de aventura.",
    blocos: [
      { subtitulo: "Valmeira", texto: "Comércio, portos, influência, contrabando, nobreza mercantil e rotas marítimas. Ideal para intriga, negociação e disputas econômicas." },
      { subtitulo: "Cárdenas", texto: "Disciplina militar, fronteiras, expedições, segurança e tensão entre dever e custo humano. Ideal para campanhas de guerra limitada, escolta e decisões de autoridade." },
      { subtitulo: "Ostenfeld", texto: "Montanhas, mineração, relações com anões, isolamento e logística difícil. Ideal para exploração, sobrevivência e disputas por recursos." },
      { subtitulo: "Encruzilhada e terras não humanas", texto: "Diplomacia entre povos, tabus culturais e verdades que os reinos humanos não conhecem. Ideal para campanhas em que informação e reputação valem tanto quanto força." }
    ]
  },
  {
    id: "povos-culturas",
    titulo: "6. Povos, culturas e conflitos",
    resumo: "Raça ou povo deve influenciar relações, costumes e perspectivas, não servir apenas como aparência.",
    blocos: [
      { subtitulo: "Cultura em jogo", texto: "Mostre diferenças por meio de protocolos, prioridades, arquitetura, memória histórica, linguagem, formas de juramento, comércio e tratamento de autoridade." },
      { subtitulo: "Evite blocos homogêneos", texto: "Nenhum povo pensa de uma única maneira. Para cada conflito cultural, crie pelo menos uma voz tradicional, uma pragmática e uma dissidente." }
    ]
  },
  {
    id: "politica-faccoes",
    titulo: "7. Política, reinos e facções",
    resumo: "Facções funcionam melhor quando possuem objetivo, recurso, método, rival e problema interno.",
    blocos: [
      { subtitulo: "Ficha rápida de facção", texto: "Para improvisar uma organização, responda: o que ela quer, o que possui, o que teme, quem a impede e o que pode oferecer ao grupo." },
      { subtitulo: "Política jogável", texto: "Política deve gerar decisões concretas. Uma aliança pode abrir uma fronteira, reduzir preços, liberar documentos, oferecer tropas ou transformar outra facção em rival." }
    ]
  },
  {
    id: "npcs-relacoes",
    titulo: "8. NPCs e relações",
    resumo: "NPC memorável não precisa de biografia longa; precisa querer algo e reagir ao grupo.",
    blocos: [
      { subtitulo: "Cinco elementos", texto: "Defina função, desejo, medo, recurso e limite moral. Isso já permite interpretar a maioria dos NPCs de forma consistente." },
      { subtitulo: "Relações mudam", texto: "NPCs devem lembrar promessas, humilhações, favores e perdas.", pontos: ["Ajuda pequena pode virar informação futura.", "Traição pode fechar portas sem necessariamente criar combate.", "NPC importante pode respeitar o grupo e ainda discordar dele."] }
    ]
  },
  {
    id: "exploracao-viagens",
    titulo: "9. Exploração e viagens",
    resumo: "Viagem é conteúdo quando produz escolha, descoberta ou custo.",
    blocos: [
      { subtitulo: "Três momentos", texto: "Para viagens relevantes, prepare partida, travessia e chegada. Na travessia, use no máximo alguns acontecimentos significativos em vez de rolar encontro a cada hora." },
      { subtitulo: "Encontro de viagem útil", texto: "Um encontro deve fazer pelo menos uma coisa: revelar a região, consumir recurso, oferecer atalho, introduzir NPC, antecipar ameaça ou criar dilema." }
    ]
  },
  {
    id: "encontros-desafios",
    titulo: "10. Encontros e desafios",
    resumo: "Dificuldade nasce de números, ambiente, objetivo e informação.",
    blocos: [
      { subtitulo: "Além de derrotar inimigos", texto: "Use objetivos como proteger alguém, impedir fuga, atravessar área, sobreviver por rodadas, recuperar objeto ou convencer combatentes a recuar." },
      { subtitulo: "Telegrame perigo", texto: "Ameaças altas e lendárias devem ser anunciadas pelo cenário. Destruição anterior, silêncio de animais, relatos contraditórios, rastros enormes ou reação de veteranos dizem aos jogadores que recuar também é uma escolha legítima." }
    ]
  },
  {
    id: "bestiario-mestre",
    titulo: "11. Bestiário para o Mestre",
    resumo: "Monstros de Valédria devem pertencer ao ecossistema e à história da região.",
    blocos: [
      { subtitulo: "Função narrativa", texto: "Antes de escolher uma criatura, decida sua função: predador, guardião, consequência mágica, obstáculo territorial, pista viva ou ameaça central." },
      { subtitulo: "Sinais antes do monstro", texto: "Apresente efeitos antes da criatura: restos de caça, terreno alterado, aldeões mudando rotas, marcas em árvores ou mineração interrompida. Isso transforma a aparição em conclusão de uma descoberta." }
    ]
  },
  {
    id: "magia-linhagem",
    titulo: "12. Magia e Transformação de Linhagem",
    resumo: "Magia deve alterar relações e decisões, não apenas resolver obstáculos.",
    blocos: [
      { subtitulo: "Magia tem testemunhas", texto: "Pergunte quem viu, quem entende o que aconteceu e quem pode se interessar. Uma demonstração rara pode atrair Academia, nobres, estudiosos, rivais ou medo popular." },
      { subtitulo: "Transformação de Linhagem", texto: "Trate-a como fenômeno importante do cenário. Poder elevado pode vir acompanhado de atenção, responsabilidade, risco político, pesquisa ou dilemas sobre identidade e controle." }
    ]
  },
  {
    id: "reputacao-consequencias",
    titulo: "13. Reputação e consequências",
    resumo: "A campanha fica viva quando o mundo responde ao histórico do grupo.",
    blocos: [
      { subtitulo: "Trilhas separadas", texto: "Não use uma reputação global. Registre reputação por comunidade, reino ou facção. Heróis em Amieiro podem ser desconhecidos em Ostenfeld e indesejados por uma guilda rival." },
      { subtitulo: "Consequências proporcionais", texto: "A resposta não precisa ser punição. Boas consequências incluem convite, desconto, acesso, confiança, responsabilidades e expectativas maiores." }
    ]
  },
  {
    id: "recompensas",
    titulo: "14. Recompensas e progressão narrativa",
    resumo: "Dinheiro é apenas uma das formas de mostrar progresso.",
    blocos: [
      { subtitulo: "Recompensas do mundo", texto: "Use favores, cartas de recomendação, títulos, mapas, contatos, acesso a bibliotecas, direito de passagem, abrigo, informação e prioridade em serviços." },
      { subtitulo: "Recompensa com escolha", texto: "Quando possível, ofereça duas recompensas incompatíveis: dinheiro agora ou favor político; item raro ou informação; prestígio em uma facção ou neutralidade perante outra." }
    ]
  },
  {
    id: "criando-conteudo",
    titulo: "15. Criando conteúdo novo para Valédria",
    resumo: "Novo conteúdo deve parecer consequência natural do que já existe no Códice.",
    blocos: [
      { subtitulo: "Novo povoado", texto: "Defina região, fonte de sustento, autoridade, problema atual, relação com vizinhos e um lugar que todos conhecem." },
      { subtitulo: "Novo monstro", texto: "Defina habitat, comportamento, sinal de presença, motivo para conflito e o que muda se ele desaparecer da região." },
      { subtitulo: "Novo NPC", texto: "Defina nome, função, desejo, medo, recurso e uma opinião inicial sobre aventureiros." }
    ]
  },
  {
    id: "ferramentas-rapidas",
    titulo: "16. Tabelas e geradores rápidos",
    resumo: "Ferramentas de improviso ajudam o Mestre a responder às escolhas inesperadas sem paralisar a sessão.",
    blocos: [
      { subtitulo: "Use perguntas, não respostas prontas", texto: "Quando precisar improvisar, combine um problema, um interessado, uma complicação e uma consequência. O resultado já produz uma missão jogável." },
      { subtitulo: "Rumores", texto: "Crie rumores com três estados: verdadeiro, parcialmente verdadeiro e falso por motivo plausível. Os jogadores nunca devem saber pela forma da frase qual categoria receberam." }
    ]
  },
  {
    id: "sessao-zero",
    titulo: "17. Sessão zero e primeira sessão",
    resumo: "Apresente o mundo na quantidade necessária para jogar, não como palestra de história.",
    blocos: [
      { subtitulo: "Sessão zero", texto: "Alinhe tom, nível de perigo, expectativas de exploração, importância de política e como o grupo se conhece.", pontos: ["Escolham uma razão para permanecer juntos.", "Cada personagem deve ter ao menos um vínculo com um lugar, pessoa ou instituição.", "Explique somente o conhecimento de mundo que os personagens realmente teriam."] },
      { subtitulo: "Primeira sessão", texto: "Comece com movimento. Apresente um problema pequeno o bastante para ser compreendido e aberto o bastante para permitir abordagens diferentes. Termine mostrando que o problema local se conecta a algo maior, sem explicar tudo." }
    ]
  },
  {
    id: "campanhas-longas",
    titulo: "18. Construindo campanhas longas",
    resumo: "Campanhas longas crescem por consequência, não por aumento artificial de escala.",
    blocos: [
      { subtitulo: "Da vila ao continente", texto: "Faça cada novo arco nascer de algo conhecido: um aliado pede ajuda em outra região, uma facção reage ao arco anterior, um artefato aponta para outra cultura ou uma decisão altera relações entre reinos." },
      { subtitulo: "Relógios de mundo", texto: "Mantenha duas ou três ameaças avançando independentemente do grupo. A cada intervalo relevante, pergunte o que essas forças fizeram enquanto os personagens estavam ocupados." },
      { subtitulo: "Final aberto", texto: "Planeje condições de clímax, não uma cena final obrigatória. Defina o que cada força fará se vencer e quais decisões podem encerrar o conflito de maneiras diferentes." }
    ]
  }
];

window.MESTRE_TABELAS = {
  aventura: {
    titulo: "Modelo rápido de aventura",
    cabecalhos: ["Etapa", "Pergunta do Mestre"],
    linhas: [
      ["Problema", "O que está errado agora?"],
      ["Interessados", "Quem quer resolver, esconder ou explorar o problema?"],
      ["Complicação", "O que torna a solução menos óbvia?"],
      ["Descoberta", "Que informação muda a leitura da situação?"],
      ["Decisão", "Quais caminhos reais os jogadores podem escolher?"],
      ["Consequência", "O que muda no mundo depois da escolha?"]
    ]
  },
  dificuldade: {
    titulo: "Leitura de dificuldade",
    cabecalhos: ["Grau", "Quando usar", "Como apresentar"],
    linhas: [
      ["Baixa", "Ensinar regra, dar ritmo ou mostrar competência", "Pouco risco de derrota e sinais claros"],
      ["Moderada", "Desafio padrão de uma missão", "Exige recursos, posição ou boa decisão"],
      ["Alta", "Clímax local, elite, terreno perigoso", "Telegrame risco e ofereça alternativas"],
      ["Lendária", "Entidade ou evento que define um arco", "Transforme a aproximação em parte da história; fugir deve ser válido"]
    ]
  },
  reputacao: {
    titulo: "Escala simples de reputação",
    cabecalhos: ["Estado", "Resposta do mundo"],
    linhas: [
      ["Hostil", "Vigilância, preços piores, acesso negado, rivais ativos"],
      ["Desconfiado", "Informação limitada, garantias exigidas, pouca flexibilidade"],
      ["Neutro", "Tratamento comum, sem privilégios nem perseguição"],
      ["Respeitado", "Informação melhor, pequenos favores, portas abertas"],
      ["Aliado", "Riscos assumidos em favor do grupo, recursos e influência compartilhados"]
    ]
  }
};

window.MESTRE_PREPARO_RAPIDO = [
  "Uma situação que piora se ninguém agir.",
  "Três NPCs com objetivos diferentes.",
  "Três pistas ou fatos descobríveis.",
  "Um lugar memorável.",
  "Uma complicação que pode aparecer se o ritmo cair.",
  "Uma consequência para sucesso e outra para fracasso parcial.",
  "Uma pergunta sobre o mundo que a sessão pode responder."
];

window.MESTRE_GERADORES = {
  problemas: ["desaparecimento", "rota interrompida", "criatura deslocada de habitat", "disputa de autoridade", "mercadoria roubada", "fenômeno mágico", "juramento quebrado", "expedição que não retornou"],
  interessados: ["família local", "guilda", "autoridade do reino", "facção rival", "Academia", "comunidade não humana", "mercador", "ordem religiosa"],
  complicacoes: ["a testemunha mente por medo", "o antagonista possui razão parcial", "o clima fecha a rota", "uma segunda facção chega primeiro", "o objeto procurado é perigoso", "resolver o problema prejudica outro grupo", "a ameaça está fugindo de algo pior", "um aliado exige pagamento de favor"],
  consequencias: ["uma estrada muda de controle", "preços locais se alteram", "uma facção ganha influência", "um NPC passa a dever um favor", "uma fronteira fecha", "um rumor sobre o grupo se espalha", "um novo mapa ou local é descoberto", "uma ameaça maior percebe os personagens"]
};
