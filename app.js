/* app.js — comportamento compartilhado do Códice de Valédria
   (tema claro/escuro, menu mobile, imagens com placeholder) */
(function () {
  var root = document.documentElement;
  var toggles = Array.prototype.slice.call(document.querySelectorAll('[data-theme-toggle]'));

  /* O tema escolhido é salvo em um cookie (persiste em qualquer navegação
     real, mesmo que a URL seja reescrita pelo servidor ao abrir em uma aba
     nova) e também propagado via ?theme= nos links internos como reforço
     dentro do preview incorporado. */
  /* Leitura/escrita de cookie protegida: em algumas janelas de pre-visualizacao
     incorporada o acesso a document.cookie pode ser bloqueado pelo navegador.
     Se isso acontecer, essas funcoes simplesmente nao persistem nada (retornam
     null / nao fazem nada) em vez de lancar um erro que travaria todo o script
     abaixo — incluindo o botao de tema e o menu. */
  function getCookie(name) {
    try {
      var target = name + '=';
      var parts = document.cookie.split('; ');
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].indexOf(target) === 0) return decodeURIComponent(parts[i].slice(target.length));
      }
    } catch (e) { /* cookie indisponivel neste contexto */ }
    return null;
  }
  function setCookie(name, value, days) {
    try {
      var d = new Date(); d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + d.toUTCString() + '; path=/; SameSite=Lax';
    } catch (e) { /* cookie indisponivel neste contexto */ }
  }

  var current = 'light';
  try {
    var urlMatch = location.search.match(/theme=(dark|light)/);
    var cookieTheme = getCookie('vcodex_theme');
    current = urlMatch
      ? urlMatch[1]
      : (cookieTheme === 'dark' || cookieTheme === 'light')
        ? cookieTheme
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (e) { /* segue com o padrao 'light' */ }
  root.setAttribute('data-theme', current);
  setCookie('vcodex_theme', current, 365);

  function propagateTheme(theme) {
    try {
      document.querySelectorAll('a[href*=".html"]').forEach(function (a) {
        var href = a.getAttribute('href');
        if (!href || /^https?:\/\//.test(href)) return;
        var base = href.split('?')[0].split('#')[0];
        var hash = href.indexOf('#') > -1 ? href.slice(href.indexOf('#')) : '';
        a.setAttribute('href', base + '?theme=' + theme + hash);
      });
    } catch (e) { /* nao bloqueia o restante da pagina */ }
  }
  propagateTheme(current);
  /* Nao usamos history.replaceState aqui: reescrever a URL da aba atual
     conflita com o mecanismo de URL unica do preview e faz a pagina reiniciar. */

  function syncIcon() {
    var isDark = root.getAttribute('data-theme') === 'dark';
    var svg = isDark
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.6M12 18.9v2.6M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2.5 12h2.6M18.9 12h2.6M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.5 14.6A8.5 8.5 0 1 1 9.4 3.5a7 7 0 0 0 11.1 11.1Z"/></svg>';
    toggles.forEach(function (toggle) {
      toggle.innerHTML = svg;
      toggle.setAttribute('aria-label', isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro');
    });
  }
  syncIcon();
  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', current);
      setCookie('vcodex_theme', current, 365);
      propagateTheme(current);
      syncIcon();
    });
  });

// ============================================================
// LÓGICA DE VIDA (Calculada por Constituição: 5 base + 2 por ponto)
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  const vidaAtualInput = document.getElementById('f-vida-atual');
  const vidaMaxDisplay = document.getElementById('vida-max-display');
  const btnDano = document.getElementById('btn-vida-dano');
  const btnCura = document.getElementById('btn-vida-cura');

  // Tenta localizar o campo numérico da Constituição
  const inputCon = document.getElementById('attr-constituicao') || 
                   document.querySelector('input[data-attr="constituicao"]') ||
                   document.querySelector('input[name="constituicao"]');

  function obterConstituicao() {
    if (!inputCon) return 0;
    return parseInt(inputCon.value, 10) || 0;
  }

  function recalcularVida() {
    if (!vidaMaxDisplay || !vidaAtualInput) return;

    const con = obterConstituicao();
    const vidaMax = 5 + (con * 2);

    // Atualiza a pílula de leitura da Vida Máxima
    vidaMaxDisplay.textContent = vidaMax;

    // Garante que a Vida Atual não seja maior que a Vida Máxima
    let atual = parseInt(vidaAtualInput.value, 10) || 0;
    if (atual > vidaMax) {
      atual = vidaMax;
      vidaAtualInput.value = atual;
    }
  }

  function alterarVida(delta) {
    if (!vidaAtualInput || !vidaMaxDisplay) return;

    const vidaMax = parseInt(vidaMaxDisplay.textContent, 10) || 5;
    let atual = parseInt(vidaAtualInput.value, 10) || 0;

    atual += delta;
    if (atual > vidaMax) atual = vidaMax;
    if (atual < 0) atual = 0;

    vidaAtualInput.value = atual;
  }

  // Escutadores para os botões de - e +
  if (btnDano) btnDano.addEventListener('click', function () { alterarVida(-1); });
  if (btnCura) btnCura.addEventListener('click', function () { alterarVida(1); });

  // Validação se o jogador digitar a Vida Atual manualmente
  if (vidaAtualInput) {
    vidaAtualInput.addEventListener('change', function () { alterarVida(0); });
  }

  // Atualiza a Vida Máxima sempre que alterar a Constituição
  if (inputCon) {
    inputCon.addEventListener('input', recalcularVida);
    inputCon.addEventListener('change', recalcularVida);
  }

  // Executa uma vez ao carregar a página
  recalcularVida();
});

  var menuToggle = document.querySelector('[data-menu-toggle]');
  var scrim = document.querySelector('[data-nav-scrim]');
  function closeMenu() { document.body.classList.remove('nav-open'); }
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
    });
  }
  if (scrim) scrim.addEventListener('click', closeMenu);
  document.querySelectorAll('.sidebar .nav-link').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  /* Placeholder automático: qualquer <img data-slot> sem arquivo real recebe .is-broken
     e o CSS mostra o quadro tracejado com o nome do arquivo esperado. Quando você salvar
     a imagem final no caminho indicado, ela substitui o placeholder sem editar HTML. */
  document.querySelectorAll('.img-slot img').forEach(function (img) {
    img.addEventListener('error', function () { img.classList.add('is-broken'); }, { once: true });
  });
})();
