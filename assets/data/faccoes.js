window.FACCOES = [
  {
    nome: "Ordem do Alvorecer",
    tipo: "Militar / Religiosa",
    resumo: "Irmandade de cavaleiros que protege vilas e estradas contra monstros, bandidos organizados e os desaparecimentos misteriosos que afetam vilas remotas, respondendo apenas à própria hierarquia e, nominalmente, à coroa.",
    estrutura: [
      { posto: "Escudeiro", funcao: "Aprendiz, ainda não jurou os votos completos" },
      { posto: "Cavaleiro", funcao: "Membro pleno, atua em patrulhas e missões de proteção" },
      { posto: "Cavaleiro-Comandante", funcao: "Lidera um destacamento regional" },
      { posto: "Grão-Mestre", funcao: "Líder máximo da Ordem, sede na capital" }
    ],
    filiacao: "Um personagem pode se filiar como Escudeiro após demonstrar coragem em um ato público de proteção e ser recomendado por um Cavaleiro existente. A promoção a Cavaleiro pleno exige completar uma \"provação\" — missão perigosa designada pela Ordem.",
    gancho: "A Ordem está, sem saber, cada vez mais próxima de descobrir fragmentos da conspiração ligada aos desaparecimentos através de suas próprias investigações. Um cavaleiro-jogador pode se tornar o elo entre a Ordem e o grupo, ou criar tensão se a Ordem confiar demais na coroa.",
    figura: "Grão-Mestre Aldric Ferrovento — veterano de dezenas de campanhas contra monstros, cego de um olho por uma cicatriz de batalha antiga. Leal à ideia da coroa, não necessariamente ao Rei atual.",
    img: "assets/img/faccoes/ordem-do-alvorecer.jpg"
  },
  {
    nome: "Círculo da Chama Silenciosa",
    tipo: "Seita religiosa secreta",
    resumo: "Seita que acredita que a fé oficial esconde verdades incômodas sobre O Criador e a real natureza de Valédria como o globo de neve sustentado por mãos gigantes. Opera em segredo, estudando textos proibidos sobre por que a barreira do mundo está enfraquecendo.",
    estrutura: [
      { posto: "Ouvinte", funcao: "Recém-chegado, ainda testando a confiança do Círculo" },
      { posto: "Guardião da Chama", funcao: "Membro pleno, com acesso a textos e reuniões regulares" },
      { posto: "Voz do Silêncio", funcao: "Líder de uma célula regional do Círculo" }
    ],
    filiacao: "Ingressar exige convite — não há recrutamento aberto. Curiosidade genuína sobre a natureza do mundo, questionar a fé oficial abertamente, ou tropeçar em conhecimento protegido pode atrair a atenção de um Guardião da Chama, que testará o candidato antes de convidá-lo.",
    gancho: "O Círculo pode ser a única organização humana que já suspeita da existência de algo como O Salvador, embora sem saber o nome ou a forma exata — apenas fragmentos de textos sobre \"aquele que promete salvação através de sacrifício\".",
    figura: "Voz do Silêncio Yara Penumbra — ex-sacerdotisa do templo oficial que abandonou a fé institucional após encontrar um texto que a instituição tentou destruir. Carismática, reservada, desconfiada de qualquer autoridade formal.",
    img: "assets/img/faccoes/circulo-da-chama-silenciosa.jpg"
  },
  {
    nome: "Liga dos Caminhos",
    tipo: "Rede informal de informantes e contrabandistas",
    resumo: "Rede sem sede fixa e sem líder único que conecta contrabandistas, informantes, batedores de estrada e comerciantes discretos por toda a Terra dos Humanos, operando por reciprocidade de favores.",
    estrutura: [
      { posto: "Sem postos formais", funcao: "Reputação medida por favores feitos e recebidos, rastreados informalmente por quem já negociou com você" }
    ],
    filiacao: "Não existe cerimônia de filiação — um personagem se torna parte da Liga organicamente, fazendo negócios recorrentes, cumprindo a palavra dada e sendo apresentado por alguém já da rede, como Osmar Vantte em Ponte Alta.",
    gancho: "A Liga pode ter cruzado, sem saber o significado, com os mercenários que atacaram Amieiro — talvez tenha vendido informação para eles sem saber o propósito real, gerando um conflito moral se os jogadores descobrirem essa conexão indireta.",
    figura: "Nenhuma central — mas Osmar Vantte, em Ponte Alta, é um dos nós mais confiáveis da rede.",
    img: "assets/img/faccoes/liga-dos-caminhos.jpg"
  }
];

window.FACCOES_RELACOES = [
  { faccao: "Ordem do Alvorecer", guilda: "Cooperação ocasional em ameaças grandes", coroa: "Lealdade formal, mas crescente desconfiança", entreFaccoes: "Desconfia do Círculo, ignora a Liga" },
  { faccao: "Círculo da Chama Silenciosa", guilda: "Sem relação formal", coroa: "Hostilidade mútua velada", entreFaccoes: "Curioso sobre a Ordem, usa a Liga para obter textos raros" },
  { faccao: "Liga dos Caminhos", guilda: "Competição leve por informação", coroa: "Nenhuma lealdade, evita contato oficial", entreFaccoes: "Vende informação para ambos quando conveniente" }
];
