# Revisão e organização — 01/10/2026

## Organização

A pasta externa ao repositório acumulava materiais de desenvolvimento junto ao código. Foram movidos 157 arquivos, sem exclusões, para prévias, exportações, scripts históricos, dados intermediários e pacotes. O manifesto local `work/archive/organizacao-2026-10-01.csv` registra origem e destino; todos os destinos foram conferidos. O README da raiz identifica o projeto ativo e os materiais de apoio.

O código ativo permanece em `work/valedria-github/`. O checkout `work/valedria/` contém os metadados Git desse projeto; não foi movido. Os originais das imagens, o cofre privado de testes e os caminhos do inicializador local foram preservados. Scripts arquivados não são apresentados como ferramentas atuais.

No repositório, HTML continua na raiz para preservar URLs. Comportamentos, estilos e dados permanecem em `assets`; verificações em `scripts`, `tests` e `server`; documentação em `docs`. A nova validação compartilhada de documentos fica em `assets/js/studio-documents.js`, usada pelo editor, pela demonstração e pelo servidor.

## Problemas corrigidos

- A demonstração aceitava documentos incompletos que o servidor rejeitava. Importações de campanhas, aventuras, atlas, criações e crônicas agora usam a mesma validação. Campos inválidos, IDs de documento duplicados, referências quebradas, números não finitos e propriedades inseguras são rejeitados antes da gravação.
- Salvar enquanto o usuário trocava de categoria podia atualizar a versão e o indicador de alterações da categoria errada. O salvamento agora mantém uma cópia da categoria e da conta de origem. Edições posteriores ao envio continuam pendentes.
- Importações receberam a mesma proteção: não misturam categorias, não sobrescrevem edições simultâneas e não aplicam respostas à interface de outra conta.
- Conflitos de versão recebem uma mensagem específica para exportar as alterações e reabrir o documento.
- A criação de documentos respeita o limite de 100 antes de adicionar mais itens. O exemplo da Crônica viva verifica espaço para ameaça e facção antes de alterar qualquer um dos dois grupos.
- Textos da biblioteca de demonstração continham fragmentos de montagem JavaScript e entidades HTML literais; foram corrigidos. Uma seção vazia recebeu uma orientação de leitura. A contagem fixa de localidades nessa amostra foi removida para não divergir do catálogo.
- Um nível de acesso desconhecido na biblioteca de demonstração agora bloqueia o item, de forma coerente com o servidor.

## Verificações

- 16 conjuntos de testes automatizados aprovados, incluindo novos casos de salvamento/importação durante troca de aba, edições concorrentes e troca de conta.
- 1.881 referências locais conferidas; sintaxe de 62 scripts e 44 scripts inline; 99 descrições de imagem e 674 fontes responsivas.
- Compilação pública e separação comercial conferidas: 707 caminhos protegidos fora da saída pública comercial.
- Os seis kits continuam com oito mapas cada (48 ao todo) e acessos 2/4/6. Regenerar o catálogo não altera seu conteúdo.
- Nenhuma alteração nas regras de RPG, preços, quantidades de kits ou recursos de cada assinatura.

## Desempenho e limites

O inventário de `assets` soma cerca de 273 MB de WebP, 40 MB de áudio e 2,5 MB de SVG. Esse é o acervo inteiro, não o peso de abertura de uma página. As imagens responsivas, mapas sob demanda e animação restrita ao quadro apontado foram mantidos. Os downloads de kits incorporam todos os mapas deliberadamente para permitir uso sem internet.

Esta revisão não mediu taxa de quadros, Core Web Vitals ou uso de memória em aparelhos reais. Testes automatizados não significam que todos os fluxos estejam 100% livres de erros. A avaliação visual e funcional da Crônica viva e da comparação foi feita na implementação anterior; esta revisão acrescentou regressões automatizadas às correções de persistência.

Pagamentos, e-mails e sincronização compartilhada continuam reservados à implantação futura dos serviços, conforme a decisão de manter o GitHub Pages como demonstração. Veja as [melhorias priorizadas](MELHORIAS-PRIORIDADES.md).
