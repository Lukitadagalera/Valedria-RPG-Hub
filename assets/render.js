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

  function bindImgSlots() {
    els('.img-slot img').forEach(function (img) {
      if (img.dataset.vrBound) return;
      img.dataset.vrBound = '1';
      if (img.complete && img.naturalWidth === 0) { img.classList.add('is-broken'); return; }
      img.addEventListener('error', function () { img.classList.add('is-broken'); }, { once: true });
    });
  }

  function imgSlot(src, alt, ratio) {
    ratio = ratio || '4/3';
    return (
      '<div class="img-slot" style="--slot-ratio:' + esc(ratio) + '">' +
      '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '" onerror="this.classList.add(&quot;is-broken&quot;)" data-vr-bound="1">' +
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
    return (
      '<figure class="figure ratio-' + (ratio || '4-3').replace('/', '-') + '">' +
      imgSlot(src, alt) + (caption ? '<figcaption>' + esc(caption) + '</figcaption>' : '') +
      '</figure>'
    );
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

  document.addEventListener('DOMContentLoaded', bindImgSlots);

  return { esc, el, els, mount, bindImgSlots, imgSlot, chip, figure, table, ameacaVariant, grauVariant, setupFilter };
})();
