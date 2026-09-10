# Conexões da comunidade e solicitações

Preencher `assets/data/conexoes.js` com os links públicos oficiais de Discord, Instagram, Suporte e Pacotes. O Discord configurado aqui também ativa os botões da Comunidade. A wiki continua em `assets/data/comunidade.js`.

## Envio à administração — integração pendente

O GitHub Pages serve arquivos estáticos; não envia e-mails. O formulário aguarda um endpoint HTTPS configurado em `solicitacoesEndpoint`. Não colocar senhas, tokens privados nem credenciais no JavaScript público.

O endpoint deve receber POST JSON com `nome`, `email`, `discord`, `papel`, `horario`, `descricao` e `requestId`. O serviço precisa validar campos e limites, restringir a origem ao site, aplicar proteção contra abuso e deduplicar tentativas por `requestId`. Destinatário e credenciais ficam somente no servidor. Nunca usar o e-mail informado pelo visitante como remetente; usar Reply-To após validação.

Responder com status 2xx e `{ "emailSent": true }` somente depois que o provedor de e-mail confirmar que aceitou o envio. Isso confirma o encaminhamento, não a leitura nem a chegada à caixa de entrada. Retornar erro em falhas. O formulário preserva o conteúdo e não mostra sucesso em respostas não confirmadas. Após sucesso, apresenta o botão para a Comunidade.

Faltam: e-mail do administrador, serviço de envio e implantação do endpoint. Até configurar e testar essa integração, o botão fica desativado com uma explicação pública. Os testes locais simulam respostas; não enviam mensagens reais.
