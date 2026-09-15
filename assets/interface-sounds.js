/* Tiny synthesized interface clicks, separate from music and narration. */
(() => {
  'use strict';
  const key='valedria-interface-sounds',hover=matchMedia('(hover:hover)'),Audio=window.AudioContext||window.webkitAudioContext;
  let enabled=true,context,last=-Infinity,button;
  try{enabled=localStorage.getItem(key)!=='off';}catch{}
  function sync(){if(!button)return;button.setAttribute('aria-pressed',String(enabled));button.setAttribute('aria-label',enabled?'Silenciar sons dos ícones':'Ativar sons dos ícones');button.title=enabled?'Sons dos ícones: ligados':'Sons dos ícones: desligados';button.querySelector('[data-sound-off]').style.display=enabled?'none':'';}
  function unlock(){if(!enabled||!Audio)return;try{context ||= new Audio();if(context.state==='suspended')context.resume().catch(()=>{});}catch{}}
  function tick(){
    if(!enabled||document.hidden||context?.state!=='running'||performance.now()-last<140)return;
    last=performance.now();
    const oscillator=context.createOscillator(),gain=context.createGain(),now=context.currentTime;
    oscillator.type='sine';oscillator.frequency.setValueAtTime(1150,now);oscillator.frequency.exponentialRampToValueAtTime(460,now+.024);
    gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.012,now+.003);gain.gain.exponentialRampToValueAtTime(.0001,now+.028);
    oscillator.connect(gain);gain.connect(context.destination);oscillator.start(now);oscillator.stop(now+.03);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};
  }
  const actions=document.querySelector('.footer-settings .topbar-actions')||document.querySelector('.topbar-actions');
  if(actions&&Audio){button=document.createElement('button');button.type='button';button.className='icon-btn interface-sound-toggle';button.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8"/><path data-sound-off d="m3 3 18 18"/></svg>';actions.append(button);sync();button.addEventListener('click',()=>{enabled=!enabled;try{localStorage.setItem(key,enabled?'on':'off');}catch{}sync();if(enabled){unlock();context?.resume().then(tick).catch(()=>{});}});const summary=actions.closest('.footer-settings')?.querySelector('summary');summary?.setAttribute('aria-label','Abrir controles de tema, música e sons');}
  document.addEventListener('pointerdown',unlock,{passive:true});
  document.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key))unlock();});
  document.addEventListener('pointerover',e=>{
    if(!hover.matches||e.pointerType==='touch')return;
    const target=e.target.closest('a,button,summary,[role="button"]');
    if(!target||target===button||target.matches(':disabled,[aria-disabled="true"]')||target.contains(e.relatedTarget))return;
    if(target.matches('.icon-btn,.primary-nav a,.nav-link')||target.querySelector('svg,i,[class*="icon"]'))tick();
  },{passive:true});
  addEventListener('storage',e=>{if(e.key===key){enabled=e.newValue!=='off';sync();}});
  // Browsers with native page transitions already animate the snapshot.
  addEventListener('pagereveal',e=>{if(e.viewTransition)document.querySelector('main')?.getAnimations().forEach(a=>{if(a.animationName==='valedria-enter')a.cancel();});});
})();
