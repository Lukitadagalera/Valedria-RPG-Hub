# Auditoria do Códice de Valédria — 29/09/2026

## Conclusão

O site funciona como demonstração e acervo navegável. Não está pronto para uma operação comercial real nem para ser declarado um sistema de RPG mecanicamente completo. Os testes aprovados cobrem cenários definidos; não representam 100% de cobertura de código, de dispositivos ou de todas as combinações de uso.

## Organização realizada

32 arquivos soltos de CSS e JavaScript foram transferidos para `assets/css` e `assets/js`. As referências foram atualizadas em páginas, carregadores dinâmicos, compilação comercial, testes e documentação. Os quatro testes antes misturados aos geradores foram colocados em `tests`, que recebeu também a comparação das regras. Os testes de integração do servidor continuam junto a seus módulos por usarem essas dependências diretamente.

As páginas HTML e os redirecionamentos continuam na raiz intencionalmente: são os endereços publicados no GitHub Pages. O arquivo de entrada da compilação, package.json, README e favicon também têm função nessa posição. Não foi criada uma árvore de páginas que quebraria endereços já compartilhados.

## Correções confirmadas

- O endereço antigo da Guilda usava `#guilda`, mas o destino não tinha esse identificador. O título correto agora o possui.
- A fórmula de Vida estava implementada na ficha, mas não explicada no livro de Sistema. O livro passou a registrar a mesma regra: 5 + 2 × Constituição.
- O livro esclarece que restaurar recursos na ficha registra uma recuperação autorizada pelo mestre, sem conceder cura ou descanso automáticos.
- Links com fragmentos malformados deixaram de interromper o auxiliar de navegação.
- A documentação de desempenho estava desatualizada: agora descreve o efeito limitado ao quadro sob o mouse.
- Criados comandos únicos de verificação e testes, incluindo sintaxe dos scripts internos do HTML e as referências das imagens responsivas.

## Evidências e limites dos testes

Verificações automatizadas: 1.800 referências locais, 54 scripts de assets, 45 scripts internos de HTML, quatro arquivos JSON, 99 imagens estáticas com descrição, 674 fontes responsivas e IDs HTML sem duplicação. As fontes responsivas incluem arquivos principais e variantes; não são 674 downloads por página.

Resultado final: **10/10 suítes aprovadas**. A verificação separada da compilação comercial conferiu **652 caminhos protegidos**, sem arquivos privados correspondentes na saída pública; a demonstração foi recompilada ao terminar. A automação Verify site executa build, testes e essa separação em pushes para main e pull requests. Ela é uma verificação adicional; o fluxo de GitHub Pages permanece separado.

Suítes: cadastro/confirmação/recuperação, sessão e revogação, CSRF e origem, níveis de assinatura, isolamento de contas, suporte, preferências, documentos e conflitos de versão, conteúdo privado, recorte de imagens e exclusividade da animação por quadro. A nova suíte de regras compara Vida, orçamento de atributos, 21 perícias, cinco perícias de Força, progressão de Mana nos níveis 1/5/10, custos de Aura e a matriz de acesso.

No navegador foram abertas as páginas principais e os livros canônicos, nos temas claro e escuro. Foram conferidos a navegação da ficha, abertura do catálogo de equipamentos e a prévia de impressão com duas páginas. A busca por “mana” retornou 86 resultados. Em largura de 390 px, início, assinatura, ficha, Sistema e mapa não apresentaram transbordamento horizontal da página. A inspeção não apontou erros de console nas navegações verificadas. Imagens vazias do diálogo de ampliação não foram tratadas como arquivos quebrados.

Não foram certificados: impressão física, todas as imagens carregadas ao longo de todas as rolagens, todos os modelos de celular, Safari/Firefox, estabilidade de horas de sessão, recuperação de backup em produção, latência real da hospedagem, métricas de FPS/Core Web Vitals ou teste de carga concorrente. Estes itens continuam na validação de lançamento.

## Desempenho

Inventário local aproximado: WebP 240,3 MiB; MP3 85,2 MiB; WAV 13,3 MiB; SVG 2,5 MiB; JPEG 2,1 MiB. Esse é o acervo inteiro, não o peso de uma visita. As imagens usam variantes, decodificação assíncrona e carregamento por proximidade. Músicas e relatos usam `preload="none"`. O efeito decorativo só roda no quadro sob o mouse e pausa fora dele/ao ocultar a aba.

