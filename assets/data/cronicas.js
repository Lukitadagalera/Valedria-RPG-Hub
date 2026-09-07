/* ============================================================
   CRÔNICAS DE VALÉDRIA
   Aventuras e campanhas prontas separadas do Livro do Mestre.
   ============================================================ */

window.CRONICAS_SENHA = "salvador";

window.CRONICAS_VALEDRIA = [
  {
    id: "sombras-sobre-amieiro",
    titulo: "Crônica I — Sombras sobre Amieiro",
    subtitulo: "O Salvador",
    status: "Campanha em desenvolvimento",
    niveis: "Arco humano sugerido: níveis 1 a 10",
    foco: "Mistério, conspiração, escolhas morais e expansão gradual do mundo",
    sinopse_publica: "Uma campanha que começa em Amieiro com sinais de um ataque organizado e pode crescer até revelar forças muito maiores atuando por trás dos reinos. A crônica foi estruturada para servir como módulo adaptável: o Mestre pode remover, trocar ou reorganizar qualquer elemento sem alterar o restante de Valédria.",
    premissa_mestre: "Ataques e desaparecimentos de jovens com anomalias de mana formam a primeira pista de uma conspiração conduzida por agentes que acreditam estar protegendo Valédria de uma ameaça maior. O antagonismo central não é apenas quem está errado, mas quanto sacrifício alguém aceita impor aos outros em nome de um bem supostamente maior.",
    principios: [
      "Nenhuma revelação precisa acontecer em uma cena específica.",
      "Toda pista importante deve ter mais de uma fonte possível.",
      "NPCs de Amieiro existem independentemente da conspiração e não precisam ser culpados para a história funcionar.",
      "O Rei, o Ministro, a filha do Rei e O Salvador podem ser adaptados a qualquer reino humano escolhido pelo Mestre.",
      "A crônica pode terminar no arco humano ou continuar para arcos élficos, anões, demoníacos e Seraphins."
    ],
    camadas: [
      {
        titulo: "Camada 1 — Suspeitas iniciais",
        blocos: [
          { subtitulo: "O ataque a Amieiro", texto: "Uma possibilidade de abertura é tratar o ataque à vila como ação dirigida, não aleatória. Mercenários ou agentes teriam recebido ordens para capturar jovens que passaram recentemente pelo rito de maioridade. Relatórios secretos apontariam uma concentração incomum de anomalias de mana na região." },
          { subtitulo: "A rede de observação", texto: "O Mestre pode introduzir uma rede de vigias que registra jovens com potencial mágico. Os observadores não precisam saber o verdadeiro objetivo da operação; alguns podem acreditar que participam de um programa de proteção, recrutamento ou estudo." },
          { subtitulo: "O que os jogadores devem perceber", texto: "Os inimigos procuram pessoas específicas, existem registros ou padrões e outros casos semelhantes podem ter ocorrido fora de Amieiro. O motivo exato ainda não precisa ser conhecido." }
        ]
      },
      {
        titulo: "Camada 2 — A conspiração humana",
        blocos: [
          { subtitulo: "O propósito dos sequestros", texto: "Valédria seria protegida por uma barreira antiga que está enfraquecendo. Pessoas com anomalias de mana seriam usadas como fontes de energia para reforçar pontos frágeis. O procedimento não é consentido e pode ser fatal, criando o conflito moral central do arco." },
          { subtitulo: "O Ministro", texto: "O Ministro conhece o custo do projeto e o aceita conscientemente. Ele não precisa agir por ganância: funciona melhor se acreditar de verdade que salvar o mundo justifica o que faz. Coordena agentes, silencia investigações e filtra informações que chegam à Coroa." },
          { subtitulo: "O Rei", texto: "O Rei pode ser mantido como figura isolada e parcialmente manipulada. Ele acredita estar governando, mas recebe informações selecionadas. Uma audiência pode revelar contradições sem exigir que o Rei seja vilão ou inocente absoluto." },
          { subtitulo: "A herdeira", texto: "A filha do Rei percebe inconsistências e pode se tornar aliada, rival política ou alternativa de sucessão. Os jogadores não precisam coroá-la: podem expor o esquema, negociar reformas, derrubar o Ministro ou criar outro desfecho." }
        ]
      },
      {
        titulo: "Camada 3 — A verdade além dos reinos",
        blocos: [
          { subtitulo: "Quem é O Salvador", texto: "O Salvador é uma entidade ou presença antiga que aparece sob identidades diferentes ao longo da história. Sua mensagem permanece semelhante: Valédria está ameaçada e sacrifícios são necessários. A barreira realmente pode estar enfraquecendo, mas os métodos apresentados por ele não são a única solução." },
          { subtitulo: "A mentira útil", texto: "A força da campanha está em permitir que O Salvador esteja correto sobre parte do diagnóstico e errado, incompleto ou manipulador sobre a cura. Métodos alternativos podem existir e ter sido escondidos porque diminuem sua influência ou exigem cooperação entre povos rivais." },
          { subtitulo: "Os Seraphins", texto: "Os Seraphins podem servir O Salvador sem serem vilões conscientes. Muitos podem acreditar que protegem o mundo. Isso permite confrontos que terminem em negociação, ruptura interna, redenção ou guerra, conforme as decisões do grupo." }
        ]
      }
    ],
    arcos: [
      { nome: "Arco Humano", escala: "Local → reino", objetivo: "Descobrir a rede, enfrentar a conspiração e decidir o destino político dos responsáveis.", pistas: "Desaparecimentos, registros de mana, ordens falsas, agentes e documentos da corte." },
      { nome: "Arco Élfico", escala: "Floresta e memória antiga", objetivo: "Descobrir versões mais antigas da barreira e formas de magia que os humanos não registraram.", pistas: "Raízes Antigas, arquivos élficos, rituais e testemunhos ancestrais." },
      { nome: "Arco Anão", escala: "Montanhas e profundezas", objetivo: "Encontrar conhecimento de construção, selos, ligas ou armamentos ligados à proteção do mundo.", pistas: "Grandes forjas, clãs, túneis antigos e registros em pedra." },
      { nome: "Arco Demoníaco", escala: "Ruínas e verdade proibida", objetivo: "Revelar o que foi apagado das versões humanas da história e por que métodos alternativos foram ocultados.", pistas: "Sem'Kar, Ruínas Ardentes, linhagens e pactos antigos." },
      { nome: "Arco dos Seraphins", escala: "Confronto final", objetivo: "Definir como Valédria será protegida e o que fazer com O Salvador e seus seguidores.", pistas: "A verdade completa da barreira, custos de cada solução e alianças reunidas nos arcos anteriores." }
    ],
    ritmo: [
      { momento: "Início em Amieiro", revelar: "O ataque foi organizado e jovens são alvos específicos.", ocultar: "Motivo exato, barreira e identidade dos mandantes." },
      { momento: "Ponte Alta e primeiras cidades", revelar: "Existem casos semelhantes e alguém coleta informações sobre anomalias de mana.", ocultar: "Papel completo do Ministro e natureza de O Salvador." },
      { momento: "Conspiração urbana", revelar: "Agentes ligados à corte protegem o esquema; o Rei recebe informações filtradas.", ocultar: "Verdade completa sobre a barreira." },
      { momento: "Final do arco humano", revelar: "A energia dos capturados é usada para sustentar uma proteção antiga.", ocultar: "Métodos alternativos e interesse pessoal de O Salvador." },
      { momento: "Arcos não humanos", revelar: "Cada povo possui uma parte diferente da história da barreira.", ocultar: "A solução final até que os jogadores tenham peças suficientes para escolher." },
      { momento: "Confronto final", revelar: "Natureza de O Salvador, alternativas e custo real de cada caminho.", ocultar: "Nada obrigatório: o final deve depender das decisões acumuladas." }
    ],
    ganchos_iniciais: [
      "Uma família pede ajuda após o desaparecimento de um jovem que nunca chegou ao destino.",
      "Um mercenário ferido carrega uma lista de nomes de Amieiro, mas não sabe quem contratou seu grupo.",
      "Irmã Iria percebe que registros de nascimento ou maioridade foram consultados por alguém usando autorização oficial falsa.",
      "Uma criatura do Bestiário é encontrada com marcas de contenção arcana semelhantes às usadas em pessoas desaparecidas.",
      "Um mensageiro morto traz ordens contraditórias assinadas por setores diferentes da mesma corte."
    ],
    adaptacao: [
      "Troque Amieiro por qualquer vila em que os personagens tenham vínculos.",
      "Substitua o Ministro por uma guilda, ordem religiosa, conselho ou comandante militar se a mesa preferir outro tipo de antagonista.",
      "O Salvador pode ser entidade real, título herdado, inteligência antiga ou interpretação equivocada de um fenômeno — escolha somente quando isso se tornar relevante.",
      "Se o grupo rejeitar a política da corte, leve as pistas para rotas comerciais, Academia ou Encruzilhada em vez de forçar uma audiência real.",
      "A campanha pode terminar satisfatoriamente após o arco humano; os demais arcos funcionam como expansões."
    ]
  }
];
