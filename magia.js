/* ============================================================
   GRIMÓRIO DE VALÉDRIA — dados de magia
   Estrutura: window.GRIMORIO = [ { escola, magias: [ {grau,...} ] } ]
   Grau segue sempre: Aprendiz, Mago, Arquimago, Imperador, Deus.
   ============================================================ */
window.MANA_PROGRESSAO = [
  { potencial: "Estagnada", resultado: "1", crescimento: "0%", n1: 50, n5: 50, n10: 50 },
  { potencial: "Comum", resultado: "2–10", crescimento: "10%", n1: 50, n5: 73, n10: 118 },
  { potencial: "Elevado", resultado: "11–19", crescimento: "20%", n1: 50, n5: 104, n10: 258 },
  { potencial: "Superior", resultado: "variante alta de Elevado", crescimento: "50%", n1: 50, n5: 253, n10: 1922 },
  { potencial: "Anomalia de Mana", resultado: "20", crescimento: "100%", n1: 50, n5: 800, n10: 25600 }
];

window.MANA_ACESSO_GRAU = [
  { grau: "Aprendiz", acesso: "Qualquer conjurador, incluindo Mana Estagnada" },
  { grau: "Mago", acesso: "Potencial Comum, Elevado, Superior ou Anomalia" },
  { grau: "Arquimago", acesso: "Potencial Elevado, Superior ou Anomalia" },
  { grau: "Imperador", acesso: "Apenas Anomalia de Mana, tipicamente nível 8 ou superior" },
  { grau: "Deus", acesso: "Apenas Anomalia de Mana, exclusivamente no nível 10, uma única vez por situação extraordinária" }
];

window.MANA_CUSTO_DANO = [
  { grau: "Aprendiz", custo: "4 a 10", dano: "1d4 a 1d6 + pequeno bônus", papel: "Utilidade, dano leve, suporte" },
  { grau: "Mago", custo: "12 a 22", dano: "1d8 a 2d6 + bônus moderado", papel: "Dano confiável, controle básico" },
  { grau: "Arquimago", custo: "25 a 40", dano: "2d8 a 3d8 + bônus alto", papel: "Dano de área, efeitos duradouros" },
  { grau: "Imperador", custo: "45 a 70", dano: "3d10 a 4d10 + bônus alto", papel: "Alterações de campo de batalha, regionais" },
  { grau: "Deus", custo: "Variável, geralmente ritual coletivo", dano: "6d12 a 10d12, efeito narrativo massivo", papel: "Evento único de campanha, não repetível em cena" }
];

