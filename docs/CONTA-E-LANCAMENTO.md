# Conta e lançamento comercial

## Estado da autenticação
O botão principal usa Google Identity Services no navegador, valida o ID token no servidor Express e cria ou atualiza o usuário no MongoDB. Após sucesso, os dados públicos do perfil ficam em `localStorage` e a página direciona para `conta.html`; esse fluxo não cria uma sessão no servidor.

O link “OAuth web do Google” inicia o fluxo Passport em `/auth/google`. O callback cria uma sessão persistente no MongoDB e retorna a `conta.html`; `/auth/status` consulta a sessão e `/auth/logout` a encerra. As rotas `/api/fichas` exigem essa sessão e associam as fichas ao usuário autenticado. O fluxo Passport e o endpoint `/api/auth/google` são mantidos em paralelo.

`login.html` carrega `assets/js/login.js`; o Client ID público é servido por `/api/auth/config`, e o segredo nunca é enviado ao navegador. Configure `GOOGLE_CLIENT_SECRET`, `SESSION_SECRET` (segredo aleatório próprio, recomendado com pelo menos 32 caracteres) e `GOOGLE_CALLBACK_URL=https://valedria.lat/auth/google/callback`; registre essa URL como URI de redirecionamento autorizado no Google Cloud. Sem `SESSION_SECRET`, o servidor deriva uma chave de compatibilidade do segredo OAuth e emite um aviso; configure a chave dedicada antes da produção. Se o site estiver atrás de proxy HTTPS, configure `TRUST_PROXY=true` e `NODE_ENV=production` para que o cookie da sessão seja seguro. A conexão MongoDB usa `MONGO_URI` (aceita também `MONGODB_URI` para compatibilidade), além de `GOOGLE_CLIENT_ID`.

`conta.html` ainda mantém os dados e funcionalidades locais atuais. A sessão Passport autentica apenas as rotas do servidor que a verificam; não substitui autorização nas APIs separadas do serviço da Área do Mestre.

No Google Cloud Console, configure o OAuth Client ID do tipo **Aplicativo da Web** e inclua `https://lukitadagalera.github.io` em **Origens JavaScript autorizadas** para a publicação no GitHub Pages. Em desenvolvimento, cadastre também a origem exata usada no navegador (por exemplo, `http://localhost:3000` ou `http://127.0.0.1:3000`). A origem não inclui caminho como `/login.html`; protocolo, host e porta devem corresponder exatamente. Um erro Google `400: origin_mismatch` acontece antes da chamada à API e exige essa configuração no Console.

## Publicação atual e demonstração
A conta agora exige o login Google pelo servidor Express; uma prévia estática no GitHub Pages não conclui esse fluxo. Os testes da demonstração continuam disponíveis sem serviços externos e não enviam dados, e-mails ou cobranças reais. A autenticação simulada não é a autenticação de produção.

Perfis: usuario@valedria.local (gratuito), contador@valedria.local, mestre@valedria.local e deus@valedria.local. Senha inicial: Valedria@Teste2026! São contas fictícias públicas, sem acesso a serviços reais; não reutilize essa senha em produção.

Os botões de perfil entram diretamente para facilitar revisão. Também é possível cadastrar dados fictícios, confirmar pela caixa de e-mails de teste, recuperar e alterar a senha, editar perfil, abrir atendimento, simular resposta e encerramento, trocar plano e simular cancelamento/expiração. Biblioteca, ferramentas, caderno, seis kits e documentos funcionam no navegador. Contador vê dois kits, Mestre quatro e Deus das Lendas seis. O painel dos jogadores e os pedidos de participação nas mesas funcionam somente nesse mesmo navegador. Os dados de cada perfil ficam separados por ID, mas não há proteção real contra inspeção do armazenamento local. Não use conteúdo confidencial na demonstração.

A prévia de bloqueios indica o plano necessário. A distribuição inicial é por capítulo; a curadoria de personagens e localidades pode ser refinada na matriz. O código e as amostras continuam públicos. O servidor real mantém a validação e os arquivos privados.

Os testes automatizados da demonstração exercitam os perfis e fluxos simulados sem abrir `conta.html`; a página de conta requer uma sessão Google válida no navegador.

## Antes de reativar o acesso protegido
1. Conectar a sessão Passport às APIs de conta, oficina, biblioteca e conteúdo privado; adicionar testes de autorização e expiração.
2. Adicionar proteção CSRF explícita e limites de tentativas às operações autenticadas.
3. Configurar hospedagem Node.js 20.19+ com HTTPS, MongoDB persistente e backups. Definir `MONGO_URI` (ou `MONGODB_URI`), `GOOGLE_CLIENT_ID`, `MASTER_ORIGIN` e `MASTER_LIBRARY` no `.env`.
4. O servidor serve diretamente os arquivos públicos da raiz e `assets/`. Não coloque conteúdo privado nessas pastas nem publique esta árvore sem revisar os arquivos estáticos acessíveis; mantenha acervos privados fora do diretório servido.
5. Só então definir provedor/preços, integrar checkout e webhook assinado/idempotente e testar expiração, cancelamento, falha de pagamento e estorno.
6. Configurar canal e responsável pelo suporte, revisar a matriz de acesso e aprovar textos de privacidade, atendimento e assinatura antes da coleta real.

O histórico público do repositório e versões já baixadas não se tornam secretos ao ativar a nova distribuição. Conteúdos comerciais novos devem ser mantidos em armazenamento privado desde a criação.

Não existe migração automática de contas ou sessões antigas. Planeje uma migração explícita se dados reais precisarem ser preservados.

## Testes
node server/security.test.cjs
node server/studio.test.cjs
node server/content.test.cjs

## Impressão e imagens
A ficha oferece prévia e um documento de impressão independente, sem herdar a rolagem do diálogo. O modelo vazio ocupa duas páginas A4, com fundo branco, ramos cinza, retratos em tons de cinza, recursos e espaços de escrita. Para PDF use o destino Salvar como PDF do navegador; desative os cabeçalhos/rodapés do navegador para não incluir URL e data. Conteúdo extenso pode ocupar páginas extras.
As imagens foram reprocessadas dos originais externos: WebP 92 nos arquivos maiores, 90 nas variantes, até 2560px, e seleção responsiva 480/960/1440/1920. Não são ampliadas artificialmente. Os originais não entram no site publicado.

## Desempenho e resolução
Os filtros SVG animados de deslocamento/turbulência foram removidos dos fundos repetidos. A textura de base é estática. Uma camada de luz e balanço usa transformações e opacidade somente no quadro sob o mouse, executa uma passagem por entrada do cursor, reinicia do zero ao sair e voltar e respeita a preferência de movimento reduzido. Não há animação geral de todos os quadros. A seleção responsiva considera a largura e a altura do recorte em object-fit: cover, com margem de resolução no desktop, e só atualiza imagens próximas da área visível. A nitidez máxima continua limitada à resolução dos originais; não há ampliação artificial.

Testes de demonstração: node tests/demo.test.cjs. Serviços de produção: testes security, studio e content em server/.
