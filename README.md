# Valédria — Códice do Mundo

## Organização

- Páginas HTML na raiz: endereços públicos existentes, mantidos para preservar links e favoritos.
- `assets/css/`: estilos globais; estilos específicos de recursos continuam em `assets/`.
- `assets/js/`: scripts globais e de páginas; módulos específicos ficam em `assets/`.
- `assets/data/`: conteúdo estruturado e índice de busca.
- `assets/img/`: imagens WebP por assunto; personagens secundários em `npcs/`.
- `assets/audio/`: músicas licenciadas e relatos dos heróis.
- `docs/`: documentação, integrações e licenças.
- `scripts/`: geração de conteúdo e busca.
- `server/`: serviço de acesso do Mestre.
- `dist/`: saída local da compilação, não versionada.

## Conferir alterações

Execute `npm run build`. Para uma prévia, sirva a pasta raiz ou a pasta `dist/` com um servidor HTTP. O GitHub Pages publica a raiz da branch `main`; preserve os caminhos públicos e revise links ao mover arquivos.
