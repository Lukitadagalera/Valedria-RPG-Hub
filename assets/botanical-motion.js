/* One hovered panel animates; existing layers retain their timeline when paused. */
(()=>{'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)'),mouse=matchMedia('(any-hover: hover)');
const selector='main :is(.card,.mini-card,.subcard,.account-subpanel,.page-head,.section-head,.reference-heading,.community-welcome,.book-reading-panel,.entry-card,.mp-section,.hall-player,.reference-book,.volume,.preview-life,.preview-power,.attr-box,.collection-card)';
const layers=new WeakMap();let current=null,active=null,point=null,pending=false;
function pause(){if(active)active.classList.remove('is-awake');active=null;}
function activate(node){if(node===current&&active)return;pause();current=node;if(!node||document.hidden||reduce.matches||!mouse.matches)return;let layer=layers.get(node);if(!layer){layer=document.createElement('span');layer.className='botanical-light';layer.setAttribute('aria-hidden','true');const branches=document.createElement('span');branches.className='botanical-branches';layer.append(branches);node.classList.add('botanical-host');node.append(layer);layers.set(node,layer);}layer.classList.add('is-awake');active=layer;}
function panel(target){return target instanceof Element?target.closest(selector):null;}
document.addEventListener('pointerover',e=>{if(e.pointerType==='touch')return;point={x:e.clientX,y:e.clientY};activate(panel(e.target));});
document.addEventListener('pointerout',e=>{if(e.pointerType==='touch')return;point={x:e.clientX,y:e.clientY};activate(panel(e.relatedTarget));if(!e.relatedTarget)point=null;});
// Track coordinates cheaply; hit testing is only needed when scrolling moves panels.
document.addEventListener('pointermove',e=>{if(e.pointerType!=='touch')point={x:e.clientX,y:e.clientY};},{passive:true});
function refresh(){activate(point?panel(document.elementFromPoint(point.x,point.y)):null);}
document.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;refresh();});}},{passive:true,capture:true});
window.addEventListener('blur',()=>{point=null;activate(null);});
document.addEventListener('visibilitychange',()=>{if(document.hidden){point=null;activate(null);}else refresh();});
reduce.addEventListener('change',()=>{pause();refresh();});mouse.addEventListener('change',()=>{pause();refresh();});
})();
