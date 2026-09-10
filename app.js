/* app.js — comportamento compartilhado do Códice de Valédria
   Tema claro/escuro, menu mobile, vida da ficha, navegação extra, placeholders e carregamento do player. */
(function () {
  var root = document.documentElement;

  function getCookie(name) {
    try {
      var target = name + '=';
      var parts = document.cookie.split('; ');
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].indexOf(target) === 0) return decodeURIComponent(parts[i].slice(target.length));
      }
    } catch (e) {}
    return null;
  }

  function setCookie(name, value, days) {
    try {
      var d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + d.toUTCString() + '; path=/; SameSite=Lax';
    } catch (e) {}
  }

  var current = 'light';
  try {
    var urlMatch = location.search.match(/theme=(dark|light)/);
    var cookieTheme = getCookie('vcodex_theme');
    current = urlMatch
      ? urlMatch[1]
      : (cookieTheme === 'dark' || cookieTheme === 'light')
        ? cookieTheme
        : 'dark';
  } catch (e) {}

  root.setAttribute('data-theme', current);
  setCookie('vcodex_theme', current, 365);

  function ensureBookThirteenNavigation() {
    document.querySelectorAll('.nav-scroll').forEach(function (nav) {
      var groups = Array.prototype.slice.call(nav.children);
      groups.forEach(function (group) {
        var list = group.querySelector('.nav-list');
        if (!list || !list.querySelector('a[href^="livro-12-mestre.html"]')) return;

        var title = group.querySelector('.nav-group-title');
        if (title) title.textContent = 'Os Treze Livros';

        if (!list.querySelector('a[href^="livro-13-mapa.html"]')) {
          var link = document.createElement('a');
          link.className = 'nav-link';
          link.href = 'livro-13-mapa.html';
          link.innerHTML = '<span class="num">XIII</span> Livro XIII · Mapa e Aventuras';
          var page = (location.pathname.split('/').pop() || 'index.html').split('?')[0];
          if (page === 'livro-13-mapa.html') link.setAttribute('aria-current', 'page');
          link.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
          list.appendChild(link);
        }
      });
    });

    document.querySelectorAll('.book-toc').forEach(function (toc) {
      if (!toc.querySelector('a[href^="livro-13-mapa.html"]')) {
        var link = document.createElement('a');
        link.href = 'livro-13-mapa.html';
        link.textContent = 'XIII · Mapa e Aventuras';
        toc.appendChild(link);
      }
    });

    var masterCardText = document.querySelector('.book-card[href^="livro-12-mestre.html"] p');
    if (masterCardText) {
      masterCardText.textContent = 'Guia para narrar Valédria: campanhas, aventuras, NPCs, facções, encontros, consequências e ferramentas do Mestre.';
    }
  }

  function ensureChroniclesNavigation() {
    var nav = document.querySelector('.nav-scroll');
    if (nav && !nav.querySelector('[data-cronicas-nav]')) {
      var group = document.createElement('div');
      group.setAttribute('data-cronicas-nav', '');
      group.innerHTML =
        '<div class="nav-group-title">Crônicas de Valédria</div>' +
        '<div class="nav-list"><a class="nav-link" href="cronicas-valedria.html"><span class="num">✦</span> Aventuras e campanhas</a></div>';
      nav.appendChild(group);

      var link = group.querySelector('a');
      var page = (location.pathname.split('/').pop() || 'index.html').split('?')[0];
      if (page === 'cronicas-valedria.html') link.setAttribute('aria-current', 'page');
      link.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
    }

    document.querySelectorAll('.book-toc').forEach(function (toc) {
      if (toc.querySelector('a[href^="cronicas-valedria.html"]')) return;
      var link = document.createElement('a');
      link.href = 'cronicas-valedria.html';
      link.textContent = 'Crônicas de Valédria';
      toc.appendChild(link);
    });
  }

  function propagateTheme(theme) {
    try {
      document.querySelectorAll('a[href*=".html"]').forEach(function (a) {
        var href = a.getAttribute('href');
        if (!href || /^https?:\/\//.test(href)) return;
        var base = href.split('?')[0].split('#')[0];
        var hash = href.indexOf('#') > -1 ? href.slice(href.indexOf('#')) : '';
        a.setAttribute('href', base + '?theme=' + theme + hash);
      });
    } catch (e) {}
  }

  function syncThemeIcon() {
    var isDark = root.getAttribute('data-theme') === 'dark';
    var svg = isDark
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.6M12 18.9v2.6M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2.5 12h2.6M18.9 12h2.6M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.5 14.6A8.5 8.5 0 1 1 9.4 3.5a7 7 0 0 0 11.1 11.1Z"/></svg>';

    document.querySelectorAll('[data-theme-toggle]').forEach(function (toggle) {
      toggle.innerHTML = svg;
      toggle.setAttribute('aria-label', isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro');
    });
  }

  ensureBookThirteenNavigation();
  ensureChroniclesNavigation();
  propagateTheme(current);
  syncThemeIcon();

  document.querySelectorAll('[data-theme-toggle]').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', current);
      setCookie('vcodex_theme', current, 365);
      propagateTheme(current);
      syncThemeIcon();
    });
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

  document.querySelectorAll('.img-slot img').forEach(function (img) {
    img.addEventListener('error', function () {
      img.classList.add('is-broken');
    }, { once: true });
  });

  document.addEventListener('DOMContentLoaded', function () {
    ensureBookThirteenNavigation();
    ensureChroniclesNavigation();
    propagateTheme(current);

    var vidaAtualInput = document.getElementById('f-vida-atual');
    var vidaMaxDisplay = document.getElementById('vida-max-display');
    var btnDano = document.getElementById('btn-vida-dano');
    var btnCura = document.getElementById('btn-vida-cura');
    var inputCon =
      document.getElementById('attr-constituicao') ||
      document.querySelector('input[data-attr="constituicao"]') ||
      document.querySelector('input[name="constituicao"]');

    if (!vidaAtualInput || !vidaMaxDisplay) return;

    var CHAVE_VIDA_ATUAL = 'valedria-ficha-vida-atual';

    function obterConstituicao() {
      return inputCon ? (Number.parseInt(inputCon.value, 10) || 0) : 0;
    }

    function obterVidaMaxima() {
      return 5 + obterConstituicao() * 2;
    }

    function salvarVidaAtual() {
      var vidaMax = obterVidaMaxima();
      var valor = Number.parseInt(vidaAtualInput.value, 10);
      var vidaAtual = Number.isNaN(valor) ? vidaMax : Math.max(0, Math.min(valor, vidaMax));
      vidaAtualInput.value = vidaAtual;
      try { sessionStorage.setItem(CHAVE_VIDA_ATUAL, String(vidaAtual)); } catch (e) {}
    }

    function restaurarVidaAtual() {
      var vidaMax = obterVidaMaxima();
      var valorSalvo = null;
      try { valorSalvo = sessionStorage.getItem(CHAVE_VIDA_ATUAL); } catch (e) {}
      var vidaSalva = Number.parseInt(valorSalvo, 10);
      vidaAtualInput.value = Number.isNaN(vidaSalva) ? vidaMax : Math.max(0, Math.min(vidaSalva, vidaMax));
      vidaMaxDisplay.textContent = vidaMax;
    }

    function recalcularVida() {
      vidaMaxDisplay.textContent = obterVidaMaxima();
      salvarVidaAtual();
    }

    function alterarVida(delta) {
      var vidaMax = obterVidaMaxima();
      var valor = Number.parseInt(vidaAtualInput.value, 10);
      var atual = Number.isNaN(valor) ? vidaMax : valor;
      vidaAtualInput.value = Math.max(0, Math.min(atual + delta, vidaMax));
      salvarVidaAtual();
    }

    if (btnDano) btnDano.addEventListener('click', function () { alterarVida(-1); });
    if (btnCura) btnCura.addEventListener('click', function () { alterarVida(1); });
    vidaAtualInput.addEventListener('input', salvarVidaAtual);
    vidaAtualInput.addEventListener('change', salvarVidaAtual);
    if (inputCon) {
      inputCon.addEventListener('input', recalcularVida);
      inputCon.addEventListener('change', recalcularVida);
    }
    restaurarVidaAtual();
  });

  function loadMusicPlayer() {
    if (document.querySelector('script[data-valedria-music-player]')) return;
    var script = document.createElement('script');
    script.src = 'assets/music-player.js?v=15';
    script.setAttribute('data-valedria-music-player', '');
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadMusicPlayer, { once: true });
  } else {
    loadMusicPlayer();
  }
})();
