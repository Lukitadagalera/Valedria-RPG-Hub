(() => {
  'use strict';
  const form = document.getElementById('notice-form');
  const button = document.getElementById('send-request');
  const status = document.getElementById('request-status');
  const success = document.getElementById('request-success');
  if (!form || !button || !status || !success) return;
  let endpoint;
  try {
    endpoint = new URL(window.VALEDRIA_CONEXOES?.solicitacoesEndpoint);
    if (endpoint.protocol !== 'https:') endpoint = null;
  } catch { endpoint = null; }
  const demoNotice = 'Modo de teste: seu pedido será salvo somente neste navegador. Nenhuma mensagem será enviada à administração.';
  if (!endpoint) {
    button.disabled = false;
    button.textContent = 'Registrar interesse (teste)';
    status.textContent = demoNotice;
  }
  let sending = false;
  let submitted = false;
  let requestId;
  function resetAttempt() {
    if (sending) return;
    requestId = undefined;
    submitted = false;
    button.disabled = false;
    status.textContent = endpoint ? '' : demoNotice;
  }
  form.addEventListener('input', resetAttempt);
  form.addEventListener('change', resetAttempt);
  // The board changes the selected table programmatically, without an input event.
  form.addEventListener('campaign-request-open', resetAttempt);
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || submitted || !form.reportValidity()) return;
    const values = new FormData(form);
    const payload = {};
    for (const name of ['nome', 'email', 'discord', 'papel', 'horario', 'descricao', 'mesa']) {
      payload[name] = String(values.get(name) || '').trim();
    }
    payload.email = payload.email.toLowerCase();
    if (!endpoint) {
      try {
        const key = 'valedria-campaign-requests-v1';
        const saved = JSON.parse(localStorage.getItem(key) || '[]');
        if (!Array.isArray(saved)) throw Error('Invalid saved requests');
        const duplicate = saved.some(x => String(x.email || '').trim().toLowerCase() === payload.email && x.mesa === payload.mesa && x.papel === payload.papel);
        if (!duplicate) saved.push({...payload, id: crypto.randomUUID(), created: Date.now()});
        localStorage.setItem(key, JSON.stringify(saved));
        success.querySelector('h3').textContent = duplicate ? 'Interesse já registrado neste navegador' : 'Interesse registrado neste navegador';
        success.querySelector('p').textContent = 'Pedido de teste para ' + form.elements.mesa.selectedOptions[0].textContent + '. A participação ainda depende da confirmação do mestre. Nenhuma vaga foi ocupada e nenhum e-mail foi enviado.';
        form.hidden = true;
        success.hidden = false;
        success.focus();
      } catch {
        status.textContent = 'Não foi possível salvar neste navegador. Seus dados continuam no formulário.';
      }
      return;
    }
    sending = true;
    form.setAttribute('aria-busy', 'true');
    button.disabled = true;
    status.textContent = 'Enviando sua solicitação…';
    // Retries retain their ID until the user changes the request.
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
      if (!response.ok || result.emailSent !== true) throw Error('Unconfirmed delivery');
      submitted = true;
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch {
      status.textContent = 'Não foi possível confirmar o envio. Seus dados foram mantidos; tente novamente em instantes.';
    } finally {
      clearTimeout(timeout);
      sending = false;
      form.removeAttribute('aria-busy');
      button.disabled = submitted;
    }
  });
})();
