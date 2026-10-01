# Valédria — Códice do Mundo

## Organização

- HTML na raiz: entradas públicas e redirecionamentos antigos. Preservados para não quebrar favoritos, busca e links publicados.
- `assets/css/`: todos os estilos globais e de funcionalidades.
- `assets/js/`: comportamentos do site, ficha, conta, navegação, imagens e áudio.
- `assets/data/`: fontes de conteúdo, regras compartilhadas, matriz de acesso e índices gerados.
- `assets/demo/`: amostras públicas da demonstração.
- `assets/img/`: imagens e variantes WebP separadas por assunto.
- `assets/audio/`: trilhas e relatos, carregados sob demanda.
- `scripts/`: compilação, validações, índices e utilitários de manutenção.
- `tests/`: testes da demonstração, conta, recorte, animação e consistência das regras.
- `server/`: API privada e testes de integração colocados junto aos módulos que exercitam.
- `docs/`: decisões, licenças, integrações e relatórios de revisão.
- `dist/`: saída gerada e ignorada pelo Git. Nunca editar diretamente.

## Verificar e executar

Requer Node 24 ou posterior para os testes com SQLite.

- `npm run build`: atualiza as fontes derivadas e gera `dist`.
- `npm test`: executa verificações de referências, sintaxe, regras e os testes de funcionalidades e servidor.
- `node scripts/verify-commercial.cjs`: verifica a separação de arquivos privados em uma pasta temporária e restaura a compilação pública ao terminar. Não executar simultaneamente com outro build.
- `python -m http.server 4184 --bind 127.0.0.1 --directory dist`: prévia local.
- Abra `http://127.0.0.1:4184/conta.html?demo=1` para testar sem serviços externos.

O GitHub Pages publica a raiz da branch `main`. A demonstração não recebe pagamentos nem envia e-mails reais. Consulte [cadastro e lançamento](docs/CONTA-E-LANCAMENTO.md) antes de ativar a operação comercial.

## Editar os kits

As fontes dos seis kits ficam em `scripts/kits/`: `build.py` reúne a base, `continuations.py` amplia as aventuras e `masks.py` compõe o sexto kit. Execute `python scripts/refresh-session-kits.py` para atualizar `assets/demo/studio.json`; não edite esse catálogo gerado diretamente. A verificação do GitHub confere se fontes e catálogo estão sincronizados.

[Revisão atual — 30/09/2026](docs/AUDITORIA-2026-09-30.md). A [auditoria de 29/09](docs/AUDITORIA-2026-09-29.md) registra o estado anterior do projeto.
