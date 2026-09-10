(() => {
  const config = window.VALEDRIA_CONEXOES || {};
  for (const kind of ['discord', 'instagram', 'suporte', 'pacotes']) {
    let url;
    try { url = new URL(config[kind]); } catch { continue; }
    if (url.protocol !== 'https:') continue;
    if (kind === 'discord' && !['discord.gg', 'discord.com', 'www.discord.com'].includes(url.hostname)) continue;
    document.querySelectorAll(`[data-external="${kind}"]`).forEach(link => {
      link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.hidden = false;
    });
    document.querySelectorAll(`[data-external-pending="${kind}"]`).forEach(item => item.hidden = true);
    if (kind === 'discord') {
      document.querySelectorAll('[data-discord="servidor"]').forEach(link => {
        link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.hidden = false;
      });
      document.querySelectorAll('[data-pending="servidor"]').forEach(item => item.hidden = true);
    }
  }
})();
