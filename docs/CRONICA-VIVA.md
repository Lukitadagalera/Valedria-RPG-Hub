# Crônica viva — Deus das Lendas

Ferramenta exclusiva em Área do Mestre → Campanhas e oficina → Crônica viva. O botão nos kits também cria uma crônica vinculada ao nome da aventura. Não acrescenta bônus aos dados nem muda regras de combate.

## Fluxo de uso

1. Crie uma crônica ou abra um kit e escolha **Conduzir na Crônica viva**.
2. Adicione ameaças com 2 a 12 etapas. Escreva a consequência privada e escolha quais avançam automaticamente ao encerrar a sessão. Os botões de etapa permitem ajustar o progresso durante o jogo.
3. Registre facções, seus objetivos privados e a relação narrativa de −3 (hostil) a +3 (leal).
4. Escreva o resumo público e as decisões privadas. Encerrar a sessão arquiva esses textos e avança uma etapa nas ameaças automáticas, sem ultrapassar seus limites. O mestre decide o efeito narrativo de uma ameaça concluída.
5. É possível desfazer o último avanço até a próxima edição da crônica. Use **Salvar na minha conta** para persistir. Exporte JSON para cópia/importação, HTML privado para leitura ou resumo dos jogadores sem segredos.

Limites: 100 crônicas por conta, 100 ameaças, 100 facções e 100 sessões arquivadas por crônica. Ao completar um volume, exporte-o e crie outro. A exportação pública contém apenas nomes e indicadores revelados e resumos públicos; não contém consequências, objetivos, notas privadas nem registros de avanço privados.

## Persistência e acesso

No GitHub Pages, o modo de demonstração salva neste navegador, separado por conta. Com os serviços hospedados, usa a mesma API de documentos, com controle de versão e autorização Deus das Lendas no servidor. Expirar ou reduzir o plano bloqueia o acesso sem apagar documentos.

## Organização

- `assets/js/living-chronicle.js`: modelo, validação compartilhada pelo navegador/servidor, avanço, desfazer e seleção dos dados públicos.
- `assets/js/chronicle-view.js`: editor e exportação HTML, com texto escapado.
- `assets/js/master-studio.js`: integração com documentos, kits e controles da Área do Mestre.
- `assets/js/plan-comparison.js` e `assets/css/plan-comparison.css`: comparação única usada em Minha Conta e Área do Mestre, incluindo os acréscimos de cada plano e 2/4/6 kits (16/32/48 mapas).

Validação: testes de avanço e limites, desfazer, exportação sem segredos, texto escapado, persistência de demonstração, restrições por plano, expiração e conflito de versões. Conferência no navegador: criar, editar, avançar, desfazer, salvar e reabrir; comparação nos temas claro/escuro e em largura de 390 px.
