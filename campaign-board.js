(() => {
  const data = window.VALEDRIA_MESAS || {};
  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  function contact(card, value) {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || !['discord.gg', 'discord.com', 'www.discord.com'].includes(url.hostname)) return;
      const link = el('a', 'Conversar no Discord', 'btn-primary');
      link.href = url.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      card.append(link);
    } catch {}
  }
  const campaigns = (Array.isArray(data.campanhas) ? data.campanhas : []).filter(item =>
    item && item.nome && Number.isInteger(item.jogadores) && Number.isInteger(item.limite) &&
    item.jogadores >= 0 && item.limite > 0 && item.jogadores <= item.limite);
  function renderCampaigns() {
    const board = document.getElementById('campaign-board');
    board.replaceChildren();
    const visible = campaigns.filter(item => document.getElementById('campaign-filter').value === 'todas' || item.jogadores < item.limite);
    document.getElementById('campaign-count').textContent = `${visible.length} ${visible.length === 1 ? 'mesa anunciada' : 'mesas anunciadas'}`;
    if (!visible.length) board.append(el('p', 'Nenhuma mesa anunciada por aqui ainda. Envie seu interesse abaixo para a administração ajudar a reunir seu grupo.', 'board-empty'));
    visible.forEach(item => {
      const card = el('article', '', 'board-card');
      const vacancies = item.limite - item.jogadores;
      card.append(el('h3', item.nome), el('p', `Mestre: ${item.mestre || 'A informar'}`),
        el('p', `${item.jogadores} / ${item.limite} jogadores · ${vacancies ? `${vacancies} ${vacancies === 1 ? 'vaga' : 'vagas'}` : 'Mesa completa'}`),
        el('p', `Quando: ${item.horario || 'A combinar'}`), el('p', item.descricao));
      contact(card, item.discord);
      board.append(card);
    });
  }
  function renderPeople(key, id, empty) {
    const board = document.getElementById(id);
    const people = (Array.isArray(data[key]) ? data[key] : []).filter(item => item && item.nome);
    if (!people.length) board.append(el('p', empty, 'board-empty'));
    people.forEach(item => {
      const card = el('article', '', 'board-card');
      card.append(el('h3', item.nome), el('p', `Disponibilidade: ${item.horario || 'A combinar'}`), el('p', item.descricao));
      contact(card, item.discord);
      board.append(card);
    });
  }
  document.getElementById('campaign-filter').addEventListener('change', renderCampaigns);
  renderCampaigns();
  renderPeople('mestres', 'gm-board', 'Nenhum mestre anunciado ainda. Tem uma história para conduzir? Apresente sua ideia e reúna uma mesa.');
  renderPeople('jogadores', 'player-board', 'Nenhum jogador anunciado ainda. Conte quando pode jogar e que aventuras gostaria de viver.');
})();
