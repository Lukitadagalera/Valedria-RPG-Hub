# Área do Mestre — ativação

## Estado desta entrega

O site público apresenta o produto e a entrada da Área do Mestre. O painel inclui leitura, busca, favoritos, quatro geradores e caderno local com exportação/importação. O acesso não é simulado. Com `apiBase` vazio, nenhum formulário envia dados e nenhuma venda está habilitada.

O serviço em `server/index.cjs` implementa contas, confirmação de e-mail, senha com scrypt e salt, sessões HttpOnly, CSRF, recuperação por token de uso único, revogação de sessões após troca de senha e autorização do acervo por conta e validade. Não há dependências npm; requer Node 24+ e armazenamento persistente. Ainda é necessário escolher e configurar hospedagem, envio de e-mail e cobrança antes de lançar.

## Conteúdo privado

O acervo está em `work/master-vault/library.json`, FORA deste repositório, no diretório de trabalho local. Preserve e faça backup desse arquivo junto dos originais. Inclui os 18 capítulos, pilares, tabelas, preparação, crônica completa, seis aventuras e materiais extras. Copie-o para armazenamento privado do servidor, jamais para `assets`, `dist`, GitHub ou bucket público.

Os antigos arquivos públicos `assets/data/mestre.js` e `assets/data/cronicas.js` foram retirados da versão atual. Seu conteúdo antigo continua recuperável no histórico público do Git: esta mudança não torna retroativamente secreto aquilo que já foi publicado. A senha antiga do navegador foi descartada.

## Hospedagem

1. Use Node 24+ atrás de um proxy HTTPS, com domínio próprio, volume persistente e backups para SQLite e acervo. Execute `npm run build` e configure a API pública em `assets/data/master-config.js` como `{apiBase:'/api'}` antes da compilação de produção.
2. Defina `MASTER_ORIGIN` com a origem HTTPS exata do site, sem caminho; `MASTER_DB` como caminho absoluto do banco; `MASTER_LIBRARY` como caminho absoluto do acervo. Banco e acervo devem ficar fora do repositório. O processo precisa ter acesso a ambos.
3. Inicie `node server/index.cjs`. O serviço escuta somente em `127.0.0.1:4180` (ou `PORT`). O proxy deve encaminhar o site e `/api` à mesma origem, aplicar HTTPS, HSTS, limites de conexões e bloquear acesso direto à porta. O serviço serve somente `dist`, não o repositório.
4. A hospedagem atual no GitHub Pages não executa esse servidor. Mantenha a versão pública em preparação até migrar para a origem com backend. Não ligue uma API em domínio de terceiros esperando que cookies entre sites funcionem em todos os navegadores.

Configure o proxy para SOBRESCREVER `X-Forwarded-For` com um único IP validado do cliente e só então defina `MASTER_TRUST_PROXY=true`. Não repasse o cabeçalho recebido do visitante. Sem essa configuração, os limites de tentativas usam o IP da conexão (o proxy), compartilhado entre visitantes. O limitador em memória exige uma única instância; escalar exige um limitador compartilhado e persistente.

## E-mails

Defina `MASTER_MAIL_ENDPOINT` (HTTPS) e `MASTER_MAIL_TOKEN` somente no ambiente privado do servidor. O adaptador de e-mail escolhido recebe POST autenticado por `Authorization: Bearer ...`, com `{template,to,url}`. Templates: `verify-email` e `password-reset`. Ele deve enviar uma mensagem transacional com o link, retornar 2xx somente após aceitar o envio e não registrar tokens ou links em logs. Configure remetente verificado, SPF/DKIM e observabilidade de falhas de entrega. Sem esse adaptador, cadastro e recuperação permanecem indisponíveis.

Links de confirmação duram 24h; recuperação, 30min. São armazenados apenas como hash, usados uma única vez e enviados no fragmento da URL para não aparecerem no log HTTP do site. A interface remove o fragmento ao abri-los. Não há armazenamento de senhas no navegador. “Manter conectado” mantém o cookie por até 30 dias; a sessão comum expira em 8h.

## Cobrança e direito de acesso

Não há checkout, plano, preço nem webhook de pagamento escolhido nesta entrega. Não habilite vendas até integrar o provedor e testar compra, renovação, expiração, cancelamento e estorno. O futuro webhook deve validar a assinatura do provedor, ser idempotente e atualizar `entitlements` usando o identificador de conta confirmado; nunca aceite uma flag de pagamento vinda do navegador. Não libere acesso pelo simples retorno a uma página de sucesso.

Para operação e homologação, o administrador pode usar `server/access.cjs grant EMAIL YYYY-MM-DD` ou `revoke EMAIL`, com `MASTER_DB` configurado. Isso exige acesso ao servidor e conta já confirmada. Não existe endpoint público de concessão. O acervo exige sessão válida E concessão não expirada em cada requisição. Lançamento comercial também precisa de preço, termos de venda, privacidade, cancelamento e suporte definidos pelo responsável.

## Contrato da interface

GET `/api/session`: `{user:null|{id,email},csrfToken,entitlement:{status:'active'|'inactive'}}`.

POST `/api/login`: `{email,password,remember}`; POST `/api/register`: `{email,password}`; POST `/api/password-reset`: `{email}`; POST `/api/password-update`: `{token,password}`; POST `/api/verify-email`: `{token}`; POST `/api/logout`: `{}`. Todos os POST exigem cookie, origem exata, JSON e `X-CSRF-Token` da sessão. Cadastro e recuperação retornam resposta genérica. Não informe se um e-mail está cadastrado.

GET `/api/library`: acervo estruturado, somente com autorização ativa. Retorna 401 sem sessão, 403 sem direito de acesso. Toda resposta privada usa `Cache-Control: no-store`. Não adicionar cache de API em CDN ou service worker.

As anotações e favoritos são locais, separados por ID de conta; não são sincronizados nem criptografados no dispositivo. O usuário deve exportar suas anotações antes de limpar o navegador. A biblioteca não é salva no armazenamento local. Um assinante pode copiar o que consegue ler: controle de acesso não equivale a DRM.

## Antes de abrir vendas

Homologar o fluxo completo na hospedagem real com e-mail real, backup/restauração e cobrança escolhida. Conferir expiração/revogação, acesso direto sem sessão, CSRF, tentativas excessivas, recuperação expirada/reutilizada, troca de senha invalidando sessões, navegação móvel e ambos os temas. Os testes locais com transporte de e-mail simulado não validam entregabilidade real nem processamento financeiro.
