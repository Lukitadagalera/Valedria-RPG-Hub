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
    button.disabled = false;
    button.textContent='Registrar interesse (teste)';
    status.textContent = 'Modo de teste: seu pedido será salvo somente neste navegador. Nenhuma mensagem será enviada à administração.';
  }
  let sending = false;
  let submitted = false;
  let requestId;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    if(!endpoint){try{const values=Object.fromEntries(new FormData(form));const key='valedria-campaign-requests-v1';const saved=JSON.parse(localStorage.getItem(key)||'[]');if(!Array.isArray(saved))throw Error('invalid');const duplicate=saved.some(x=>x.email===values.email&&x.mesa===values.mesa&&x.papel===values.papel);if(!duplicate)saved.push({...values,id:crypto.randomUUID(),created:Date.now()});localStorage.setItem(key,JSON.stringify(saved));success.querySelector('h3').textContent=duplicate?'Interesse já registrado neste navegador':'Interesse registrado neste navegador';success.querySelector('p').textContent='Pedido de teste para '+(form.elements.mesa.selectedOptions[0].textContent)+'. A participação ainda depende da confirmação do mestre. Nenhuma vaga foi ocupada e nenhum e-mail foi enviado.';form.hidden=true;success.hidden=false;success.focus();}catch{status.textContent='Não foi possível salvar neste navegador. Seus dados continuam no formulário.';}return;}
    if(submitted)return;
    sending = true;
    button.disabled = true;
    status.textContent = 'Enviando sua solicitação…';
    const values = new FormData(form);
    const payload = {};
    for (const name of ['nome', 'email', 'discord', 'papel', 'horario', 'descricao', 'mesa']) payload[name] = String(values.get(name) || '').trim();
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
