/* ============================================================
   PLAYER DE MÚSICA — Valédria
   O player é injetado globalmente ao lado do botão de tema.
   As faixas ficam cadastradas em assets/data/musicas.js.
   ============================================================ */
(function () {
  var STORAGE_KEY = 'valedria-music-state';
  var playlistLoaded = false;

  function safeParse(value) {
    try { return JSON.parse(value); } catch (e) { return null; }
  }

  function getSavedState() {
    try { return safeParse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { return {}; }
  }

  function saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return '0:00';
    var min = Math.floor(seconds / 60);
    var sec = Math.floor(seconds % 60);
    return min + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function loadPlaylist(done) {
    if (playlistLoaded || Array.isArray(window.VALEDRIA_MUSICAS)) {
      playlistLoaded = true;
      done(Array.isArray(window.VALEDRIA_MUSICAS) ? window.VALEDRIA_MUSICAS : []);
      return;
    }

    var script = document.createElement('script');
    script.src = 'assets/data/musicas.js';
    script.onload = function () {
      playlistLoaded = true;
      done(Array.isArray(window.VALEDRIA_MUSICAS) ? window.VALEDRIA_MUSICAS : []);
    };
    script.onerror = function () {
      playlistLoaded = true;
      done([]);
    };
    document.head.appendChild(script);
  }

  function initPlayer(tracks) {
    var actions = document.querySelector('.topbar-actions');
    if (!actions || document.querySelector('[data-music-control]')) return;

    tracks = tracks.filter(function (track) {
      return track && track.arquivo && track.titulo;
    });

    var wrap = document.createElement('div');
    wrap.className = 'music-control';
    wrap.setAttribute('data-music-control', '');
    wrap.innerHTML =
      '<button class="icon-btn music-toggle" type="button" aria-label="Abrir player de música" aria-expanded="false">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>' +
        '</svg>' +
      '</button>' +
      '<div class="music-panel" hidden>' +
        '<div class="music-panel__head"><div><span class="eyebrow">Trilha sonora</span><strong>Música de Valédria</strong></div>' +
          '<button class="music-close" type="button" aria-label="Fechar player">&times;</button></div>' +
        '<div class="music-now">' +
          '<span class="music-now__title">Nenhuma música adicionada</span>' +
          '<span class="music-now__artist">Cadastre faixas em assets/data/musicas.js</span>' +
        '</div>' +
        '<select class="music-track-select" aria-label="Selecionar música"></select>' +
        '<div class="music-controls">' +
          '<button class="music-btn music-prev" type="button" aria-label="Música anterior">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h2v14H6zM18 6v12l-8.5-6z"/></svg>' +
          '</button>' +
          '<button class="music-btn music-play" type="button" aria-label="Reproduzir">' +
            '<svg class="music-play-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>' +
          '</button>' +
          '<button class="music-btn music-next" type="button" aria-label="Próxima música">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 5h2v14h-2zM6 6v12l8.5-6z"/></svg>' +
          '</button>' +
        '</div>' +
        '<input class="music-progress" type="range" min="0" max="1000" value="0" aria-label="Progresso da música">' +
        '<div class="music-time"><span class="music-current">0:00</span><span class="music-duration">0:00</span></div>' +
        '<label class="music-volume-row"><span>Volume</span><input class="music-volume" type="range" min="0" max="100" value="45" aria-label="Volume"></label>' +
        '<audio class="music-audio" preload="metadata"></audio>' +
      '</div>';

    var themeButton = actions.querySelector('[data-theme-toggle]');
    actions.insertBefore(wrap, themeButton || actions.firstChild);

    var toggle = wrap.querySelector('.music-toggle');
    var panel = wrap.querySelector('.music-panel');
    var close = wrap.querySelector('.music-close');
    var audio = wrap.querySelector('.music-audio');
    var select = wrap.querySelector('.music-track-select');
    var title = wrap.querySelector('.music-now__title');
    var artist = wrap.querySelector('.music-now__artist');
    var play = wrap.querySelector('.music-play');
    var prev = wrap.querySelector('.music-prev');
    var next = wrap.querySelector('.music-next');
    var progress = wrap.querySelector('.music-progress');
    var currentTime = wrap.querySelector('.music-current');
    var duration = wrap.querySelector('.music-duration');
    var volume = wrap.querySelector('.music-volume');

    var saved = getSavedState();
    var index = Number.isInteger(saved.index) ? saved.index : 0;
    if (index < 0 || index >= tracks.length) index = 0;
    audio.volume = typeof saved.volume === 'number' ? Math.max(0, Math.min(saved.volume, 1)) : 0.45;
    volume.value = Math.round(audio.volume * 100);

    function persist() {
      saveState({ index: index, volume: audio.volume, time: audio.currentTime || 0, playing: !audio.paused });
    }

    function setPlayingUI(isPlaying) {
      toggle.classList.toggle('is-playing', isPlaying);
      play.setAttribute('aria-label', isPlaying ? 'Pausar' : 'Reproduzir');
      play.innerHTML = isPlaying
        ? '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
    }

    function setDisabled(disabled) {
      [select, play, prev, next, progress].forEach(function (el) { el.disabled = disabled; });
    }

    function updateProgress() {
      var total = audio.duration || 0;
      var now = audio.currentTime || 0;
      progress.value = total > 0 ? Math.round((now / total) * 1000) : 0;
      currentTime.textContent = formatTime(now);
      duration.textContent = formatTime(total);
    }

    function loadTrack(newIndex, keepSavedTime) {
      if (!tracks.length) return;
      index = (newIndex + tracks.length) % tracks.length;
      var track = tracks[index];
      audio.src = track.arquivo;
      title.textContent = track.titulo;
      artist.textContent = track.artista || 'Valédria';
      select.value = String(index);
      progress.value = 0;
      currentTime.textContent = '0:00';
      duration.textContent = '0:00';
      audio.addEventListener('loadedmetadata', function restoreTime() {
        audio.removeEventListener('loadedmetadata', restoreTime);
        if (keepSavedTime && typeof saved.time === 'number' && saved.time > 0 && saved.time < audio.duration) {
          audio.currentTime = saved.time;
        }
        updateProgress();
      });
      persist();
    }

    function playCurrent() {
      if (!tracks.length) return;
      var promise = audio.play();
      if (promise && typeof promise.catch === 'function') {
        promise.catch(function () { setPlayingUI(false); });
      }
    }

    if (!tracks.length) {
      select.innerHTML = '<option>Nenhuma faixa cadastrada</option>';
      setDisabled(true);
    } else {
      select.innerHTML = tracks.map(function (track, i) {
        return '<option value="' + i + '">' + String(track.titulo).replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</option>';
      }).join('');
      setDisabled(false);
      loadTrack(index, true);
    }

    toggle.addEventListener('click', function () {
      var open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    close.addEventListener('click', function () {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    });

    document.addEventListener('click', function (event) {
      if (!panel.hidden && !wrap.contains(event.target)) {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !panel.hidden) {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    play.addEventListener('click', function () {
      if (audio.paused) playCurrent(); else audio.pause();
    });

    prev.addEventListener('click', function () {
      var wasPlaying = !audio.paused;
      loadTrack(index - 1, false);
      if (wasPlaying) playCurrent();
    });

    next.addEventListener('click', function () {
      var wasPlaying = !audio.paused;
      loadTrack(index + 1, false);
      if (wasPlaying) playCurrent();
    });

    select.addEventListener('change', function () {
      var wasPlaying = !audio.paused;
      loadTrack(Number.parseInt(select.value, 10) || 0, false);
      if (wasPlaying) playCurrent();
    });

    progress.addEventListener('input', function () {
      if (!audio.duration) return;
      audio.currentTime = (Number(progress.value) / 1000) * audio.duration;
      updateProgress();
    });

    volume.addEventListener('input', function () {
      audio.volume = Number(volume.value) / 100;
      persist();
    });

    audio.addEventListener('play', function () { setPlayingUI(true); persist(); });
    audio.addEventListener('pause', function () { setPlayingUI(false); persist(); });
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('durationchange', updateProgress);
    audio.addEventListener('ended', function () {
      loadTrack(index + 1, false);
      playCurrent();
    });
    audio.addEventListener('error', function () {
      artist.textContent = 'Arquivo de áudio não encontrado';
      setPlayingUI(false);
    });

    window.addEventListener('beforeunload', persist);
  }

  function start() {
    loadPlaylist(initPlayer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
