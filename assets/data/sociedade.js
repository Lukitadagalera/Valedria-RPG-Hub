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
  img: "assets/img/sociedade/tres-rostos.jpg"
};

window.FACCOES_NPCS = [
  { grupo: "Coroas e nobreza", nome: "Rei Halvard de Valmeira", papel: "Governa Portovale com foco em comércio marítimo, mantendo boas relações com mercadores estrangeiros, mas enfrentando descontentamento de nobres do interior.", img: "assets/img/sociedade/npc-rei-halvard-de-valmeira.jpg" },
  { grupo: "Coroas e nobreza", nome: "Rainha Ismalda de Cárdenas", papel: "Monarca militar, respeitada pela disciplina, mas criticada por gastar recursos excessivos em expedições contra o Bestiário enquanto estradas comerciais seguem inseguras.", img: "assets/img/sociedade/npc-rainha-ismalda-de-cardenas.jpg" },
  { grupo: "Coroas e nobreza", nome: "Rei Bortan de Ostenfeld", papel: "Mantém relação cautelosa com os clãs anões; o mais dependente de comércio exterior entre os três monarcas.", img: "assets/img/sociedade/npc-rei-bortan-de-ostenfeld.jpg" },
  { grupo: "Guilda e comércio", nome: "Mestra Oriane", papel: "Líder da guilda de mercadores em Ponte Alta, controla boa parte do fluxo comercial fluvial entre Amieiro, Ponte Alta e Portovale — fonte confiável de missões de escolta e investigação comercial.", img: "assets/img/sociedade/npc-mestra-oriane.jpg" },
  { grupo: "Guilda e comércio", nome: "Velho Tancredo", papel: "Ferreiro de Ponte Alta, conhecido por dívidas antigas e contatos discretos com contrabandistas — pode ser aliado ou gancho de missão.", img: "assets/img/sociedade/npc-velho-tancredo.jpg" },
  { grupo: "Academia e magia", nome: "Arquimago Salendir", papel: "Um dos anciãos da Academia de Valédria, guardião de registros sobre Transformação de Linhagem e figura central em missões relacionadas a magia proibida ou alunos desertores.", img: "assets/img/sociedade/npc-arquimago-salendir.jpg" },
  { grupo: "Encruzilhada", nome: "Conselheira Nyx", papel: "Representante demoníaca no conselho de Encruzilhada, pragmática e cética quanto às intenções dos reinos humanos, mas respeita acordos quando lhe são vantajosos.", img: "assets/img/sociedade/npc-conselheira-nyx.jpg" },
  { grupo: "Encruzilhada", nome: "Velho Aerith", papel: "Representante élfico no mesmo conselho, atua como voz moderada entre as facções, frequentemente mediando disputas antes que cheguem a conflito aberto.", img: "assets/img/sociedade/npc-velho-aerith.jpg" },
  { grupo: "Vilões e ameaças", nome: "Capitão Draven", papel: "Líder de uma banda de bandidos que opera nas estradas entre Cárdenas e Feira Nova — antagonista recorrente de nível inicial a intermediário.", img: "assets/img/sociedade/npc-capitao-draven.jpg" },
  { grupo: "Vilões e ameaças", nome: "A Voz Sem Rosto", papel: "Rumor de um contrabandista misterioso que negocia itens de origem demoníaca em Encruzilhada sem passar pelo conselho — gancho de mistério para arcos avançados.", img: "assets/img/sociedade/npc-a-voz-sem-rosto.jpg" }
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
    { nome: "A Cisão dos Três Reinos", quando: "Há aproximadamente 200 anos", descricao: "O antigo reino humano unificado se dividiu em Valmeira, Cárdenas e Ostenfeld após disputas de sucessão, criando as fronteiras que existem hoje.", img: "assets/img/sociedade/marco-a-cisao-dos-tres-reinos.jpg" },
    { nome: "O Tratado de Encruzilhada", quando: "Há cerca de 80 anos", descricao: "Transformou um antigo posto de comércio em cidade livre multirracial, após um período de conflitos fronteiriços entre humanos, elfos e demônios que ameaçava se tornar guerra aberta.", img: "assets/img/sociedade/marco-o-tratado-de-encruzilhada.jpg" },
    { nome: "A Fundação da Academia", quando: "Há pouco mais de 60 anos", descricao: "Os três reinos concordaram em ceder terreno neutro para centralizar o ensino de magia externa, evitando que o conhecimento arcano ficasse concentrado em apenas um reino.", img: "assets/img/sociedade/marco-a-fundacao-da-academia.jpg" }
  ],
  img: "assets/img/sociedade/calendario-valedria.jpg"
};
