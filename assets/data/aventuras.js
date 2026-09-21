/* ============================================================
   GERADOR DE AVENTURAS REGIONAIS — dados
   Tabelas combinatórias usadas para sortear ganchos de missão
   novos por região, respeitando a escala de nível e moeda já
   estabelecida no Livro X (Guilda).
   ============================================================ */
window.GERADOR_PROBLEMAS = [
  "Desaparecimento de morador ou viajante",
  "Sabotagem comercial ou disputa entre mercadores",
  "Criatura do Bestiário atacando arredores",
  "Disputa política ou de nobreza menor",
  "Contrabando, dívida ou extorsão",
  "Fenômeno estranho ligado a magia antiga"
];

window.GERADOR_COMPLICACOES = [
  "Emboscada na estrada durante a investigação",
  "A principal testemunha desaparece antes de falar",
  "A pista leva a outra região, exigindo viagem",
  "Uma autoridade local está encobrindo parte da verdade",
  "Clima extremo dificulta a missão (ver Livro XI)",
  "Um rival também está atrás da mesma solução"
];

window.GERADOR_RECOMPENSAS = [
  { nivel: "Iniciante", faixa: "0,080–0,120 C por aventureiro (bruto)", pagoPor: "Figura local (chefe de vila, sacerdote, comerciante)" },
  { nivel: "Regional", faixa: "0,200–0,600 C para o grupo (bruto)", pagoPor: "Guilda de Aventureiros ou nobreza menor" },
  { nivel: "Intermediário", faixa: "0,400–0,600 C para o grupo (bruto) + benefício não monetário", pagoPor: "Academia, guarda municipal ou guilda de mercadores" },
  { nivel: "Avançado", faixa: "1,000 C ou mais para o grupo (bruto; contrato extraordinário, pagamento em frações ou peça real autorizada)", pagoPor: "Coroa, Conselho de Encruzilhada ou Alto Ferreiro/Matriarca" }
];

/* Nível padrão de cada região, usado para travar a faixa de recompensa
   sorteada — mantém coerência com o quadro fixo de missões da Guilda. */
window.GERADOR_NIVEL_POR_REGIAO = {
  "Amieiro": "Iniciante",
  "Ponte Alta": "Iniciante a Intermediário",
  "Cárdenas Alta": "Regional",
  "Feira Nova": "Regional",
  "Academia de Valédria": "Intermediário",
  "Montegris": "Intermediário",
  "Pedrafria": "Intermediário",
  "Vigília Branca": "Intermediário",
  "Encruzilhada": "Intermediário a Avançado"
};

