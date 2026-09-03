window.RITMOS_VIAGEM = [
  { ritmo: "Forçado", distancia: "+50% de distância", efeito: "Fadiga no dia seguinte se mantido por mais de 1 dia" },
  { ritmo: "Normal", distancia: "Distância de referência", efeito: "Nenhum efeito" },
  { ritmo: "Cauteloso", distancia: "-30% de distância", efeito: "Vantagem em testes de Percepção contra emboscadas" }
];

window.ROTAS_VIAGEM = [
  { rota: "Amieiro → Floresta → Cavernas", pe: "Meio dia", cavalo: "Não aplicável (terreno fechado)", barco: "—" },
  { rota: "Amieiro → Ponte Alta", pe: "3 dias", cavalo: "1,5 dia", barco: "1 dia (trecho fluvial parcial)" },
  { rota: "Ponte Alta → cidade grande seguinte", pe: "4-5 dias", cavalo: "2-3 dias", barco: "2 dias (Rio Prateado, se a rota permitir)" },
  { rota: "Terras Humanas → Eryndal (fronteira élfica)", pe: "5 dias", cavalo: "2,5 dias", barco: "Não aplicável" },
  { rota: "Eryndal → Silvanneth (interior élfico)", pe: "2 dias (apenas com guia élfico)", cavalo: "Não aplicável", barco: "—" },
  { rota: "Terras Humanas → Fauces do Norte (fronteira anã)", pe: "6 dias", cavalo: "3 dias", barco: "Não aplicável" },
  { rota: "Fauces → Durrak-Thol (interior anão)", pe: "2 dias", cavalo: "1 dia (estrada de pedra)", barco: "—" },
  { rota: "Terras Humanas → Borda das Cinzas (fronteira demoníaca)", pe: "7 dias", cavalo: "3,5 dias", barco: "Não aplicável" },
  { rota: "Borda das Cinzas → Skral", pe: "1 dia", cavalo: "Meio dia", barco: "—" }
];

window.CLIMA_TERRITORIOS = [
  { territorio: "Terra dos Humanos — Clima Temperado", efeito: "Sem efeitos mecânicos na maior parte do ano. Tempestades ocasionais podem forçar abrigo (perda de meio dia de viagem) ou criar terreno escorregadio (desvantagem em testes de Destreza em terreno elevado)." },
  { territorio: "Terras Élficas — Véu Verde", efeito: "Clima ameno, mas desorientação natural é o efeito real: sem guia élfico, teste de Percepção (dificuldade 16) por dia de viagem; falha significa atraso de meio dia ou encontro adicional não planejado." },
  { territorio: "Terras Anãs — Fauces", efeito: "Frio intenso e ventos fortes: sem equipamento adequado, risco de Febre de Viagem após mais de um dia de exposição." },
  { territorio: "Terras Anãs — Salões Médios", efeito: "Temperatura controlada por Cristais-Sol — sem efeito climático." },
  { territorio: "Terras Anãs — Abismo Interior", efeito: "Calor extremo: sem preparo, risco de exaustão (desvantagem em testes físicos) após meio dia de exposição contínua." },
  { territorio: "Terras Demoníacas — Mar de Areia", efeito: "Calor extremo constante. Sem proteção adequada, risco de Febre de Viagem e exaustão após um único dia de exposição. Tempestades de areia podem forçar parada total por até um dia inteiro e causam desorientação equivalente à das Terras Élficas, por motivo climático." }
];

window.SUPRIMENTOS_VIAGEM = [
  { territorio: "Terra dos Humanos", suprimento: "Ração de viagem + água", consequencia: "Fadiga leve após 2 dias sem comida" },
  { territorio: "Terras Élficas", suprimento: "Guia élfico (Eryndal)", consequencia: "Alto risco de desorientação e atraso" },
  { territorio: "Terras Anãs (Fauces)", suprimento: "Agasalho/capa de frio", consequencia: "Risco de Febre de Viagem" },
  { territorio: "Terras Anãs (Abismo)", suprimento: "Preparo específico contra calor", consequencia: "Exaustão acelerada" },
  { territorio: "Terras Demoníacas", suprimento: "Água em quantidade dobrada + proteção solar", consequencia: "Febre de Viagem e exaustão rápida" }
];

window.EVENTOS_VIAGEM = [
  { d6: "1", evento: "Clima adverso (chuva, vento ou calor conforme região) — atraso de meio dia" },
  { d6: "2", evento: "Trilha alternativa encontrada — pode economizar tempo, mas com risco desconhecido" },
  { d6: "3", evento: "Sinal de passagem recente de outra criatura ou grupo (pista narrativa)" },
  { d6: "4", evento: "Suprimento danificado (água derramada, comida estragada) — gestão de recursos" },
  { d6: "5", evento: "Encontro pacífico com viajante ou grupo local (rumor, informação, pequeno comércio)" },
  { d6: "6", evento: "Vista notável ou momento de respiro — bom para desenvolvimento de personagem, sem mecânica" }
];

