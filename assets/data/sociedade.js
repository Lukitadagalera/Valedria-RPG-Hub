/* ============================================================
   SOCIEDADE DE VALÉDRIA — dados
   Religião, facções e NPCs, leis e justiça, calendário e história.
   ============================================================ */
window.RELIGIAO = {
  intro: "Valédria não possui um único panteão universal. Cada povo enxerga o divino sob uma lente diferente, e mesmo entre humanos há variações regionais, o que gera tensões religiosas sutis entre Valmeira, Cárdenas e Ostenfeld.",
  tres_rostos: [
    { rosto: "O Rosto da Terra", associado: "Colheita, família e proteção do lar", regiao: "Mais venerado em Valmeira e nas vilas agrícolas como Amieiro e Trigal" },
    { rosto: "O Rosto do Ferro", associado: "Guerra justa, disciplina e dever", regiao: "Dominante em Cárdenas e nas guarnições militares" },
    { rosto: "O Rosto da Pedra", associado: "Trabalho, resistência e herança", regiao: "Mais forte em Ostenfeld, por proximidade e influência cultural anã" }
  ],
  templos: "Templos humanos costumam ter um altar único dividido em três nichos, um para cada Rosto, embora templos menores em vilas como Amieiro tenham apenas o Rosto da Terra em destaque, com os outros dois representados discretamente.",
  cultos_menores: "Além da fé oficial, existem cultos populares tolerados pelas autoridades: veneração de espíritos de rio entre pescadores de Ribamar, superstições sobre a floresta próxima a Amieiro (moradores deixam oferendas na entrada da mata antes de longas viagens) e crenças sobre luzes nas montanhas perto de Montegris, atribuídas a espíritos anões antigos.",
  outros_povos: "Elfos da floresta cultuam ancestrais e árvores-mãe, sem templos fixos, em rituais sazonais. Anões veneram os fundadores de clã e a memória ancestral, em santuários esculpidos na própria rocha. Demônios não possuem religião no sentido humano; sua cultura trata poder pessoal e linhagem como equivalentes ao sagrado, o que intriga e por vezes horroriza clérigos humanos que visitam Encruzilhada.",
  img: "assets/img/sociedade/tres-rostos.png"
};

window.FACCOES_NPCS = [
  { grupo: "Amieiro", nome: "Mara, a Porta-voz", papel: "Espécie de prefeita informal de Amieiro, responsável por mediar disputas locais, receber viajantes e representar a vila diante de autoridades de Ponte Alta ou Portovale. Figura de confiança e ponto de contato natural para qualquer grupo que chegue à vila.", img: "assets/img/sociedade/npc-mara.png" },
  { grupo: "Amieiro", nome: "Irmã Iria", papel: "Cuida da pequena igreja e do orfanato de Amieiro, acolhendo crianças sem família e órfãos de viajantes. Figura religiosa respeitada na vila, próxima o suficiente das pessoas para saber os segredos e aflições de cada família.", img: "assets/img/sociedade/npc-iria.png" },
  { grupo: "Amieiro", nome: "Doran", papel: "Morador mais velho de Amieiro, auxilia a Irmã Iria com o orfanato e as tarefas da igreja. Conhece a vila há décadas e costuma ser a primeira pessoa a notar quando algo muda por ali.", img: "assets/img/sociedade/npc-doran.png" },
  { grupo: "Amieiro", nome: "Fazendeira de Amieiro", papel: "Responsável por boa parte da produção agrícola que sustenta a vila, cuidando de campos de trigo e criação de pequenos animais. Conhece bem as terras ao redor e os ciclos de plantio da região.", img: "assets/img/sociedade/npc-fazendeira-amieiro.png" },
  { grupo: "Amieiro", nome: "Artesã de Amieiro", papel: "Pequena artesã local, produz utensílios simples, tecidos e reparos gerais para os moradores da vila. Trabalho modesto, mas essencial para o cotidiano de Amieiro.", img: "assets/img/sociedade/npc-artesa-amieiro.png" },
  { grupo: "Amieiro", nome: "Mercador de Amieiro", papel: "Vive em Amieiro, mas passa boa parte do tempo viajando entre vilas próximas, comprando e revendendo mercadorias. Uma das poucas pessoas da vila com contato regular com o mundo fora dela.", img: "assets/img/sociedade/npc-mercador-amieiro.png" },
  { grupo: "Coroas e nobreza", nome: "Rei Halvard de Valmeira", papel: "Governa Portovale com foco em comércio marítimo, mantendo boas relações com mercadores estrangeiros, mas enfrentando descontentamento de nobres do interior.", img: "assets/img/sociedade/npc-rei-halvard-de-valmeira.png" },
  { grupo: "Coroas e nobreza", nome: "Rainha Ismalda de Cárdenas", papel: "Monarca militar, respeitada pela disciplina, mas criticada por gastar recursos excessivos em expedições contra o Bestiário enquanto estradas comerciais seguem inseguras.", img: "assets/img/sociedade/npc-rainha-ismalda-de-cardenas.png" },
  { grupo: "Coroas e nobreza", nome: "Rei Bortan de Ostenfeld", papel: "Mantém relação cautelosa com os clãs anões; o mais dependente de comércio exterior entre os três monarcas.", img: "assets/img/sociedade/npc-rei-bortan-de-ostenfeld.png" },
  { grupo: "Guilda e comércio", nome: "Mestra Oriane", papel: "Líder da guilda de mercadores em Ponte Alta, controla boa parte do fluxo comercial fluvial entre Amieiro, Ponte Alta e Portovale — fonte confiável de missões de escolta e investigação comercial.", img: "assets/img/sociedade/npc-mestra-oriane.png" },
  { grupo: "Guilda e comércio", nome: "Velho Tancredo", papel: "Ferreiro de Ponte Alta, conhecido por dívidas antigas e contatos discretos com contrabandistas — pode ser aliado ou gancho de missão.", img: "assets/img/sociedade/npc-velho-tancredo.png" },
  { grupo: "Academia e magia", nome: "Arquimago Salendir", papel: "Um dos anciãos da Academia de Valédria, guardião de registros sobre Transformação de Linhagem e figura central em missões relacionadas a magia proibida ou alunos desertores.", img: "assets/img/sociedade/npc-arquimago-salendir.png" },
  { grupo: "Encruzilhada", nome: "Conselheira Nyx", papel: "Representante demoníaca no conselho de Encruzilhada, pragmática e cética quanto às intenções dos reinos humanos, mas respeita acordos quando lhe são vantajosos.", img: "assets/img/sociedade/npc-conselheira-nyx.png" },
  { grupo: "Encruzilhada", nome: "Velho Aerith", papel: "Representante élfico no mesmo conselho, atua como voz moderada entre as facções, frequentemente mediando disputas antes que cheguem a conflito aberto.", img: "assets/img/sociedade/npc-velho-aerith.png" },
  { grupo: "Vilões e ameaças", nome: "Capitão Draven", papel: "Líder de uma banda de bandidos que opera nas estradas entre Cárdenas e Feira Nova — antagonista recorrente de nível inicial a intermediário.", img: "assets/img/sociedade/npc-capitao-draven.png" },
  { grupo: "Vilões e ameaças", nome: "A Voz Sem Rosto", papel: "Rumor de um contrabandista misterioso que negocia itens de origem demoníaca em Encruzilhada sem passar pelo conselho — gancho de mistério para arcos avançados.", img: "assets/img/sociedade/npc-a-voz-sem-rosto.png" }
];

