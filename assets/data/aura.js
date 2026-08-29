/* ============================================================
   ESCOLAS DE AURA — dados
   Sistema marcial paralelo à Magia Externa: em vez de Mana, o
   guerreiro consome Fôlego de Aura (3 a 8 pontos por cena,
   recuperado com breve descanso). O aumento de atributo não vem
   do uso repetido da técnica, e sim do reconhecimento de grau:
   cada grau (Aprendiz, Guerreiro, Mestre, Grande Mestre, Imperador,
   Deus) libera exatamente +1 de atributo, somando no máximo +6 ao
   longo de toda a vida de um Caminho. Existem 4 Caminhos: Força,
   Velocidade, Morte e Técnica — alguns dividem o bônus entre dois
   ou três atributos em vez de concentrá-lo em um só.
   ============================================================ */
window.AURA_REGRAS = {
  folego_por_cena: "3 a 8 pontos, dependendo do grau marcial",
  recuperacao: "Um breve descanso restaura o Fôlego de Aura entre cenas",
  atributo_por_grau: "+1 de atributo por grau alcançado, nunca por uso repetido da técnica",
  teto_por_caminho: "+6 no total, ao longo de toda a vida de um Caminho",
  graus: ["Aprendiz", "Guerreiro", "Mestre", "Grande Mestre", "Imperador", "Deus"]
};

