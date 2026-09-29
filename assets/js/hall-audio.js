/* Narrations start only on request and never overlap each other or the soundtrack. */
(function(){
  var narrations=Array.from(document.querySelectorAll('.hero-audio'));
  document.addEventListener('play',function(event){
    var current=event.target;
    if(!(current instanceof HTMLAudioElement))return;
    document.querySelectorAll('audio').forEach(function(other){if(other!==current)other.pause();});
    if(current.classList.contains('hero-audio'))document.dispatchEvent(new Event('valedria:narration-play'));
  },true);
  narrations.forEach(function(audio){
    var narration=audio.parentElement;
    var card=audio.closest('.reference-player');
    var name=card.querySelector('h3').textContent;
    var copy=card.querySelector('.player-copy');
    var footer=document.createElement('div');footer.className='hero-footer';
    copy.appendChild(footer);footer.appendChild(narration);footer.appendChild(card.querySelector('.player-badge'));
    narration.querySelector('.hero-narration-label').classList.add('sr-only');
    var player=document.createElement('div');player.className='hero-player';
    player.setAttribute('role','group');player.setAttribute('aria-label','Relato de '+name);
    player.innerHTML='<button type="button" class="hero-toggle"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="hero-play-icon" d="M8 5v14l11-7z"/><path class="hero-pause-icon" d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg></button><span class="hero-player-title">Ouvir relato</span><input class="hero-seek" type="range" min="0" max="1000" step="1" value="0" disabled><span class="hero-time" aria-hidden="true">0:00</span>';
    narration.insertBefore(player,audio);narration.classList.add('is-enhanced');
    var button=player.querySelector('button'),seek=player.querySelector('input'),time=player.querySelector('.hero-time');
    button.setAttribute('aria-label','Reproduzir relato de '+name);
    seek.setAttribute('aria-label','Posição do relato de '+name);
    var format=function(seconds){seconds=Math.floor(Number(seconds)||0);return Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');};
    var sync=function(){
      var valid=Number.isFinite(audio.duration)&&audio.duration>0;
      seek.disabled=!valid;seek.value=valid?Math.round(audio.currentTime/audio.duration*1000):0;
      seek.style.setProperty('--progress',Number(seek.value)/10+'%');
      seek.setAttribute('aria-valuetext',format(audio.currentTime)+(valid?' de '+format(audio.duration):''));
      time.textContent=format(audio.currentTime);time.title=valid?'Duração: '+format(audio.duration):'';
      player.classList.toggle('is-playing',!audio.paused&&!audio.ended);
      button.setAttribute('aria-label',(audio.paused||audio.ended?'Reproduzir':'Pausar')+' relato de '+name);
    };
    button.addEventListener('click',function(){if(!audio.paused){audio.pause();return;}audio.play().catch(failed);});
    seek.addEventListener('input',function(){if(Number.isFinite(audio.duration))audio.currentTime=Number(seek.value)/1000*audio.duration;sync();});
    ['play','pause','ended','timeupdate','loadedmetadata','durationchange'].forEach(function(event){audio.addEventListener(event,sync);});
    var message=narration.querySelector('.hero-audio-error');
    var failed=function(){message.hidden=false;};
    audio.addEventListener('error',failed);
    audio.querySelector('source').addEventListener('error',failed);
    audio.addEventListener('loadeddata',function(){message.hidden=true;});
    sync();
  });
})();
