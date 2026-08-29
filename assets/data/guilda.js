/* ============================================================
   GUILDA DE AVENTUREIROS — dados
   Estrutura, patentes, regras de recompensa/reputação e o quadro
   de missões completo.
   ============================================================ */
window.GUILDA_ESTRUTURA = "A Guilda de Aventureiros opera de forma independente dos três reinos, com sedes em Ponte Alta, Cárdenas Alta, Montegris e Encruzilhada, todas reconhecendo as mesmas patentes e regras — um aventureiro pode viajar entre reinos sem perder reputação acumulada.";

window.GUILDA_PATENTES = [
  { patente: "Latão", requisito: "Nenhum, registro inicial", acesso: "Missões locais de baixo risco" },
  { patente: "Bronze", requisito: "5 missões concluídas", acesso: "Missões regionais, escoltas maiores" },
  { patente: "Prata", requisito: "15 missões concluídas + recomendação de um Ouro ou superior", acesso: "Missões entre reinos, acesso a contratos da nobreza" },
  { patente: "Ouro", requisito: "30 missões concluídas + missão de grande risco superada", acesso: "Missões da Academia, contratos reais, acesso a Encruzilhada sem escolta" },
  { patente: "Coroa", requisito: "Convite direto de um Conselho de reino ou da Academia", acesso: "Missões diplomáticas, investigações sobre o Bestiário em nível lendário" }
];

window.GUILDA_RECOMPENSA = "Recompensas são pagas na moeda oficial (Cobre, Prata, Ouro e Coroas reais), com a guilda retendo uma taxa de 10% sobre o valor de cada missão concluída, usada para manutenção das sedes e seguro de aventureiros feridos em serviço. Missões fracassadas não geram penalidade financeira, mas reduzem a reputação do grupo até que uma missão de dificuldade equivalente seja concluída com sucesso.";

window.GUILDA_REPUTACAO = "Grupos que quebram contratos, roubam clientes ou causam incidentes diplomáticos (especialmente em Encruzilhada) podem ser suspensos temporariamente ou, em casos graves, expulsos permanentemente da guilda, perdendo acesso a todas as sedes.";