window.ENCONTROS = [
  { regiao: "Terra dos Humanos", local: "Estrada entre Vilas", chance: "1-14 nenhum encontro · 15-18 encontro menor · 19-20 encontro perigoso",
    tabela: ["Javali Selvagem (isolado)", "Corvo-Sombra (observando à distância)", "Viajante ou caravana comercial (não hostil)", "Lobo da Floresta (par ou trio)", "Bandidos de estrada (grupo pequeno)", "Golem de Fronteira (guardião abandonado, dormente)", "Rasga-Bruma (encontro perigoso, à noite)"] },
  { regiao: "Terra dos Humanos", local: "Floresta ao Redor de Amieiro", chance: "1-12 nenhum encontro · 13-17 encontro menor · 18-20 encontro perigoso",
    tabela: ["Javali Selvagem", "Aranha-de-Casca", "Raposa de Nove Caudas (rara, foge rápido)", "Lobo da Floresta (matilha pequena)", "Urso de Pedra (isolado, territorial)", "Lobo da Floresta Rei (líder de matilha, raro)", "Rasga-Bruma"] },
  { regiao: "Terra dos Humanos", local: "Cavernas sob Amieiro", chance: "1-10 nenhum encontro · 11-16 encontro menor · 17-20 encontro perigoso",
    tabela: ["Morcegos comuns (não listados como ameaça)", "Lagarto de Ruína (hostil, territorial)", "Golem de Fronteira", "Aranha-de-Casca (ninho)", "Armadilha natural (sem criatura)", "Rasga-Bruma (encontro raro e perigoso)"] },
  { regiao: "Terra dos Humanos", local: "Rota Amieiro–Ponte Alta", chance: "1-13 nenhum encontro · 14-18 encontro menor · 19-20 encontro perigoso",
    tabela: ["Corvo-Sombra", "Javali Selvagem", "Mercenários remanescentes (ligados ao ataque a Amieiro)", "Lobo da Floresta", "Urso de Pedra", "Golem de Fronteira"] },
  { regiao: "Terras Élficas", local: "Borda Pálida", chance: "1-13 nenhum encontro · 14-18 encontro menor · 19-20 encontro perigoso",
    tabela: ["Cervo-Lanterna", "Batedores élficos (patrulha, não hostil sem invasão)", "Aranha-Tecelã-de-Luz", "Guardião de Musgo (dormente)", "Ilusão de desorientação (armadilha natural élfica)"] },
  { regiao: "Terras Élficas", local: "Coração Verde", chance: "1-10 nenhum encontro · 11-16 encontro menor · 17-20 encontro perigoso",
    tabela: ["Cervo-Lanterna", "Aranha-Tecelã-de-Luz", "Criatura vertical não catalogada (uso livre do Mestre)", "Guardião de Musgo (ativo)", "Elfos locais (reação depende do contexto narrativo)"] },
  { regiao: "Terras Élficas", local: "Raízes Antigas", chance: "1-8 nenhum encontro · 9-15 encontro menor · 16-20 encontro perigoso",
    tabela: ["Sons/sussurros sem origem visível (tensão, sem combate)", "Fenda instável (armadilha ambiental)", "Sussurro das Raízes (manipulação, não combate direto)", "Sussurro das Raízes (ativo e hostil)"] },
  { regiao: "Terras Anãs", local: "Fauces (entrada das montanhas)", chance: "1-14 nenhum encontro · 15-18 encontro menor · 19-20 encontro perigoso",
    tabela: ["Fauna de alta altitude (não hostil)", "Patrulha anã (registro de viajantes)", "Morcego de Cristal (bando pequeno)", "Tempestade de neve (evento ambiental)", "Contrabandistas na Passagem do Vento Cortante"] },
  { regiao: "Terras Anãs", local: "Salões Médios", chance: "1-15 nenhum encontro · 16-19 encontro menor · 20 encontro perigoso",
    tabela: ["Rato-de-Túnel Blindado (grupo)", "Morcego de Cristal", "Anões locais (comércio, informação)", "Colapso estrutural menor (evento ambiental)"] },
  { regiao: "Terras Anãs", local: "Abismo Interior", chance: "1-9 nenhum encontro · 10-15 encontro menor · 16-20 encontro perigoso",
    tabela: ["Calor extremo (dano ambiental, sem criatura)", "Verme de Magma (isolado)", "Trabalhadores de Gryndak (não hostil)", "Verme de Magma (ativo por vibração de escavação)", "Golem de Minério Vivo (extremamente raro)"] },
  { regiao: "Terras Demoníacas", local: "Borda das Cinzas", chance: "1-12 nenhum encontro · 13-17 encontro menor · 18-20 encontro perigoso",
    tabela: ["Escorpião de Vidro", "Goblins de Skral (patrulha ou comércio oportunista)", "Calor extremo (dano ambiental)", "Cão de Brasa (isolado)", "Cão de Brasa (matilha)"] },
  { regiao: "Terras Demoníacas", local: "Mar de Areia", chance: "1-9 nenhum encontro · 10-15 encontro menor · 16-20 encontro perigoso",
    tabela: ["Tempestade de areia (evento ambiental, desorientação)", "Escorpião de Vidro", "Serpente das Dunas", "Cão de Brasa (matilha)", "Demônios de casta média (patrulha ou caravana)", "Rastro do Devorador das Areias (pista narrativa de tensão)"] },
  { regiao: "Terras Demoníacas", local: "Ruínas Ardentes", chance: "1-8 nenhum encontro · 9-14 encontro menor · 15-20 encontro perigoso",
    tabela: ["Campo de energia residual (interferência mágica, sem criatura)", "Artefato intacto (recompensa, sem combate)", "Guardião de Obsidiana (dormente)", "Guardião de Obsidiana (ativo — invasores de artefato)"] }
];

window.ENCONTROS_NOTAS = "Frequência recomendada: uma rolagem por trecho significativo de viagem, não por minuto de jogo — em cidades e áreas seguras, não é necessário rolar. Encontros ambientais (tempestades, colapsos, calor extremo) não são combate: use-os para criar tensão e decisões táticas. Criaturas Raras, Elite e Lendárias devem aparecer com menos frequência do que a rolagem pura sugere se o ritmo da sessão pedir algo mais tranquilo — use-as como ganchos de sessão inteira, não obstáculo de passagem.";