window.GRIMORIO = [
  {
    escola: "Água", img: "assets/img/magia/escola-agua.jpg",
    magias: [
      { grau: "Aprendiz", nome: "Chuva Purificadora", custo: "4 Mana", alcance: "curto", efeito: "Cria ou purifica até um litro de água; limpa ferimentos leves e remove sujeira ou venenos de contato leves." },
      { grau: "Aprendiz", nome: "Névoa Refrescante", custo: "5 Mana", alcance: "área pequena", efeito: "Cria névoa em área pequena por uma cena; dá vantagem em Furtividade dentro dela e reduz efeitos de calor." },
      { grau: "Aprendiz", nome: "Corrente Guiada", custo: "7 Mana", alcance: "curto", efeito: "Move água ou líquido; pode apagar fogo pequeno, mover objeto flutuante ou derrubar alvo em piso molhado." },
      { grau: "Mago", nome: "Lança de Água", custo: "14 Mana", alcance: "curto", efeito: "1d20 Destreza contra Defesa; dano 1d8+2 e o alvo pode ser empurrado 2 metros se falhar em teste de Força dificuldade 13." },
      { grau: "Mago", nome: "Corrente Devoradora", custo: "18 Mana", alcance: "curto, linha", efeito: "1d20 Sabedoria contra Defesa de todos na linha; dano 1d6+1 e desvantagem no próximo teste de equilíbrio." },
      { grau: "Arquimago", nome: "Maré Selante", custo: "30 Mana", alcance: "médio, área", efeito: "Cria uma onda que causa 2d8+3 de dano a todos em área moderada e pode empurrar alvos leves para fora do combate; falha de Força dificuldade 16 derruba." },
      { grau: "Arquimago", nome: "Prisão Líquida", custo: "34 Mana", alcance: "curto", efeito: "Envolve um alvo em água pressurizada, causando 2d6+2 de dano por rodada e imobilizando-o até um teste de Força dificuldade 17 ser vencido, por até 3 rodadas." },
      { grau: "Imperador", nome: "Colapso das Marés", custo: "55 Mana", alcance: "regional", efeito: "Inunda uma área ampla, causando 3d10+4 de dano a todos os inimigos na zona e criando terreno difícil por uma cena inteira." },
      { grau: "Deus", nome: "O Dilúvio Esquecido", custo: "Ritual, geralmente acima de 150 Mana ou apoio de outros conjuradores", alcance: "regional a continental", efeito: "Transforma temporariamente o clima e o relevo de uma região inteira — inundações, gelo ou tempestades duradouras. Uso restrito ao nível 10, apenas uma vez por situação extraordinária, sempre narrado como marco de campanha, nunca como dano direto repetível." }
    ]
  },
  {
    escola: "Terra", img: "assets/img/magia/escola-terra.jpg",
    magias: [
      { grau: "Aprendiz", nome: "Firmeza da Pedra", custo: "5 Mana", alcance: "toque", efeito: "Repara fissuras pequenas ou reforça porta, ponte curta ou parede simples contra dano leve." },
      { grau: "Aprendiz", nome: "Mão de Barro", custo: "6 Mana", alcance: "curto", efeito: "Molda argila ou terra em ferramenta, selo, barreira pequena ou objeto simples de uso único." },
      { grau: "Aprendiz", nome: "Passo Firme", custo: "4 Mana", alcance: "pessoal", efeito: "Dá vantagem em Destreza ou Atletismo para equilíbrio, escalada leve e terreno irregular durante uma cena." },
      { grau: "Mago", nome: "Punho de Pedra", custo: "15 Mana", alcance: "toque", efeito: "1d20 Força contra Defesa; dano 1d10+2 e reduz a Defesa do alvo em 1 até o fim da próxima rodada." },
      { grau: "Mago", nome: "Armadilha de Raízes", custo: "13 Mana", alcance: "curto", efeito: "Força um teste de Destreza dificuldade 14; falha causa 1d6+1 de dano e imobiliza o alvo por 1 rodada." },
      { grau: "Arquimago", nome: "Avalanche Contida", custo: "32 Mana", alcance: "médio, área", efeito: "2d10+3 de dano a todos em área moderada, com falha de Constituição dificuldade 16 derrubando o alvo e cobrindo-o com detritos, causando desvantagem na próxima ação." },
      { grau: "Arquimago", nome: "Muro Vivo", custo: "28 Mana", alcance: "curto", efeito: "Cria uma parede de pedra e raízes com 30 pontos de resistência estrutural, bloqueando passagem por até uma cena." },
      { grau: "Imperador", nome: "Terremoto Dirigido", custo: "60 Mana", alcance: "regional", efeito: "3d10+5 de dano a todos em uma área ampla, derruba estruturas leves e força teste de Constituição dificuldade 18 contra queda." },
      { grau: "Deus", nome: "A Fenda do Mundo", custo: "Ritual", alcance: "regional a continental", efeito: "Abre ou fecha permanentemente um desfiladeiro, caverna ou falha geológica. Apenas no nível 10, uma vez, como consequência de campanha, não como magia de combate repetível." }
    ]
  },
  {
    escola: "Fogo", img: "assets/img/magia/escola-fogo.jpg",
    magias: [
      { grau: "Aprendiz", nome: "Chama Pequena", custo: "4 Mana", alcance: "curto", efeito: "Produz uma chama controlada; ilumina, acende fogo e pode causar 1d4 de dano a curta distância." },
      { grau: "Aprendiz", nome: "Brasa Viajante", custo: "6 Mana", alcance: "pessoal", efeito: "Mantém uma brasa utilizável por um dia, mesmo com vento ou umidade leve." },
      { grau: "Aprendiz", nome: "Explosão Contida", custo: "9 Mana", alcance: "curto, área", efeito: "Ataque em área curta: 1d20+Sabedoria contra Defesa; causa 1d6 no acerto." },
      { grau: "Mago", nome: "Lança Ígnea", custo: "16 Mana", alcance: "médio", efeito: "1d20 Sabedoria contra Defesa; dano 1d10+2 de fogo, ignorando metade de qualquer resistência a frio." },
      { grau: "Mago", nome: "Círculo de Brasas", custo: "20 Mana", alcance: "curto, área", efeito: "1d20 Sabedoria contra Defesa de todos na área; dano 1d8+1 de fogo e queimadura contínua de 1d4 na rodada seguinte se falharem." },
      { grau: "Arquimago", nome: "Tempestade de Cinzas", custo: "36 Mana", alcance: "médio, área grande", efeito: "2d10+3 de dano de fogo em área ampla, reduz visibilidade, concedendo vantagem a ataques furtivos do conjurador por uma rodada." },
      { grau: "Arquimago", nome: "Núcleo Incandescente", custo: "38 Mana", alcance: "toque", efeito: "Implanta uma brasa mágica em um objeto ou estrutura, detonando após 1 rodada com 3d8+3 de dano em área curta." },
      { grau: "Imperador", nome: "Erupção Convocada", custo: "65 Mana", alcance: "regional", efeito: "4d10+4 de dano de fogo a todos em área regional, cria terreno de lava temporário e ilumina a região por horas." },
      { grau: "Deus", nome: "O Incêndio Primordial", custo: "Ritual", alcance: "regional a continental", efeito: "Desperta fogo antigo capaz de reformar paisagens ou destruir uma fortaleza inteira. Restrito ao nível 10, uso único, sempre como virada de campanha." }
    ]
  },
  {
    escola: "Ar", img: "assets/img/magia/escola-ar.jpg",
    magias: [
      { grau: "Aprendiz", nome: "Sopro Direcionado", custo: "4 Mana", alcance: "curto", efeito: "Rajada curta que apaga chamas, move objetos leves ou desequilibra um alvo." },
      { grau: "Aprendiz", nome: "Passo Leve", custo: "5 Mana", alcance: "pessoal", efeito: "Reduz o peso do conjurador por uma cena, concedendo vantagem em saltos, quedas curtas e deslocamento silencioso sobre superfícies instáveis." },
      { grau: "Aprendiz", nome: "Eco Distante", custo: "6 Mana", alcance: "longo", efeito: "Projeta a própria voz até um ponto visível distante, ou capta sons próximos a esse ponto por alguns instantes — útil para sinais e reconhecimento." },
      { grau: "Mago", nome: "Lâmina de Vento", custo: "14 Mana", alcance: "curto, linha", efeito: "1d20 Destreza contra Defesa de todos na linha; dano 1d8+2 cortante." },
      { grau: "Mago", nome: "Redemoinho de Contenção", custo: "18 Mana", alcance: "curto", efeito: "Cria uma coluna de vento que impõe desvantagem em ataques à distância contra o conjurador e aliados próximos por 2 rodadas." },
      { grau: "Arquimago", nome: "Tempestade Cortante", custo: "33 Mana", alcance: "médio, área", efeito: "2d8+3 de dano cortante em área moderada, com chance de desarmar alvos que falharem em teste de Força dificuldade 16." },
      { grau: "Arquimago", nome: "Voo Emprestado", custo: "30 Mana", alcance: "pessoal ou toque", efeito: "Concede voo controlado a si ou a um aliado por uma cena inteira, essencial para alcançar terrenos elevados sem combate direto." },
      { grau: "Imperador", nome: "Vendaval Territorial", custo: "58 Mana", alcance: "regional", efeito: "3d10+4 de dano em área regional, empurra todos os alvos leves e derruba estruturas frágeis." },
      { grau: "Deus", nome: "O Grito que Rompe o Céu", custo: "Ritual", alcance: "regional a continental", efeito: "Onda de choque sônica (derivada de Trovão) capaz de destruir muralhas, dispersar exércitos inteiros ou silenciar magia numa região por horas. Uso único no nível 10." }
    ]
  },
  {
    escola: "Espacial", img: "assets/img/magia/escola-espacial.jpg",
    magias: [
      { grau: "Aprendiz", nome: "Marca de Retorno", custo: "6 Mana", alcance: "toque", efeito: "Fixa um ponto de referência mágica por um dia; o conjurador sente a direção e distância aproximada até ele." },
      { grau: "Aprendiz", nome: "Empurrão Curto", custo: "5 Mana", alcance: "curto", efeito: "Desloca um objeto pequeno ou alvo leve até 2 metros sem causar dano — útil para desarmar armadilhas simples ou reposicionar objetos." },
      { grau: "Aprendiz", nome: "Sentir Distorção", custo: "5 Mana", alcance: "curto", efeito: "Revela a presença de portais, selos espaciais ou magia de deslocamento próxima, sem indicar exatamente sua natureza." },
      { grau: "Mago", nome: "Salto Curto", custo: "15 Mana", alcance: "pessoal", efeito: "Teleporta o conjurador até 10 metros, ignorando obstáculos rasos; não causa dano, mas pode evitar um ataque completamente se usado como reação." },
      { grau: "Mago", nome: "Distorção Dolorosa", custo: "17 Mana", alcance: "curto", efeito: "1d20 Sabedoria contra Defesa; dano 1d8+2 e o alvo é deslocado 3 metros em direção aleatória." },
      { grau: "Arquimago", nome: "Fenda Instável", custo: "35 Mana", alcance: "médio", efeito: "Abre uma fenda espacial que causa 2d8+3 de dano e pode sugar um alvo pequeno para uma bolsa de espaço curta, retendo-o por 1 rodada." },
      { grau: "Arquimago", nome: "Passagem Compartilhada", custo: "32 Mana", alcance: "curto", efeito: "Teleporta o conjurador e até três aliados para um local visível dentro do alcance médio, ideal para fugas ou flanqueios táticos." },
      { grau: "Imperador", nome: "Colapso Gravitacional", custo: "62 Mana", alcance: "regional", efeito: "3d10+5 de dano em área regional (derivada de Gravidade) e impõe velocidade reduzida à metade a todos os sobreviventes por uma cena." },
      { grau: "Deus", nome: "A Passagem Impossível", custo: "Ritual", alcance: "continental", efeito: "Teleporta um grupo inteiro, um exército pequeno ou reorganiza fisicamente uma região através de portais instáveis (derivada de Teleporte). Uso único, exclusivo do nível 10, jamais espontâneo em combate comum." }
    ]
  },
  {
    escola: "Barreiras", img: "assets/img/magia/escola-barreiras.jpg",
    magias: [
      { grau: "Aprendiz", nome: "Escudo Breve", custo: "5 Mana", alcance: "pessoal ou toque", efeito: "Concede +2 na Defesa do alvo por 1 rodada." },
      { grau: "Aprendiz", nome: "Selo Simples", custo: "6 Mana", alcance: "toque", efeito: "Sela uma porta ou baú pequeno contra abertura casual; qualquer teste de Força ou Destreza para forçá-lo recebe desvantagem." },
      { grau: "Aprendiz", nome: "Círculo de Aviso", custo: "5 Mana", alcance: "curto", efeito: "Marca uma área pequena que emite um sinal silencioso (visual ou sonoro sutil) ao conjurador quando cruzada por uma cena." },
      { grau: "Mago", nome: "Escudo Repelente", custo: "16 Mana", alcance: "pessoal ou toque", efeito: "Concede +4 na Defesa por 2 rodadas e reflete metade do dano de um ataque físico recebido de volta ao atacante." },
      { grau: "Mago", nome: "Selo de Contenção", custo: "14 Mana", alcance: "curto", efeito: "Aprisiona um alvo pequeno ou médio dentro de uma barreira translúcida por 1 rodada, exigindo teste de Força dificuldade 15 para escapar." },
      { grau: "Arquimago", nome: "Domo Protetor", custo: "34 Mana", alcance: "curto, área", efeito: "Cria uma cúpula que concede +3 na Defesa a todos os aliados dentro por 3 rodadas e bloqueia magia de área vinda de fora." },
      { grau: "Arquimago", nome: "Selo Absoluto", custo: "30 Mana", alcance: "toque", efeito: "Sela permanentemente uma porta, baú ou passagem até ser destruído por magia de nível equivalente ou superior." },
      { grau: "Imperador", nome: "Muralha do Reino", custo: "50 Mana", alcance: "regional", efeito: "Cria uma barreira contínua ao longo de uma extensão regional, capaz de deter exércitos pequenos ou monstros de ameaça alta por horas." },
      { grau: "Deus", nome: "A Redoma Eterna", custo: "Ritual", alcance: "regional a continental", efeito: "Isola completamente uma região do mundo exterior por um período prolongado, impedindo entrada ou saída de qualquer criatura. Uso único, apenas no nível 10, como marco definitivo de campanha." }
    ]
  },
  {
    escola: "Cura", img: "assets/img/magia/escola-cura.jpg",
    magias: [
      { grau: "Aprendiz", nome: "Fechar Ferida", custo: "5 Mana", alcance: "toque", efeito: "Restaura 1d6+1 de Vida a um único alvo." },
      { grau: "Aprendiz", nome: "Alívio da Dor", custo: "4 Mana", alcance: "toque", efeito: "Remove dor e desconforto leve por uma cena, concedendo vantagem em um teste afetado por ferimento leve." },
      { grau: "Aprendiz", nome: "Toque Purificador", custo: "6 Mana", alcance: "toque", efeito: "Neutraliza veneno leve ou infecção inicial em um único alvo, restaurando 1d6+1 de Vida adicional se aplicável." },
      { grau: "Mago", nome: "Restauração Guiada", custo: "16 Mana", alcance: "toque", efeito: "Restaura 2d6+3 de Vida a um único alvo, uma vez por cena por alvo." },
      { grau: "Mago", nome: "Vínculo de Alívio", custo: "20 Mana", alcance: "curto, área", efeito: "Restaura 1d6+2 de Vida a até três aliados próximos simultaneamente." },
      { grau: "Arquimago", nome: "Renascer Parcial", custo: "36 Mana", alcance: "toque", efeito: "Restaura 3d8+4 de Vida e remove uma condição debilitante (veneno, medo ou exaustão) de um único alvo." },
      { grau: "Arquimago", nome: "Círculo de Vida", custo: "32 Mana", alcance: "curto, área", efeito: "Restaura 2d8+3 de Vida a todos os aliados dentro de uma área moderada, uma vez por cena." },
      { grau: "Imperador", nome: "Intervenção Sagrada", custo: "55 Mana", alcance: "regional", efeito: "Restaura completamente a Vida de até três aliados e remove todas as condições debilitantes (derivada de Magia Divina); pode ser usada apenas uma vez por sessão de jogo." },
      { grau: "Deus", nome: "O Milagre Final", custo: "Ritual", alcance: "pessoal a regional", efeito: "Pode reverter uma morte muito recente, curar uma praga regional ou restaurar algo considerado permanentemente perdido. Restrito ao nível 10, uso único por campanha, sempre com um custo narrativo equivalente ao milagre concedido." }
    ]
  }
];
