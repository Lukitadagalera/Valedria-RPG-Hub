# Imagens da página inicial



Coloque cada imagem na pasta indicada, mantendo o nome e a extensão `.webp`. O espaço reservado desaparece automaticamente quando o arquivo é carregado. Não é preciso alterar o HTML. As dimensões abaixo são referências de composição, não um limite para reduzir originais de maior resolução. As capas devem incluir o numeral e o título como na referência. Paisagens e retratos devem vir sem texto.



- `assets/img/home/capa-geografia.webp` — Capa · Geografia — 660 × 860 px

- `assets/img/home/capa-sistema.webp` — Capa · Sistema — 660 × 860 px

- `assets/img/home/capa-magia.webp` — Capa · Magia — 660 × 860 px

- `assets/img/home/capa-bestiario.webp` — Capa · Bestiário — 660 × 860 px

- `assets/img/home/jogador-1.webp` — Retrato 1 — 480 × 600 px

- `assets/img/home/jogador-2.webp` — Retrato 2 — 480 × 600 px

- `assets/img/home/jogador-3.webp` — Retrato 3 — 480 × 600 px

- `assets/img/home/hero-valedria.webp` — Paisagem de Valédria — 2400 × 740 px, paisagem sem texto

- `assets/img/home/cronicas-valedria.webp` — Estrada das Crônicas — 1600 × 460 px, floresta e estrada sem texto

- `assets/img/home/brasao-1.webp` — Brasão ilustrativo 1 — 160 × 180 px, fundo transparente

- `assets/img/home/brasao-2.webp` — Brasão ilustrativo 2 — 160 × 180 px, fundo transparente

- `assets/img/home/brasao-3.webp` — Brasão ilustrativo 3 — 160 × 180 px, fundo transparente



## Símbolos da referência



Usar arte dourada com fundo transparente, 160 × 160 px.

- `assets/img/home/simbolo-sistema.webp`

- `assets/img/home/simbolo-magia.webp`

- `assets/img/home/simbolo-bestiario.webp`

- `assets/img/home/simbolo-mapa.webp`

- `assets/img/home/marca-valedria.webp` — Rosa dos ventos dourada da marca, 160 × 160 px, transparente.





## Capas restantes

- `assets/img/home/capa-sociedade.webp` — Sociedade; capa vertical 660 × 860 px, com título e numeral.

- `assets/img/home/capa-economia.webp` — Economia; capa vertical 660 × 860 px, com título e numeral.

- `assets/img/home/capa-faccoes.webp` — Facções; capa vertical 660 × 860 px, com título e numeral.

- `assets/img/home/capa-racas.webp` — Raças; capa vertical 660 × 860 px, com título e numeral.

- `assets/img/home/capa-aura.webp` — Aura; capa vertical 660 × 860 px, com título e numeral.

- `assets/img/home/capa-artefatos.webp` — Artefatos; capa vertical 660 × 860 px, com título e numeral.

- `assets/img/home/capa-exploracao.webp` — Clima, Viagem e Encontros; capa vertical 660 × 860 px, com título e numeral.

- `assets/img/home/capa-mestre.webp` — Livro do Mestre; capa vertical 660 × 860 px, com título e numeral.

- `assets/img/home/capa-mapa.webp` — Mapa e Aventuras; capa vertical 660 × 860 px, com título e numeral.



## Arte de fundo

- `assets/img/decoracao/fundo-ornamental.webp` — 2400 × 1800 px. Arabescos botânicos dourados delicados, inspirados em tapeçaria de castelo, concentrados nas laterais. Centro livre e fundo transparente. A arte fica discreta atrás do conteúdo, sem movimento para preservar a leitura.



- `assets/img/home/jogador-4.webp`: retrato do quarto herói, da raça demoníaca.

- `assets/img/home/brasao-4.webp`: brasão do quarto herói.



## Exportação de alta qualidade



Os tamanhos acima são referências de composição, não limites para os arquivos mestres. Preserve os originais fora do repositório. O script `scripts/restore-image-quality.py`, executado a partir da raiz com Pillow, recupera esses originais de `../originais-png` ou `../image-originals`, limita o lado maior a 2560 px sem ampliar e exporta WebP com qualidade 92. Variantes de 480, 960, 1440 e 1920 px usam qualidade 90. HTML e manifesto responsivo selecionam a resolução adequada à tela. Evite recomprimir um WebP já reduzido; isso não recupera detalhes perdidos.