O maior arquivo é Dewdrop Fantasy, com 64,0 MiB. Ele não é transferido automaticamente na entrada do site, mas continua sendo um candidato importante para uma versão de áudio comprimida destinada a streaming. Não foi reencodificado nesta revisão: preservar a duração e auditar a qualidade de uma versão menor exige conversão e comparação de áudio. Não foi reduzida a qualidade das imagens para disfarçar esse peso.

A revisão estrutural e de carregamento não permite prometer ausência de engasgos em todo computador. Antes do lançamento, medir LCP/INP/CLS em produção, rede móvel e um computador modesto, inclusive com áudio em execução.

## Funcionalidades ainda dependentes de serviços

| Área | Situação real |
| --- | --- |
| Cadastro, e-mail e recuperação | Fluxos simulados no GitHub; API preparada, provedor e hospedagem pendentes. |
| Assinatura | Troca de plano fictícia; faltam preços, checkout, webhook, renovação, estorno e comprovantes. |
| Atendimento | Conversas locais na demonstração; API/operador preparados; falta operação real. Não é chat ao vivo. |
| Comunidade e pedidos de mesa | URLs externas e endpoint de recebimento ainda vazios; envio fica desabilitado e informado. |
| Ficha do jogador | Armazenamento no navegador e JSON; não sincroniza automaticamente entre dispositivos. |
| Painel compartilhado | Na demonstração, a partilha funciona no mesmo navegador; colaboração real depende do servidor. |
| Conteúdo por plano | Matriz por capítulo; falta decidir cada personagem/localidade que será amostra pública. |
| Materiais prometidos | Curadoria final dos kits, campanhas completas e livro digital de presente precisa corresponder ao acervo entregue no lançamento. |

As credenciais de teste são públicas de propósito e não representam uma barreira comercial. Arquivos que já foram publicados no histórico do GitHub não se tornam secretos retroativamente.

## Regras e mecanismos do RPG

### Prioridade alta — definir antes de fechar o sistema

1. **Defesa e equipamento:** o Sistema manda comparar o ataque à Defesa, mas não define a fórmula da Defesa do jogador. Armas e armaduras ainda usam categorias qualitativas, sem uma tabela geral aprovada de dado de dano e bônus numéricos. O Bestiário informa Defesa/Vida, mas várias criaturas não têm uma ficha de ataque completa.
2. **Turnos:** definir ação, movimento, reação, limites por turno, duração da rodada, desempate de iniciativa, alcance e terreno. Técnicas mencionam ações extras/adjacência sem uma base comum suficiente.
3. **Zero de Vida, morte e cura:** definir queda, estabilização, recuperação, descanso e custo/tempo de cura. A perícia Medicina menciona estabilização sem fechar o procedimento básico.
4. **Condições:** exaustão, queda, imobilização e outros efeitos precisam de duração, recuperação e regras comuns. Há descrições localizadas, mas não um glossário mecânico completo.
5. **Progressão marcial:** o livro de Aura concede bônus por grau além da progressão comum; a ficha não tem um campo separado para registrar esses bônus e sua origem. A regra de distribuição precisa ficar explícita antes de automatizar.

### Prioridade média — melhorar a experiência de mesa

- Rolador de dados com vantagem/desvantagem e histórico, baseado nas regras de Valédria.
- Defesa, ataques, condições e magias/técnicas conhecidas na ficha, após fechar os valores acima.
- Registro de moedas e consumo de suprimentos; inventário atual não equivale a um controle completo de carga.
- Progressão por marcos ou experiência explicitada; estabelecer quando o mestre concede níveis e graus.
- Procedimentos de exploração, interlúdio entre aventuras e recuperação de recursos consolidados em um guia rápido.

Já existem iniciativas/condições no painel de campanha, inventário coletivo, caderno, geradores, tabelas de viagem e clima. Portanto não é necessário reconstruir essas ferramentas: falta conectá-las a definições completas e consistentes.

### Comparação usada

As regras oficiais de [D&D — Playing the Game](https://www.dndbeyond.com/sources/dnd/br-2024/playing-the-game) foram consultadas como lista de verificação para ações, dano, descanso e condições. A estrutura de [Pathfinder — Rules Overview](https://2e.aonprd.com/Rules.aspx?ID=2266) serviu como referência para distinguir encontro, exploração e interlúdio. São referências de cobertura, não regras adotadas por Valédria. Não foram copiados valores, classes ou mecânicas incompatíveis com o sistema próprio.

## Próxima etapa recomendada

Aprovar primeiro um núcleo curto de combate e recuperação. Depois implementar os campos e automações da ficha a partir dessa mesma fonte de regras e ampliar os testes. Contratar serviços e definir a curadoria comercial são frentes separadas; não exigem alterar a identidade visual nem tornar o site fechado na entrada.
