/* render.js — utilitários compartilhados para montar tabelas, grids e
   quadros de imagem a partir dos arquivos em assets/data/*.js.
   Para editar o conteúdo do site, edite os arquivos de dados —
   este arquivo só sabe desenhar o que existir neles. */
window.VR = (function () {
  function esc(s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function el(sel, root) { return (root || document).querySelector(sel); }
  function els(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function mount(sel, html) { var n = el(sel); if (n) n.innerHTML = html; bindImgSlots(); }

  function normalizeRatio(ratio) {
    return String(ratio || '4/3').replace('-', '/');
  }

  function isPortraitImage(src) {
    var s = String(src || '').toLowerCase();
    if (!s) return false;
    if (/assets\/img\/racas\//.test(s)) return s.indexOf('transformacao-de-linhagem') === -1;
    if (/assets\/img\/monstros\//.test(s)) return true;
    if (/assets\/img\/faccoes\//.test(s) && s.indexOf('quadro-de-missoes') === -1) return true;
    if (/assets\/img\/sociedade\//.test(s)) {
      return !/(?:tres-rostos|calendario-valedria|marco-)/.test(s);
    }
    return false;
  }

  function resolveImageRatio(src, ratio) {
    return isPortraitImage(src) ? '3/4' : normalizeRatio(ratio);
  }

  function applyContentAdjustments() {
    if (Array.isArray(window.FACCOES_NPCS)) {
      var hasNpc = function (name) {
        return window.FACCOES_NPCS.some(function (npc) { return npc.nome === name; });
      };

      if (!hasNpc('Auror, o Professor')) {
        window.FACCOES_NPCS.push({
          grupo: 'Academia e magia',
          nome: 'Auror, o Professor',
          papel: 'Professor da Academia de Valédria especializado em história arcana, teoria de linhagens e fenômenos mágicos raros. É conhecido por transformar relatos antigos e registros incompletos em hipóteses úteis para expedições, embora sua curiosidade acadêmica frequentemente o leve a investigar assuntos que outros magos prefeririam deixar esquecidos.',
          img: 'assets/img/sociedade/auror-o-professor.png'
        });
      }

      if (!hasNpc('Klein, o Perseguidor')) {
        window.FACCOES_NPCS.push({
          grupo: 'Vilões e ameaças',
          nome: 'Klein, o Perseguidor',
          papel: 'Rastreador persistente conhecido por seguir alvos através de estradas, vilas e regiões selvagens por longos períodos. Trabalha por contratos e favores difíceis de recusar, reunindo pistas com paciência e aparecendo quando seus alvos acreditam que já despistaram qualquer perseguição.',
          img: 'assets/img/sociedade/klein-o-perseguidor.png'
        });
      }
    }

    if (window.ANOES && Array.isArray(window.ANOES.clas)) {
      var clanImages = {
        'Clã Ferro-Fundo': 'assets/img/racas/cla-ferro-fundo.png',
        'Clã Pedra-Funda': 'assets/img/racas/cla-pedra-funda.png',
        'Clã Chama-Antiga': 'assets/img/racas/cla-chama-antiga.png',
        'Clã Veio-Negro': 'assets/img/racas/cla-veio-negro.png'
      };
      window.ANOES.clas.forEach(function (clan) {
        if (clanImages[clan.nome]) clan.img = clanImages[clan.nome];
      });
    }

    if (Array.isArray(window.BESTIARIO)) {
      var devoradorIndex = window.BESTIARIO.findIndex(function (creature) {
        return creature.nome === 'Devorador de Areia';
      });

      if (devoradorIndex !== -1) {
        var devorador = window.BESTIARIO.splice(devoradorIndex, 1)[0];
        devorador.categoria = 'Lendário';
        devorador.ameaca = 'Lendária';
        devorador.nivel = 'Lendário';
        devorador.atributos = null;
        devorador.defesa = 'Desconhecida';
        devorador.vida = 'Desconhecida';
        devorador.local = 'Mar de Areia e Ruínas Ardentes, nas Terras Demoníacas';
        devorador.descricao = 'Entidade lendária do Mar de Areia, formada por uma massa colossal de areia animada pela energia residual das Ruínas Ardentes. Sua presença altera dunas e rotas inteiras, fazendo viajantes desaparecerem em tempestades súbitas. Mesmo quando sua forma é desfeita, histórias antigas afirmam que ela pode se recompor enquanto a energia das ruínas permanecer ativa.';
        window.BESTIARIO.push(devorador);
      }
    }
  }

  applyContentAdjustments();

  function ensureLightbox() {
    var lightbox = el('#vr-lightbox');
    if (lightbox) return lightbox;

    lightbox = document.createElement('div');
    lightbox.id = 'vr-lightbox';
    lightbox.className = 'vr-lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Visualização da imagem em tamanho real');
    lightbox.innerHTML =
      '<button class="vr-lightbox__backdrop" type="button" data-vr-lightbox-close aria-label="Fechar imagem ampliada"></button>' +
      '<div class="vr-lightbox__dialog" role="document">' +
      '<button class="vr-lightbox__close" type="button" data-vr-lightbox-close aria-label="Fechar imagem ampliada">&times;</button>' +
      '<img class="vr-lightbox__image" alt="">' +
      '<p class="vr-lightbox__caption"></p>' +
      '</div>';
    document.body.appendChild(lightbox);

    els('[data-vr-lightbox-close]', lightbox).forEach(function (button) {
      button.addEventListener('click', closeLightbox);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
    return lightbox;
  }

  function openLightbox(src, alt) {
    if (!src) return;
    var lightbox = ensureLightbox();
    var image = el('.vr-lightbox__image', lightbox);
    var caption = el('.vr-lightbox__caption', lightbox);
    image.src = src;
    image.alt = alt || '';
    caption.textContent = alt || '';
    caption.hidden = !alt;
    lightbox.hidden = false;
    lightbox.classList.add('is-open');
    document.body.classList.add('vr-lightbox-open');
    var closeButton = el('.vr-lightbox__close', lightbox);
    if (closeButton) closeButton.focus();
  }

  function closeLightbox() {
    var lightbox = el('#vr-lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.hidden = true;
    document.body.classList.remove('vr-lightbox-open');
  }

  function bindImgSlots() {
    els('.img-slot').forEach(function (slot) {
      var img = el('img', slot);
      if (!img) return;

      var src = img.getAttribute('src') || '';
      if (isPortraitImage(src)) slot.style.setProperty('--slot-ratio', '3/4');

      if (!img.dataset.vrBound) {
        img.dataset.vrBound = '1';
        img.addEventListener('error', function () {
          img.classList.add('is-broken');
          var zoom = el('.img-zoom', slot);
          if (zoom) zoom.hidden = true;
        }, { once: true });
      }

      if (img.complete && img.naturalWidth === 0) {
        img.classList.add('is-broken');
      }

      if (!el('.img-zoom', slot) && src) {
        var zoomButton = document.createElement('button');
        zoomButton.type = 'button';
        zoomButton.className = 'img-zoom';
        zoomButton.setAttribute('aria-label', 'Ampliar ' + (img.alt || 'imagem'));
        zoomButton.setAttribute('title', 'Ver em tamanho real');
        zoomButton.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
          '<circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path>' +
          '<path d="M11 8v6M8 11h6"></path></svg>';
        zoomButton.addEventListener('click', function () {
          if (img.classList.contains('is-broken')) return;
          openLightbox(img.currentSrc || img.src, img.alt || '');
        });
        if (img.classList.contains('is-broken')) zoomButton.hidden = true;
        slot.appendChild(zoomButton);
      }
    });
  }

  function imgSlot(src, alt, ratio) {
    if (!src) return '';
    ratio = resolveImageRatio(src, ratio || '4/3');
    return (
      '<div class="img-slot" style="--slot-ratio:' + esc(ratio) + '">' +
      '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '" onerror="this.classList.add(&quot;is-broken&quot;)">' +
      '<div class="placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">' +
      '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.4"/>' +
      '<path d="M21 16l-5.2-5.2a2 2 0 0 0-2.8 0L5 19"/></svg>' +
      '<span>Imagem a inserir</span><code>' + esc(src) + '</code></div></div>'
    );
  }

  function chip(text, variant) {
    return '<span class="chip' + (variant ? ' chip-' + variant : '') + '">' + esc(text) + '</span>';
  }

  function figure(src, alt, caption, ratio) {
    if (!src) return '';
    var resolvedRatio = resolveImageRatio(src, ratio || '4-3');
    return (
      '<figure class="figure ratio-' + resolvedRatio.replace('/', '-') + '">' +
      imgSlot(src, alt, resolvedRatio) + (caption ? '<figcaption>' + esc(caption) + '</figcaption>' : '') +
      '</figure>'
    );
  }

  function injectTransformationArt() {
    var text = el('#transformacao-texto');
    if (!text) return;
    var section = text.closest ? text.closest('section') : null;
    if (!section || el('.transformacao-linhagem-art', section)) return;

    var art = document.createElement('div');
    art.className = 'transformacao-linhagem-art';
    art.style.marginTop = 'var(--space-6)';
    art.innerHTML = figure(
      'assets/img/racas/transformacao-de-linhagem.png',
      'Transformação de Linhagem',
      'Representação da Transformação de Linhagem em Valédria',
      '16-9'
    );
    section.appendChild(art);
    bindImgSlots();
  }

  function table(headers, rows) {
    var thead = '<tr>' + headers.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr>';
    var tbody = rows.map(function (r) {
      return '<tr>' + r.map(function (c) { return '<td>' + (c === undefined ? '' : c) + '</td>'; }).join('') + '</tr>';
    }).join('');
    return '<div class="table-wrap"><table class="data-table"><thead>' + thead + '</thead><tbody>' + tbody + '</tbody></table></div>';
  }

  function ameacaVariant(ameaca) {
    if (!ameaca) return '';
    var a = ameaca.toLowerCase();
    if (a.indexOf('lend') > -1) return 'purple';
    if (a.indexOf('regional') > -1) return 'red';
    if (a.indexOf('alta') > -1) return 'gold';
    if (a.indexOf('moderada') > -1) return 'blue';
    return 'green';
  }

  function grauVariant(grau) {
    if (!grau) return '';
    var g = grau.toLowerCase();
    if (g.indexOf('deus') > -1 || g.indexOf('lend') > -1) return 'purple';
    if (g.indexOf('imperador') > -1) return 'red';
    if (g.indexOf('arquimago') > -1 || g.indexOf('grande mestre') > -1) return 'gold';
    if (g.indexOf('mago') > -1 || g.indexOf('mestre') > -1 || g.indexOf('guerreiro') > -1) return 'blue';
    return 'green';
  }

  function setupFilter(opts) {
    // opts: {input, select, items: [{el, text, group}], countEl}
    var input = opts.input, select = opts.select, items = opts.items, countEl = opts.countEl;
    function apply() {
      var q = (input && input.value || '').trim().toLowerCase();
      var g = (select && select.value) || '';
      var shown = 0;
      items.forEach(function (it) {
        var matchesText = !q || it.text.toLowerCase().indexOf(q) > -1;
        var matchesGroup = !g || it.group === g;
        var visible = matchesText && matchesGroup;
        it.el.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });
      if (countEl) countEl.textContent = shown + ' de ' + items.length;
    }
    if (input) input.addEventListener('input', apply);
    if (select) select.addEventListener('change', apply);
    apply();
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindImgSlots();
    injectTransformationArt();
    ensureLightbox();
  });

  return {
    esc: esc,
    el: el,
    els: els,
    mount: mount,
    bindImgSlots: bindImgSlots,
    imgSlot: imgSlot,
    chip: chip,
    figure: figure,
    table: table,
    ameacaVariant: ameacaVariant,
    grauVariant: grauVariant,
    setupFilter: setupFilter,
    openLightbox: openLightbox,
    closeLightbox: closeLightbox
  };
})();