window.AURA_CAMINHOS = [
  {
    nome: "Caminho da Força", foco: "Poder físico bruto e impacto", atributos_bonus: ["Força"],
    distribuicao: "+1 de Força a cada grau, até +6 de Força no total",
    img: "assets/img/aura/caminho-da-forca.jpg",
    tecnicas: [
      { grau: "Aprendiz", nome: "Punho Firme", folego: 3, efeito: "Um golpe físico ganha +2 de dano e ignora parte da armadura leve do alvo." },
      { grau: "Guerreiro", nome: "Impacto Assentado", folego: 4, efeito: "Um ataque corpo a corpo com acerto derruba o alvo se ele falhar em teste de Constituição dificuldade 13." },
      { grau: "Mestre", nome: "Golpe Rachador", folego: 5, efeito: "Ataque único que causa dano dobrado contra objetos, estruturas e escudos, além do dano normal contra criaturas." },
      { grau: "Grande Mestre", nome: "Fúria Sustentada", folego: 8, efeito: "Por 2 rodadas, todos os ataques corpo a corpo do usuário recebem +3 de dano; ao fim, o usuário sofre 1 rodada de desvantagem por exaustão." },
      { grau: "Imperador", nome: "Punho que Quebra o Solo", folego: "Reservado, 1x por cena", efeito: "Golpe em área curta que causa dano equivalente a magia de grau Arquimago e derruba estruturas leves ao redor do ponto de impacto." },
      { grau: "Deus", nome: "O Golpe Inevitável", folego: "Ritual marcial, uso único por campanha", efeito: "Um único golpe capaz de romper defesas consideradas indestrutíveis ou encerrar um confronto regional. Restrito ao grau máximo do Caminho, narrado como marco de campanha." }
    ]
  },
  {
    nome: "Caminho da Velocidade", foco: "Reflexo, mobilidade e precisão", atributos_bonus: ["Destreza"],
    distribuicao: "+1 de Destreza a cada grau, até +6 de Destreza no total",
    img: "assets/img/aura/caminho-da-velocidade.jpg",
    tecnicas: [
      { grau: "Aprendiz", nome: "Passo Rápido", folego: 3, efeito: "Concede um deslocamento extra sem gastar ação, útil para reposicionamento ou fuga curta." },
      { grau: "Guerreiro", nome: "Corte Duplo", folego: 4, efeito: "Permite dois ataques leves em sequência contra o mesmo alvo ou alvos adjacentes, cada um com o dano normal da arma." },
      { grau: "Mestre", nome: "Sombra em Movimento", folego: 5, efeito: "Por 1 rodada, o usuário se torna extremamente difícil de acertar, concedendo +3 na Defesa contra ataques físicos." },
      { grau: "Grande Mestre", nome: "Dança das Lâminas", folego: 8, efeito: "Ataca todos os inimigos adjacentes em sequência fluida num único turno, cada acerto com dano normal da arma." },
      { grau: "Imperador", nome: "Instante Perdido", folego: "Reservado, 1x por cena", efeito: "O usuário age antes de qualquer outra criatura na cena por uma rodada inteira, podendo reposicionar-se e atacar múltiplas vezes." },
      { grau: "Deus", nome: "O Piscar que Não Existiu", folego: "Ritual marcial, uso único por campanha", efeito: "O usuário se move entre múltiplos pontos de um campo de batalha regional em um único instante, alterando o resultado de um confronto inteiro. Restrito ao grau máximo do Caminho." }
    ]
  },
  {
    nome: "Caminho da Morte", foco: "Resistência letal e golpes decisivos", atributos_bonus: ["Força", "Constituição"],
    distribuicao: "+1 alternando entre Força e Constituição a cada grau, até +3 em cada atributo (+6 no total)",
    img: "assets/img/aura/caminho-da-morte.jpg",
    tecnicas: [
      { grau: "Aprendiz", nome: "Golpe Certeiro", folego: 3, efeito: "Ataque que ignora resistências de criaturas de baixa ameaça, garantindo dano completo mesmo contra couraças leves." },
      { grau: "Guerreiro", nome: "Peso da Lâmina", folego: 4, efeito: "Um ataque com acerto causa sangramento: 1d4 de dano adicional na rodada seguinte." },
      { grau: "Mestre", nome: "Marca da Ceifa", folego: 5, efeito: "Escolhe um alvo; todos os ataques do usuário contra ele recebem vantagem até o fim da cena." },
      { grau: "Grande Mestre", nome: "Golpe Final", folego: 8, efeito: "Contra um alvo já ferido (menos da metade da Vida máxima), o dano do próximo ataque é maximizado em vez de rolado." },
      { grau: "Imperador", nome: "A Sombra que Não Perdoa", folego: "Reservado, 1x por cena", efeito: "Um único ataque capaz de derrubar um monstro de ameaça Alta em poucos golpes quando combinado com dano físico do grupo, nunca em um golpe garantido isolado." },
      { grau: "Deus", nome: "O Fim Que Se Escolhe", folego: "Ritual marcial, uso único por campanha", efeito: "O usuário decide o destino de um único confronto decisivo de campanha, sempre com um custo pessoal equivalente à magnitude do golpe. Restrito ao grau máximo do Caminho." }
    ]
  },
  {
    nome: "Caminho da Técnica", foco: "Estratégia, liderança e domínio de armas", atributos_bonus: ["Destreza", "Sabedoria", "Carisma"],
    distribuicao: "+1 rotativo entre Destreza, Sabedoria e Carisma a cada grau, até +2 em cada atributo (+6 no total)",
    img: "assets/img/aura/caminho-da-tecnica.jpg",
    tecnicas: [
      { grau: "Aprendiz", nome: "Leitura de Combate", folego: 3, efeito: "Revela a próxima ação pretendida de um inimigo antes que ela ocorra, concedendo vantagem para reagir a ela." },
      { grau: "Guerreiro", nome: "Manobra Ensaiada", folego: 4, efeito: "Concede vantagem no próximo ataque de um aliado próximo que siga a instrução do usuário." },
      { grau: "Mestre", nome: "Domínio de Arma", folego: 5, efeito: "Troca de arma ou postura sem gastar ação, adaptando-se instantaneamente ao terreno ou ao inimigo." },
      { grau: "Grande Mestre", nome: "Comando de Batalha", folego: 8, efeito: "Concede vantagem na próxima ação a todos os aliados dentro de alcance curto por uma rodada." },
      { grau: "Imperador", nome: "O Tabuleiro Perfeito", folego: "Reservado, 1x por cena", efeito: "Reorganiza posições de até quatro aliados no campo de batalha instantaneamente, sem provocar ataques de oportunidade." },
      { grau: "Deus", nome: "A Estratégia que Vence Antes da Luta", folego: "Ritual marcial, uso único por campanha", efeito: "Determina de forma narrativa a vantagem decisiva de um confronto regional inteiro antes mesmo do primeiro golpe. Restrito ao grau máximo do Caminho." }
    ]
  }
];
