# Área do Mestre — ativação

## Estado desta entrega

O site público apresenta o produto e a entrada da Área do Mestre. O painel inclui leitura, busca, favoritos, quatro geradores e caderno local com exportação/importação. O acesso não é simulado. Com `apiBase` vazio, nenhum formulário envia dados e nenhuma venda está habilitada.

O serviço em `server/index.cjs` implementa contas, login Google por OAuth 2.0 Authorization Code com PKCE, confirmação de e-mail, senha com scrypt e salt, sessões HttpOnly, CSRF, recuperação por token de uso único, revogação de sessões após troca de senha e autorização do acervo por conta e validade. O armazenamento usa MongoDB via Mongoose. Requer Node.js 20.19+ e as dependências do projeto. Ainda é necessário escolher e configurar hospedagem, envio de e-mail e cobrança antes de lançar.

O modelo `CharacterSheet` registra no MongoDB os campos exportados pela ficha, mas ainda não existe rota para sincronizar as fichas salvas no navegador.

## Conteúdo privado

### Planos e oficina

O campo `entitlements.plan` aceita `contador`, `mestre` e `deus`, com herança de recursos. O servidor filtra a biblioteca por `minPlan` e valida o plano em todas as rotas da oficina.

- Contador: seis kits de sessão, mapas separados, pistas, fichas de interpretação e livro bônus.
- Mestre: acrescenta a campanha de seis sessões A Rota das Lanternas, campanhas salvas, sessões, NPCs, missões, inventário, iniciativa e painel de revelações.
- Deus: acrescenta editor de cenas conectadas, atlas pessoal com rotas e revelações, cinco modelos editáveis e exportação/importação.

Mantenha `studio.json` e `bonus-valedria.pdf` na mesma pasta privada de `library.json`. Documentos ficam no MongoDB por usuário e tipo; versões concorrentes retornam 409 para evitar sobrescrita. `/api/table/:token` retorna somente campos públicos dos registros revelados e pode ser revogado pelo dono. O token dá acesso de leitura à mesa; não contém o acervo nem notas privadas.

Conceda acesso com `node server/access.cjs grant EMAIL YYYY-MM-DD PLANO`. Contas locais de demonstração e suas senhas ficam fora do repositório. O teste de autenticação é `node server/security.test.cjs`.

O acervo está em `work/master-vault/library.json`, FORA deste repositório, no diretório de trabalho local. Preserve e faça backup desse arquivo junto dos originais. Inclui os 18 capítulos, pilares, tabelas, preparação, crônica completa, seis aventuras e materiais extras. Copie-o para armazenamento privado do servidor, jamais para `assets`, `dist`, GitHub ou bucket público.

Os antigos arquivos públicos `assets/data/mestre.js` e `assets/data/cronicas.js` foram retirados da versão atual. Seu conteúdo antigo continua recuperável no histórico público do Git: esta mudança não torna retroativamente secreto aquilo que já foi publicado. A senha antiga do navegador foi descartada.

## Hospedagem

1. Use Node.js 20.19+ atrás de um proxy HTTPS, com domínio próprio, MongoDB persistente e backups do banco e acervo. Configure a API pública em `assets/data/master-config.js` como `{apiBase:'/api'}`.
2. Preencha `.env` com `MONGODB_URI` e `GOOGLE_CLIENT_ID`. O Client ID é disponibilizado pela rota pública `/api/auth/config`; mantenha o segredo OAuth apenas no servidor. Banco e acervo devem ficar fora do repositório; o `.env` está ignorado pelo Git.
3. Inicie com `npm start`. O serviço escuta em `localhost` na porta definida por `PORT` (padrão `3000`). O proxy deve encaminhar o site e `/api` à mesma origem, aplicar HTTPS, HSTS e limites de conexões. O Express serve os documentos HTML da raiz e os assets de `assets/`; mantenha acervos e outros arquivos privados fora desses diretórios.
4. A hospedagem estática no GitHub Pages não executa esse servidor. Hospede o Express e os arquivos públicos na mesma origem para ativar o backend. Não ligue uma API em domínio de terceiros esperando que cookies entre sites funcionem em todos os navegadores.

Configure o proxy para SOBRESCREVER `X-Forwarded-For` com um único IP validado do cliente e só então defina `MASTER_TRUST_PROXY=true`. Não repasse o cabeçalho recebido do visitante. Sem essa configuração, os limites de tentativas usam o IP da conexão (o proxy), compartilhado entre visitantes. O limitador em memória exige uma única instância; escalar exige um limitador compartilhado e persistente.

`GET /api/auth/config` disponibiliza o Client ID público do Google. `POST /api/auth/google` recebe um ID token, verifica sua assinatura e audiência, exige e-mail verificado e cria ou atualiza o usuário no MongoDB. Após sucesso, o navegador segue para `conta.html`. Este fluxo ainda não cria sessão persistente para as APIs de conta, oficina ou conteúdo privado.

## Cobrança e direito de acesso

Não há checkout, plano, preço nem webhook de pagamento escolhido nesta entrega. Não habilite vendas até integrar o provedor e testar compra, renovação, expiração, cancelamento e estorno. O futuro webhook deve validar a assinatura do provedor, ser idempotente e atualizar `entitlements` usando o identificador de conta confirmado; nunca aceite uma flag de pagamento vinda do navegador. Não libere acesso pelo simples retorno a uma página de sucesso.

Para operação e homologação, o administrador pode usar `server/access.cjs grant USER_ID YYYY-MM-DD [PLANO]` ou `revoke USER_ID`, com `MONGODB_URI` configurado. Isso exige acesso ao servidor. Não existe endpoint público de concessão. O acervo exige identidade autenticada e concessão não expirada; como a autenticação foi removida, o acervo permanece inacessível. Lançamento comercial também precisa de preço, termos de venda, privacidade, cancelamento e suporte definidos pelo responsável.

## Contrato da interface

`login.html` usa `assets/js/login.js` para iniciar o Google Identity Services e enviar a credencial ao backend. Não há endpoint de sessão ou logout implementado.

GET `/api/library`: retorna 401 enquanto a autenticação não for reimplementada. O conteúdo privado também permanece bloqueado. Toda resposta privada usa `Cache-Control: no-store`. Não adicionar cache de API em CDN ou service worker.

As anotações e favoritos são locais, separados por ID de conta; não são sincronizados nem criptografados no dispositivo. O usuário deve exportar suas anotações antes de limpar o navegador. A biblioteca não é salva no armazenamento local. Um assinante pode copiar o que consegue ler: controle de acesso não equivale a DRM.

## Antes de abrir vendas

Antes de abrir vendas, reimplementar e homologar autenticação, autorização, backup/restauração e cobrança escolhida. Conferir acesso direto sem sessão, CSRF, tentativas excessivas, expiração/revogação, navegação móvel e ambos os temas. Os testes locais não validam processamento financeiro.