window.LEIS_JUSTICA = {
  principios_gerais: "Cada reino humano aplica sua própria lei, mas todos reconhecem três princípios básicos: proibição de magia de Transformação de Linhagem sem autorização da Academia, proibição de comércio com criaturas do Bestiário classificadas como perigosas, e reconhecimento mútuo de dívidas e contratos comerciais entre reinos.",
  por_reino: [
    { reino: "Valmeira", regra: "Pune roubo e contrabando com multas e trabalho forçado temporário nos portos — o reino mais leniente." },
    { reino: "Cárdenas", regra: "Aplica justiça militar rígida, com julgamentos rápidos e punições severas, incluindo exílio para casos graves." },
    { reino: "Ostenfeld", regra: "Sistema misto, influenciado pelos anões, que valoriza reparação de dívida acima de punição corporal; comum que condenados trabalhem nas minas por tempo determinado." }
  ],
  encruzilhada: "Em Encruzilhada, a justiça é aplicada por um conselho multirracial, com código próprio que prioriza a manutenção da neutralidade da cidade. Crimes entre raças diferentes são julgados por um painel misto, e violência armada dentro dos muros é tratada como o crime mais grave possível, podendo resultar em banimento permanente."
};

window.CALENDARIO_HISTORIA = {
  calendario: "Valédria segue um calendário de doze meses, com quatro estações bem definidas, reconhecido pelos três reinos humanos e usado como referência mesmo em Encruzilhada para fins comerciais. Cada estação tem um festival principal: o Festival da Semeadura na primavera, a Feira das Colheitas no verão, a Noite das Fogueiras no outono e a Vigília do Frio no inverno, celebrada com mais intensidade em Ostenfeld e Montegris.",
  marcos: [
    { nome: "A Cisão dos Três Reinos", quando: "Há aproximadamente 200 anos", descricao: "O antigo reino humano unificado se dividiu em Valmeira, Cárdenas e Ostenfeld após disputas de sucessão, criando as fronteiras que existem hoje.", img: "assets/img/sociedade/marco-a-cisao-dos-tres-reinos.png" },
    { nome: "O Tratado de Encruzilhada", quando: "Há cerca de 80 anos", descricao: "Transformou um antigo posto de comércio em cidade livre multirracial, após um período de conflitos fronteiriços entre humanos, elfos e demônios que ameaçava se tornar guerra aberta.", img: "assets/img/sociedade/marco-o-tratado-de-encruzilhada.png" },
    { nome: "A Fundação da Academia", quando: "Há pouco mais de 60 anos", descricao: "Os três reinos concordaram em ceder terreno neutro para centralizar o ensino de magia externa, evitando que o conhecimento arcano ficasse concentrado em apenas um reino.", img: "assets/img/sociedade/marco-a-fundacao-da-academia.png" }
  ],
  img: "assets/img/sociedade/calendario-valedria.png"
};
