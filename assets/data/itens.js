/* ============================================================
   ITENS E ARMAS RARAS DE VALÉDRIA — dados
   Mesma escala de graus da Magia Externa e da Aura: Comum,
   Aprendiz, Mago, Arquimago, Imperador, Deus/Lendário. Itens
   Mago dão +1 de atributo (nível 3–5), Arquimago dão +2 com efeito
   recarregável por cena, Imperador dão +3 com condição de uso
   restrita e são objetivo de campanha regional. Itens Deus/Lendário
   nunca dão poder sem custo: cada um tem condição de uso, limite de
   vezes e uma maldição associada.
   ============================================================ */
window.ITENS_REGRAS = {
  comum: "Circula livremente na economia; efeito cosmético ou utilidade menor, sem bônus de atributo",
  aprendiz: "Pequena vantagem situacional (vantagem em um tipo de teste específico), ainda sem bônus fixo de atributo",
  mago: "+1 de atributo fixo; tipicamente encontrado ou comprado entre nível 3 e 5",
  arquimago: "+2 de atributo ou efeito ativo recarregável uma vez por cena",
  imperador: "+3 de atributo com condição de uso restrita; tratado como objetivo de arco ou campanha regional",
  "deus/lendário": "Poder de campanha inteira, sempre com condição de uso, limite de vezes e maldição associada — nunca uma recompensa aleatória"
};

