(() => {
  const form = document.getElementById('notice-form');
  const button = document.getElementById('send-request');
  const status = document.getElementById('request-status');
  const success = document.getElementById('request-success');
  let endpoint;
  try {
    endpoint = new URL(window.VALEDRIA_CONEXOES?.solicitacoesEndpoint);
    if (endpoint.protocol !== 'https:') endpoint = null;
  } catch { endpoint = null; }
  if (!endpoint) {
    button.disabled = true;
    status.textContent = 'O recebimento de solicitações está em preparação. Assim que o canal da administração estiver disponível, você poderá enviar seu pedido por aqui.';
  }
  let sending = false;
  let submitted = false;
  let requestId;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!endpoint || sending || submitted || !form.reportValidity()) return;
    sending = true;
    button.disabled = true;
    status.textContent = 'Enviando sua solicitação…';
    const values = new FormData(form);
    const payload = {};
    for (const name of ['nome', 'email', 'discord', 'papel', 'horario', 'descricao']) payload[name] = String(values.get(name) || '').trim();
    // A mesma tentativa mantém sua chave em caso de timeout para evitar e-mails duplicados.
    requestId ||= crypto.randomUUID();
    payload.requestId = requestId;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint.href, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload), signal: controller.signal, credentials: 'omit'
      });
      const result = await response.json();
      if (!response.ok || result.emailSent !== true) throw new Error('Unconfirmed delivery');
      submitted = true;
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch {
      status.textContent = 'Não foi possível confirmar o envio. Seus dados foram mantidos; tente novamente em instantes.';
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = submitted;
    }
  });
  form.addEventListener('input', () => { if (!sending) requestId = undefined; });
})();
