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
    var message=audio.parentElement.querySelector('.hero-audio-error');
    var failed=function(){message.hidden=false;};
    audio.addEventListener('error',failed);
    audio.querySelector('source').addEventListener('error',failed);
    audio.addEventListener('loadeddata',function(){message.hidden=true;});
  });
})();
