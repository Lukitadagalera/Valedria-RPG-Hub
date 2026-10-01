# Revisão de código — 30/09/2026

Revisão de integração das alterações recentes, com correções e verificações automatizadas. Não equivale a uma certificação de ausência de falhas nem substitui testes de uso em todos os aparelhos.

## Correções

- A preparação comercial agora retira também os catálogos completos de demonstração da distribuição pública. Antes, o JSON dos kits podia permanecer público mesmo com seus mapas protegidos. O GitHub Pages continua deliberadamente como demonstração pública.
- Solicitações de participação permitem iniciar um segundo pedido após uma confirmação. Repetições acidentais da mesma confirmação são bloqueadas e tentativas após falha conservam a chave de identificação. Pedidos locais normalizam o e-mail para evitar duplicação por maiúsculas ou espaços.
- Mapas incorporados aos documentos de kit são carregados imediatamente para impressão; a galeria do site mantém carregamento sob demanda.
- Um nome de plano inválido não libera acidentalmente um kit. Catálogos e servidor usam a mesma política conservadora.
- A compilação resolve caminhos a partir do repositório, independentemente da pasta de execução.
- Removidas uma renderização duplicada da ficha, uma declaração redundante de estilo e a implementação antiga `world.js`, sem referências nas páginas atuais. `style-core.css` foi preservado: é importado pelo estilo principal.

## Organização e coerência

Fontes dos kits agrupadas em `scripts/kits/`, mantendo `scripts/refresh-session-kits.py` como entrada. O catálogo gerado permaneceu idêntico após regeneração. A integração do GitHub passou a conferir essa igualdade. Arquivos temporários de Python são ignorados.

HTML permanece na raiz para preservar os endereços publicados. Estilos, comportamentos, dados, imagens e áudio permanecem em suas pastas de `assets`; testes em `tests` e `server`; documentação em `docs`. Não foram movidos recursos apenas por não aparecerem literalmente no HTML: vários são usados por catálogos e seleção responsiva.

Documentação atualizada para WebP e para as quatro faixas de conteúdo. Visitante e cadastro sem assinatura têm o mesmo acesso. Os seis kits mantêm a distribuição de dois para Contador, quatro para Mestre e seis para Deus das Lendas, com doze mapas no total. Os testes conferem essa matriz, os recursos da ficha e o orçamento de atributos por nível.

## Evidências

- 14 de 14 suítes automatizadas aprovadas, incluindo conta, servidor, ficha, kits e solicitações de campanha.
- 1.838 referências de arquivos conferidas, incluindo imagens nos catálogos JSON.
- Distribuição comercial verificada com 671 caminhos protegidos e permissões dos doze mapas.
- Referências, sintaxe, identificadores HTML e texto alternativo verificados pelos scripts existentes.
- Regeneração dos kits sem diferença no catálogo publicado; verificação de espaços e integridade UTF-8 concluídas.

## Desempenho e limites

A revisão estática confirmou mapas sob demanda na galeria, imagens responsivas e áudio sem pré-carregamento. A animação continua restrita ao quadro apontado, com uma passagem por entrada e respeito à preferência de movimento reduzido. O tamanho total da biblioteca não representa o volume transferido ao abrir cada página.

Não foi feita medição nova de taxa de quadros ou teste em todos os navegadores nesta revisão. A qualidade dos mapas e o equilíbrio narrativo ainda se beneficiam de partidas reais; testes de código não comprovam esses aspectos.

Hospedagem privada, entrega real de e-mails, pagamentos e atendimento compartilhado continuam dependendo dos serviços futuros, conforme a decisão de manter a demonstração no GitHub. Consulte `CONTA-E-LANCAMENTO.md` para ativação. A documentação de 29/09 deve ser lida como registro histórico.
