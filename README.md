# Valédria — Códice do Mundo

## Organização

- HTML na raiz: entradas públicas e redirecionamentos antigos. Preservados para não quebrar favoritos, busca e links publicados.
- `assets/css/`: todos os estilos globais e de funcionalidades.
- `assets/js/`: comportamentos do site, ficha, conta, navegação, imagens e áudio.
- `assets/data/`: fontes de conteúdo, regras compartilhadas, matriz de acesso e índices gerados.
- `assets/demo/`: amostras públicas da demonstração.
- `assets/img/`: imagens e variantes WebP separadas por assunto.
- `assets/audio/`: trilhas e relatos, carregados sob demanda.
- `models/`, `controllers/` e `routes/`: modelos Mongoose, lógica de requisição e mapeamento das rotas Express.
- `config/`: conexão MongoDB e configuração Passport.
- `scripts/`: watcher de desenvolvimento, validações, geração de índices e utilitários de manutenção.
- `tests/`: testes da demonstração, conta, recorte, animação e consistência das regras.
- `server/`: API privada e testes de integração colocados junto aos módulos que exercitam.
- `docs/`: decisões, licenças, integrações e relatórios de revisão.

## Verificar e executar

Requer Node.js 20.19 ou posterior. A API privada usa MongoDB; os testes de integração usam um MongoDB temporário.

- `npm run dev`: serve diretamente a raiz do projeto, recarrega páginas abertas após alterações em HTML/CSS/JS e reinicia o Express após alterações no backend. Abre `http://localhost:3000/login.html` (respeita `PORT` quando definido); o servidor fica vinculado a `localhost`.
- `npm test`: executa verificações de referências, sintaxe, regras e os testes de funcionalidades e servidor.
- `npm start`: serve a raiz do projeto e inicia a API depois de preencher as variáveis do `.env` e disponibilizar o MongoDB.

O servidor Express serve os HTML da raiz e os assets diretamente de `assets/`. Não há pasta de distribuição ou etapa de build. O login Google valida a credencial no servidor Express e salva o usuário no MongoDB; após sucesso, direciona para `conta.html`. O fluxo Passport opcional cria sessão MongoDB para endpoints que exigem autenticação. Consulte [cadastro e lançamento](docs/CONTA-E-LANCAMENTO.md).

## Editar os kits

As fontes dos seis kits ficam em `scripts/kits/`: `build.py` reúne a base, `continuations.py` amplia as aventuras e `masks.py` compõe o sexto kit. `locations.py` vincula os mapas de cada local às cenas. Consulte o [inventário dos mapas](docs/MAPAS-DOS-KITS.md). Execute `python scripts/refresh-session-kits.py` para atualizar `assets/demo/studio.json`; não edite esse catálogo gerado diretamente. A verificação do GitHub confere se fontes e catálogo estão sincronizados.

[Revisão atual — 01/10/2026](docs/AUDITORIA-2026-10-01.md). Consulte também as [melhorias priorizadas](docs/MELHORIAS-PRIORIDADES.md) e a [Crônica viva](docs/CRONICA-VIVA.md). As auditorias de [30/09](docs/AUDITORIA-2026-09-30.md) e [29/09](docs/AUDITORIA-2026-09-29.md) registram estados anteriores.

A validação dos documentos do estúdio é compartilhada em `assets/js/studio-documents.js`. Alterações nesse modelo devem ser verificadas tanto nos testes da demonstração quanto nos testes do servidor.
