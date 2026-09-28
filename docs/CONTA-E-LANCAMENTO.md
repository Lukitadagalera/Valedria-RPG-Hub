# Cadastro e lançamento comercial

## O que está pronto
- Página Minha conta: dados pessoais básicos, acesso e segurança, atendimento, conversas abertas/encerradas e assinatura.
- API com sessão em cookie HttpOnly, CSRF, confirmação de e-mail, senha derivada com scrypt e limites de tentativa.
- Perfil e histórico de suporte persistidos no banco privado. Cada conversa pertence à conta que a abriu.
- Troca de senha revoga sessões. Botão para encerrar as demais sessões.
- Cinco níveis: visitante, cadastro gratuito, Contador de Histórias, Mestre das Aventuras, Deus das Lendas.
- Matriz inicial revisável em assets/data/access-policy.json. É uma proposta de distribuição por capítulos, ainda não uma curadoria final de cada personagem/localidade.

## Publicação atual
O GitHub Pages continua sendo uma demonstração pública. A página de conta informa que o cadastro está em preparação e não envia nem armazena dados pessoais. Nenhuma cobrança é processada. Os capítulos completos da demonstração continuam públicos enquanto não for ativada a distribuição protegida. Ocultar textos por CSS/JavaScript não seria proteção comercial.

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
A ficha oferece prévia antes de imprimir, duas seções de páginas em A4, retratos, recursos e espaços de escrita. Para PDF use o destino Salvar como PDF do navegador; desative os cabeçalhos/rodapés do navegador para não incluir URL e data. Conteúdo extenso pode ocupar páginas extras.
As imagens foram reprocessadas dos originais externos: WebP 92 nos arquivos maiores, 90 nas variantes, até 2560px, e seleção responsiva 480/960/1440/1920. Não são ampliadas artificialmente. Os originais não entram no site publicado.