window.MISSOES = [
  // ---- Amieiro e ao redor (iniciante) ----
  { nome: "O Poço Silencioso", regiao: "Amieiro", nivel: "Iniciante", recompensa: "8 Prata por aventureiro, pago pelo chefe de vila", gancho: "O poço da vila parou de fornecer água limpa da noite para o dia. Moradores suspeitam de contaminação ou de algo se escondendo nas raízes próximas à caverna já mapeada perto da vila." },
  { nome: "Carroça Perdida na Estrada de Ponte Alta", regiao: "Amieiro", nivel: "Iniciante", recompensa: "12 Prata + 10% do valor de carga recuperada", gancho: "Uma carroça de mercador que seguia de Amieiro para Ponte Alta não chegou ao destino. As pistas levam a uma emboscada na estrada, possivelmente relacionada a bandidos ou contrabandistas de Trigal." },
  { nome: "A Floresta que Sussurra", regiao: "Amieiro", nivel: "Iniciante", recompensa: "1 Ouro, pago pelo sacerdote local", gancho: "Moradores relatam vozes vindas da entrada da floresta próxima. A missão é confirmar se é fenômeno natural, criatura menor ou eco de magia antiga ligada ao arco de pedra visto ao longe." },
  // ---- Ponte Alta (iniciante a intermediário) ----
  { nome: "Contrabando no Rio", regiao: "Ponte Alta", nivel: "Iniciante a intermediário", recompensa: "2 Ouro + isenção de pedágio por um mês", gancho: "A guarda suspeita que barcaças estão passando mercadoria sem declarar na alfândega da ponte, possivelmente ligada a Trigal ou Poço Fundo." },
  { nome: "A Dívida do Ferreiro", regiao: "Ponte Alta", nivel: "Iniciante a intermediário", recompensa: "Desconto permanente em serviços de forja + 1 Ouro", gancho: "O ferreiro da cidade deve uma soma alta a um agiota de Portovale e está sendo ameaçado. A dívida pode esconder algo maior, como material roubado da Academia de Valédria." },
  { nome: "Enchente Próxima", regiao: "Ponte Alta", nivel: "Iniciante a intermediário", recompensa: "15 Prata por aventureiro + gratidão pública", gancho: "As águas do rio estão subindo mais rápido que o normal antes da estação de cheias. Pode ser causa natural, criaturas aquáticas do Bestiário ou sabotagem de comerciantes rivais." },
  // ---- Regionais ----
  { nome: "Escolta até Feira Nova", regiao: "Ponte Alta / Cárdenas Alta", nivel: "Regional", recompensa: "3 Ouro por trecho seguro", gancho: "Uma caravana de mercadores precisa de proteção na estrada entre Cárdenas e Feira Nova, área conhecida por assaltos recentes." },
  { nome: "Recrutamento em Cárdenas Alta", regiao: "Cárdenas Alta", nivel: "Regional", recompensa: "2 Coroas de Cárdenas + equipamento militar básico", gancho: "O exército de Cárdenas está recrutando para uma expedição contra uma criatura relatada nas colinas próximas — primeiro contato oficial com a nobreza militar do reino." },
  { nome: "O Mercador Desaparecido", regiao: "Feira Nova", nivel: "Regional", recompensa: "1 Ouro + item de valor recuperado", gancho: "Um mercador influente desapareceu em Cruzeiro do Sul durante viagem de negócios. Pode envolver rivalidade comercial, sequestro ou algo ligado à Academia de Valédria." },
  // ---- Academia (intermediário) ----
  { nome: "Componente Roubado", regiao: "Academia de Valédria", nivel: "Intermediário", recompensa: "3 Ouro + acesso temporário à biblioteca da Academia", gancho: "Um componente mágico raro foi roubado de uma das torres de estudo. Os anciãos preferem discrição e oferecem recompensa por recuperação silenciosa." },
  { nome: "O Aluno Desertor", regiao: "Academia de Valédria", nivel: "Intermediário", recompensa: "2 Ouro, pagos discretamente", gancho: "Um estudante fugiu levando anotações proibidas sobre Transformação de Linhagem. A Academia quer o retorno do material antes que caia em mãos erradas." },
  // ---- Norte ----
  { nome: "Disputa com o Clã Pedra-Funda", regiao: "Montegris", nivel: "Intermediário", recompensa: "2 Ouro + favor comercial com Ostenfeld", gancho: "Comerciantes humanos estão tendo dificuldade renovando acordos com o Clã Pedra-Funda, mais fechado que os demais." },
  { nome: "Algo nas Minas de Pedrafria", regiao: "Pedrafria", nivel: "Intermediário", recompensa: "2 Ouro + minério bruto", gancho: "Mineiros relatam ruídos e desaparecimentos nas galerias mais profundas. Pode ser criatura do Bestiário, colapso natural ou algo desperto pela escavação." },
  { nome: "Reforços em Vigília Branca", regiao: "Vigília Branca", nivel: "Intermediário", recompensa: "1 Coroa de Ostenfeld", gancho: "A fortaleza que protege a rota das montanhas está com poucos soldados e busca reforço temporário contra incursões." },
  // ---- Encruzilhada (intermediário a avançado) ----
  { nome: "Mediação no Conselho", regiao: "Encruzilhada", nivel: "Intermediário a avançado", recompensa: "4 Ouro + reputação com uma facção à escolha", gancho: "Uma disputa comercial entre um bairro élfico e um bairro demoníaco ameaça romper a neutralidade da cidade." },
  { nome: "Contrabando Interracial", regiao: "Encruzilhada", nivel: "Intermediário a avançado", recompensa: "3 Ouro + acesso a mercador exótico", gancho: "Itens de origem demoníaca estão sendo vendidos sem passar pela taxa de câmbio oficial do conselho — pode revelar corrupção entre guardas mistos." },
  { nome: "Rota Perigosa para Ponte Rubra", regiao: "Encruzilhada", nivel: "Intermediário a avançado", recompensa: "3 Ouro por aventureiro", gancho: "Uma caravana precisa atravessar a rota até Ponte Rubra, na fronteira com as Terras Demoníacas, com relatos de criaturas do Bestiário e emboscadas." },
  // ---- Avançada (gancho de campanha) ----
  { nome: "Sombras em Limiar de Cinzas", regiao: "Encruzilhada / Ponte Rubra", nivel: "Avançado (gancho de campanha)", recompensa: "5 Ouro + informação sobre a Transformação de Linhagem", gancho: "No último assentamento humano antes do deserto demoníaco, moradores relatam desaparecimentos silenciosos à noite — pode revelar um monstro lendário não identificado ou o início de um plano maior vindo das Terras Demoníacas." }
];
