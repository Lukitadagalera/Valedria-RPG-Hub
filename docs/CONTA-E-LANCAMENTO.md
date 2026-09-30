# Cadastro e lançamento comercial

## O que está pronto
- Página Minha conta: dados pessoais básicos, acesso e segurança, atendimento, conversas abertas/encerradas e assinatura.
- API com sessão em cookie HttpOnly, CSRF, confirmação de e-mail, senha derivada com scrypt e limites de tentativa.
- Perfil e histórico de suporte persistidos no banco privado. Cada conversa pertence à conta que a abriu.
- Troca de senha revoga sessões. Botão para encerrar as demais sessões.
- Cinco níveis: visitante, cadastro gratuito, Contador de Histórias, Mestre das Aventuras, Deus das Lendas.
- Matriz inicial revisável em assets/data/access-policy.json. É uma proposta de distribuição por capítulos, ainda não uma curadoria final de cada personagem/localidade.

## Publicação atual e demonstração
O GitHub Pages executa uma demonstração local explícita. Nenhum dado é enviado a um servidor, nenhum e-mail é entregue e nenhuma cobrança é feita. Minha conta é o único login. O menu Área do Mestre só aparece para perfis com um plano ativo.

Perfis: usuario@valedria.local (gratuito), contador@valedria.local, mestre@valedria.local e deus@valedria.local. Senha inicial: Valedria@Teste2026! São contas fictícias públicas, sem acesso a serviços reais; não reutilize essa senha em produção.

Os botões de perfil entram diretamente para facilitar revisão. Também é possível cadastrar dados fictícios, confirmar pela caixa de e-mails de teste, recuperar e alterar a senha, editar perfil, abrir atendimento, simular resposta e encerramento, trocar plano e simular cancelamento/expiração. Biblioteca, ferramentas, caderno, kit de exemplo e documentos funcionam no navegador. O painel dos jogadores funciona somente nesse mesmo navegador. Os dados de cada perfil ficam separados por ID, mas não há proteção real contra inspeção do armazenamento local. Não use conteúdo confidencial na demonstração.

A prévia de bloqueios indica o plano necessário. A distribuição inicial é por capítulo; a curadoria de personagens e localidades pode ser refinada na matriz. O código e as amostras continuam públicos. O servidor real mantém a validação e os arquivos privados.

Para testar localmente a demonstração, abra conta.html?demo=1. A escolha vale para a aba. A versão comercial define VALEDRIA_ACCESS_ACTIVE antes de carregar a sessão e desativa a simulação, mesmo que a aba tenha sido usada para testes.

## Para ativar o acesso protegido
1. Contratar hospedagem Node 24+ com HTTPS, disco persistente e backup do SQLite. Servidor e site precisam estar na mesma origem.
2. Configurar MASTER_ORIGIN, MASTER_DB e MASTER_LIBRARY. Banco, biblioteca e MASTER_CONTENT ficam fora da pasta pública e fora do Git.
3. Configurar o adaptador de e-mail transacional usando MASTER_MAIL_ENDPOINT e MASTER_MAIL_TOKEN, conforme MASTER-API.md.
4. Executar node build.cjs, depois node scripts/build-commercial.cjs com MASTER_CONTENT apontando para uma pasta privada externa ao repositório.
5. Publicar somente dist como arquivos públicos e usar server/index.cjs para servir site e API. O middleware serve os originais privados somente após verificar sessão e nível em cada pedido. Não disponibilizar a pasta privada pelo proxy/CDN. Uma nova execução de build.cjs precisa SEMPRE ser seguida de build-commercial.cjs antes da publicação comercial.
6. Definir o provedor e os preços. Integrar checkout hospedado e webhook assinado/idempotente; concessão e renovação vêm do webhook, nunca de uma flag enviada pelo cliente. Testar expiração, cancelamento, falha de pagamento e estorno.
7. Configurar canal e responsável pelo suporte. A ferramenta privada server/support.cjs permite listar solicitações, registrar respostas e encerrar atendimentos. O usuário vê as respostas na conta; não existe chat ao vivo ou notificação por e-mail de suporte nesta etapa.
8. Revisar a matriz e escolher quais páginas/personagens/localidades serão amostras públicas. Aprovar textos de privacidade, atendimento e assinatura antes de começar a coleta real.

O histórico público do repositório e versões já baixadas não se tornam secretos ao ativar a nova distribuição. Conteúdos comerciais novos devem ser mantidos em armazenamento privado desde a criação.

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