window.ITENS = [
  // ---------------- Comum ----------------
  {
    nome: "Cantil de Viagem Encantado", grau: "Comum", tipo: "Utilidade",
    descricao: "Cantil de couro tratado que mantém líquidos na temperatura de enchimento por um dia inteiro.",
    efeito: "Sem bônus de atributo; conveniência de viagem.",
    origem: "Produzido por artesãos de Ostenfeld e vendido em quase qualquer mercado de estrada.",
    img: "assets/img/itens/cantil-de-viagem-encantado.jpg"
  },
  {
    nome: "Lanterna de Chama Fiel", grau: "Comum", tipo: "Utilidade",
    descricao: "Lanterna cuja chama nunca se apaga com vento comum e consome muito pouco óleo.",
    efeito: "Sem bônus de atributo; ilumina uma área curta indefinidamente enquanto houver uma gota de óleo.",
    origem: "Item padrão de guildas de exploração e caçadores de recompensa.",
    img: "assets/img/itens/lanterna-de-chama-fiel.jpg"
  },
  // ---------------- Aprendiz ----------------
  {
    nome: "Botas de Passo Silencioso", grau: "Aprendiz", tipo: "Vestimenta",
    descricao: "Botas de couro leve tratadas com resina que absorve o som dos passos.",
    efeito: "Vantagem em testes de Furtividade ao se mover em ritmo normal.",
    origem: "Criadas por curtidores da Floresta Eterna, comercializadas via Bosque Alto.",
    img: "assets/img/itens/botas-de-passo-silencioso.jpg"
  },
  {
    nome: "Amuleto do Fôlego Calmo", grau: "Aprendiz", tipo: "Acessório",
    descricao: "Pequeno amuleto de osso polido que ajuda o portador a recuperar o ritmo após esforço físico.",
    efeito: "Vantagem em um teste de recuperação de Fôlego de Aura por cena.",
    origem: "Talhado por veteranos de guilda como presente de iniciação.",
    img: "assets/img/itens/amuleto-do-folego-calmo.jpg"
  },
  // ---------------- Mago ----------------
  {
    nome: "Bracelete do Punho Firme", grau: "Mago", tipo: "Acessório",
    descricao: "Bracelete de bronze gravado com runas simples de reforço muscular.",
    efeito: "+1 de Força fixo enquanto equipado.",
    origem: "Forjado por ferreiros rúnicos de Montegris; comum entre soldados de nível 3 a 5.",
    img: "assets/img/itens/bracelete-do-punho-firme.jpg"
  },
  {
    nome: "Anel do Olhar Atento", grau: "Mago", tipo: "Acessório",
    descricao: "Anel fino de prata com uma pedra que brilha suavemente perto de perigo iminente.",
    efeito: "+1 de Sabedoria fixo enquanto equipado.",
    origem: "Item de origem acadêmica, vendido pela Academia de Valédria a exploradores licenciados.",
    img: "assets/img/itens/anel-do-olhar-atento.jpg"
  },
  {
    nome: "Cinto do Passo Ligeiro", grau: "Mago", tipo: "Vestimenta",
    descricao: "Cinto tecido com fibra élfica que reage ao movimento do portador.",
    efeito: "+1 de Destreza fixo enquanto equipado.",
    origem: "Comercializado por Elfos Costeiros nos portos de comércio ocidentais.",
    img: "assets/img/itens/cinto-do-passo-ligeiro.jpg"
  },
  // ---------------- Arquimago ----------------
  {
    nome: "Escudo do Eco de Pedra", grau: "Arquimago", tipo: "Arma/Escudo",
    descricao: "Escudo maciço adornado com runas dos Clãs anões, capaz de absorver e devolver impacto.",
    efeito: "+2 de Constituição enquanto equipado; uma vez por cena, reflete metade do dano de um golpe físico recebido.",
    origem: "Forjado pelo Clã Ferro-Fundo como presente diplomático a aliados humanos.",
    img: "assets/img/itens/escudo-do-eco-de-pedra.jpg"
  },
  {
    nome: "Cajado de Vidro Nebuloso", grau: "Arquimago", tipo: "Arma",
    descricao: "Cajado feito de um vidro vulcânico raro que retém névoa mágica em seu interior.",
    efeito: "+2 de Sabedoria enquanto equipado; uma vez por cena, reduz o custo de Mana da próxima magia lançada pela metade.",
    origem: "Criado por um arquimago independente da Academia de Valédria, hoje raro e cobiçado.",
    img: "assets/img/itens/cajado-de-vidro-nebuloso.jpg"
  },
  // ---------------- Imperador ----------------
  {
    nome: "Coroa do Julgamento Silencioso", grau: "Imperador", tipo: "Acessório",
    descricao: "Diadema antigo associado a um governante esquecido, dizem que ainda escuta juramentos quebrados.",
    efeito: "+3 de Carisma enquanto equipado; uma vez por sessão, força um teste de vontade em um interlocutor antes de uma negociação decisiva. Condição: só funciona plenamente para quem nunca quebrou um juramento formal.",
    origem: "Objetivo de um arco de campanha regional; seu paradeiro atual é motivo de disputa entre facções.",
    img: "assets/img/itens/coroa-do-julgamento-silencioso.jpg"
  },
  {
    nome: "Lâmina do Sangue Rúnico", grau: "Imperador", tipo: "Arma",
    descricao: "Espada longa cravejada de runas de sangue antigo, que pulsa quando próxima de ameaças regionais.",
    efeito: "+3 de Força enquanto equipada; inflige dano adicional equivalente a uma magia de grau Arquimago contra criaturas de ameaça Alta ou superior, uma vez por cena. Condição: exige que o portador tenha derramado seu próprio sangue para despertá-la a cada nova lua.",
    origem: "Recuperada de uma tumba selada nas Terras Demoníacas; centro de disputa entre caçadores de artefatos.",
    img: "assets/img/itens/lamina-do-sangue-runico.jpg"
  },
  // ---------------- Deus / Lendário ----------------
  {
    nome: "Lâmina Sem Nome", grau: "Deus/Lendário", tipo: "Arma",
    descricao: "Espada sem inscrições, sem brilho e sem peso perceptível — ninguém sabe quem a forjou nem por quê.",
    efeito: "Inflige dano equivalente a magia de grau Imperador em um único golpe, ignorando qualquer Defesa. Limite: apenas uma vez por campanha inteira.",
    condicao_de_uso: "Só pode ser desembainhada por alguém que tenha perdido algo insubstituível.",
    maldicao: "Cada uso apaga uma memória importante e aleatória do portador, escolhida pelo Mestre.",
    origem: "Não possui criador conhecido; aparece na história de Valédria em momentos de virada decisiva.",
    img: "assets/img/itens/lamina-sem-nome.jpg"
  },
  {
    nome: "Cajado das Marés Eternas", grau: "Deus/Lendário", tipo: "Arma",
    descricao: "Cajado de coral vivo que nunca seca, pulsando no ritmo de marés distantes.",
    efeito: "Permite lançar uma magia de grau Deus da Escola de Água sem ritual coletivo. Limite: uma vez por campanha.",
    condicao_de_uso: "Só funciona a menos de um dia de viagem de um corpo de água natural.",
    maldicao: "Drena permanentemente 20% da Mana máxima do usuário após o uso, sem recuperação natural.",
    origem: "Forjado por uma Náiade da Fonte Antiga em troca de um favor jamais revelado.",
    img: "assets/img/itens/cajado-das-mares-eternas.jpg"
  },
  {
    nome: "Anel do Rei Esquecido", grau: "Deus/Lendário", tipo: "Acessório",
    descricao: "Anel de ouro escurecido, gravado com um brasão que nenhum arquivo real reconhece mais.",
    efeito: "Concede autoridade absoluta reconhecida por qualquer súdito ou funcionário do reino por uma cena inteira, sem necessidade de teste social. Limite: três vezes ao longo de toda a campanha.",
    condicao_de_uso: "Só pode ser usado dentro de território que já foi, em algum momento da história, parte de um reino humano.",
    maldicao: "Desaparece do dedo do usuário e reaparece em outro lugar do mundo após 100 dias, escolhendo sempre um novo portador.",
    origem: "Ligado a uma linhagem real extinta há gerações; sua posse já motivou guerras de sucessão silenciosas.",
    img: "assets/img/itens/anel-do-rei-esquecido.jpg"
  },
  {
    nome: "Armadura do Último Guardião", grau: "Deus/Lendário", tipo: "Vestimenta",
    descricao: "Armadura completa de placas escurecidas, sempre fria ao toque, como se ainda vigiasse algo que já foi destruído.",
    efeito: "Concede Defesa equivalente a uma magia de Domo Protetor permanente e imunidade a uma condição debilitante à escolha do jogador. Limite: o efeito de imunidade só pode ser trocado uma vez por campanha.",
    condicao_de_uso: "Só pode ser vestida por alguém que tenha jurado proteger outra pessoa específica, e o juramento deve ser conhecido pelo Mestre.",
    maldicao: "Se a pessoa protegida morrer enquanto o juramento estiver ativo, a armadura se funde à pele do usuário e não pode mais ser removida.",
    origem: "Pertenceu a um guardião de um santuário destruído durante um cataclismo mágico esquecido pela história oficial.",
    img: "assets/img/itens/armadura-do-ultimo-guardiao.jpg"
  },
  {
    nome: "Flauta da Fênix Adormecida", grau: "Deus/Lendário", tipo: "Instrumento/Arma",
    descricao: "Flauta de osso leve e quente, decorada com penas que nunca esfriam e nunca murcham.",
    efeito: "Invoca uma réplica temporária de uma Fênix Carmesim para lutar ao lado do grupo por três rodadas, ou cura completamente um aliado à beira da morte. Limite: uma vez por campanha, o efeito escolhido é definitivo para aquele uso.",
    condicao_de_uso: "Só pode ser tocada em um momento de desespero genuíno, avaliado pelo Mestre — nunca como parte de um plano calculado.",
    maldicao: "Ao final do efeito, uma explosão residual de calor causa dano ao próprio usuário, equivalente a uma magia de Mago da Escola de Fogo.",
    origem: "Associada às lendas da Fênix Carmesim; nenhum registro confirma quem a esculpiu primeiro.",
    img: "assets/img/itens/flauta-da-fenix-adormecida.jpg"
  }
];
