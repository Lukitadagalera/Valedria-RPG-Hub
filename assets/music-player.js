/* ============================================================
   PLAYER DE MÚSICA — Valédria
   O player é injetado globalmente ao lado do botão de tema.
   As faixas ficam cadastradas em assets/data/musicas.js.

   Comportamento:
   - tenta iniciar a trilha automaticamente;
   - se o navegador bloquear autoplay com som, inicia na primeira
     interação do usuário com a página;
   - preserva faixa, posição, volume e intenção de reprodução;
   - ao navegar entre páginas, retoma a faixa do ponto salvo;
   - não pausa apenas porque a aba ficou em segundo plano.
   ============================================================ */
(function () {
  var STORAGE_KEY = 'valedria-music-state-v2';
  var LEGACY_STORAGE_KEY = 'valedria-music-state';
  var playlistLoaded = false;

  function safeParse(value) {
    try { return JSON.parse(value); } catch (e) { return null; }
  }

  function saveRawState(key, state) {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch (e) {}
  }

  function getSavedState() {
    try {
      var current = safeParse(localStorage.getItem(STORAGE_KEY));
      if (current) return current;

      var legacy = safeParse(localStorage.getItem(LEGACY_STORAGE_KEY)) || {};
      var migrated = {
        index: Number.isInteger(legacy.index) ? legacy.index : 0,
        volume: typeof legacy.volume === 'number' ? legacy.volume : 0.45,
        time: typeof legacy.time === 'number' ? legacy.time : 0,
        playing: true
      };
      saveRawState(STORAGE_KEY, migrated);
      return migrated;
    } catch (e) {
      return { index: 0, volume: 0.45, time: 0, playing: true };
    }
  }

  function saveState(state) {
    saveRawState(STORAGE_KEY, state);
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
        '<div class="music-emblem" aria-hidden="true"><img src="assets/img/home/marca-valedria.webp" alt=""><span></span><span></span><span></span><span></span><span></span></div>' +
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
        '<audio class="music-audio" preload="auto" playsinline></audio>' +
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

    var desiredPlaying = saved.playing !== false;
    var loadingTrack = false;
    var unlockArmed = false;
    var lastPersistAt = 0;

    audio.volume = typeof saved.volume === 'number'
      ? Math.max(0, Math.min(saved.volume, 1))
      : 0.45;
    // A reprodução automática passa por attemptPlay e respeita desiredPlaying.
    audio.autoplay = false;
    volume.value = Math.round(audio.volume * 100);
    volume.style.setProperty('--fill', volume.value + '%');

    function persist() {
      saveState({
        index: index,
        volume: audio.volume,
        time: audio.currentTime || 0,
        playing: desiredPlaying
      });
    }

    function persistThrottled() {
      var now = Date.now();
      if (now - lastPersistAt < 1200) return;
      lastPersistAt = now;
      persist();
    }

    function setPlayingUI(isPlaying) {
      toggle.classList.toggle('is-playing', isPlaying);
      panel.classList.toggle('is-playing', isPlaying);
      toggle.removeAttribute('data-autoplay-blocked');
      toggle.setAttribute('aria-label', isPlaying ? 'Música tocando — abrir player' : 'Abrir player de música');
      play.setAttribute('aria-label', isPlaying ? 'Pausar' : 'Reproduzir');
      play.innerHTML = isPlaying
        ? '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
    }

    function setDisabled(disabled) {
      [select, play, prev, next, progress].forEach(function (el) {
        el.disabled = disabled;
      });
    }

    function updateProgress() {
      var total = audio.duration || 0;
      var now = audio.currentTime || 0;
      progress.value = total > 0 ? Math.round((now / total) * 1000) : 0;
      progress.style.setProperty('--fill', Number(progress.value) / 10 + '%');
      currentTime.textContent = formatTime(now);
      duration.textContent = formatTime(total);
    }

    function cleanupUnlock() {
      if (!unlockArmed) return;
      unlockArmed = false;
      document.removeEventListener('pointerdown', unlockPlayback, true);
      document.removeEventListener('keydown', unlockPlayback, true);
    }

    function unlockPlayback() {
      cleanupUnlock();
      if (!desiredPlaying || !audio.paused || !tracks.length) return;
      attemptPlay();
    }

    function armAutoplayUnlock() {
      if (unlockArmed || !desiredPlaying) return;
      unlockArmed = true;
      toggle.setAttribute('data-autoplay-blocked', '');
      toggle.setAttribute('aria-label', 'Música pronta — interaja com a página para iniciar');
      document.addEventListener('pointerdown', unlockPlayback, true);
      document.addEventListener('keydown', unlockPlayback, true);
    }

    function attemptPlay() {
      if (!tracks.length || !desiredPlaying || !audio.src) return;

      var promise;
      try {
        promise = audio.play();
      } catch (e) {
        armAutoplayUnlock();
        return;
      }

      if (promise && typeof promise.catch === 'function') {
        promise.catch(function (error) {
          setPlayingUI(false);
          if (!error || error.name === 'NotAllowedError' || error.name === 'AbortError') {
            armAutoplayUnlock();
          }
        });
      }
    }

    function setMediaSessionTrack(track) {
      if (!('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return;
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: track.titulo,
          artist: track.artista || 'Valédria'
        });
      } catch (e) {}
    }

    function loadTrack(newIndex, keepSavedTime) {
      if (!tracks.length) return;

      loadingTrack = true;
      index = (newIndex + tracks.length) % tracks.length;
      var track = tracks[index];

      audio.src = track.arquivo;
      title.textContent = track.titulo;
      artist.textContent = track.artista || 'Valédria';
      select.value = String(index);
      progress.value = 0;
      currentTime.textContent = '0:00';
      duration.textContent = '0:00';
      setMediaSessionTrack(track);

      audio.addEventListener('loadedmetadata', function restoreTime() {
        audio.removeEventListener('loadedmetadata', restoreTime);

        if (keepSavedTime && typeof saved.time === 'number' && saved.time > 0 && saved.time < audio.duration) {
          audio.currentTime = saved.time;
        }

        loadingTrack = false;
        updateProgress();
        persist();

        if (desiredPlaying) attemptPlay();
      });

      audio.load();
    }

    if (!tracks.length) {
      select.innerHTML = '<option>Nenhuma faixa cadastrada</option>';
      setDisabled(true);
      desiredPlaying = false;
      persist();
    } else {
      select.innerHTML = tracks.map(function (track, i) {
        return '<option value="' + i + '">' +
          String(track.titulo).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') +
          '</option>';
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
      if (audio.paused) {
        desiredPlaying = true;
        persist();
        attemptPlay();
      } else {
        desiredPlaying = false;
        cleanupUnlock();
        audio.pause();
        persist();
      }
    });

    prev.addEventListener('click', function () {
      desiredPlaying = !audio.paused || desiredPlaying;
      saved.time = 0;
      loadTrack(index - 1, false);
    });

    next.addEventListener('click', function () {
      desiredPlaying = !audio.paused || desiredPlaying;
      saved.time = 0;
      loadTrack(index + 1, false);
    });

    select.addEventListener('change', function () {
      desiredPlaying = !audio.paused || desiredPlaying;
      saved.time = 0;
      loadTrack(Number.parseInt(select.value, 10) || 0, false);
    });

    progress.addEventListener('input', function () {
      if (!audio.duration) return;
      audio.currentTime = (Number(progress.value) / 1000) * audio.duration;
      updateProgress();
      persist();
    });

    volume.addEventListener('input', function () {
      audio.volume = Number(volume.value) / 100;
      volume.style.setProperty('--fill', volume.value + '%');
      persist();
    });

    audio.addEventListener('play', function () {
      if (!desiredPlaying) {
        audio.pause();
        return;
      }
      cleanupUnlock();
      setPlayingUI(true);
      persist();
    });

    audio.addEventListener('pause', function () {
      setPlayingUI(false);
      if (!loadingTrack) persist();
    });

    audio.addEventListener('timeupdate', function () {
      updateProgress();
      persistThrottled();
    });

    audio.addEventListener('durationchange', updateProgress);

    audio.addEventListener('ended', function () {
      if (!desiredPlaying) return;
      saved.time = 0;
      loadTrack(index + 1, false);
    });

    audio.addEventListener('error', function () {
      artist.textContent = 'Arquivo de áudio não encontrado';
      setPlayingUI(false);
    });

    function resumeIfWanted() {
      if (desiredPlaying && audio.paused && !audio.ended && tracks.length) {
        attemptPlay();
      }
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        persist();
      } else {
        resumeIfWanted();
      }
    });

    window.addEventListener('pageshow', resumeIfWanted);
    window.addEventListener('pagehide', persist);
    window.addEventListener('beforeunload', persist);

    if ('mediaSession' in navigator) {
      try {
        navigator.mediaSession.setActionHandler('play', function () {
          desiredPlaying = true;
          persist();
          attemptPlay();
        });
        navigator.mediaSession.setActionHandler('pause', function () {
          desiredPlaying = false;
          cleanupUnlock();
          audio.pause();
          persist();
        });
        navigator.mediaSession.setActionHandler('previoustrack', function () {
          desiredPlaying = true;
          saved.time = 0;
          loadTrack(index - 1, false);
        });
        navigator.mediaSession.setActionHandler('nexttrack', function () {
          desiredPlaying = true;
          saved.time = 0;
          loadTrack(index + 1, false);
        });
        navigator.mediaSession.setActionHandler('seekto', function (details) {
          if (typeof details.seekTime !== 'number' || !audio.duration) return;
          audio.currentTime = Math.max(0, Math.min(details.seekTime, audio.duration));
          updateProgress();
          persist();
        });
      } catch (e) {}
    }
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
