/* One pass per pointer entry; leaving removes the layer so reentry starts at zero. */
(()=>{'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)'),mouse=matchMedia('(any-hover: hover)');
// Shared floral surfaces, including dynamically rendered cards and dialog panels.
const selector=':is(main,dialog,.music-panel) :is(.card,.mini-card,.subcard,.account-subpanel,.ticket-thread,.page-head,.section-head,.reference-heading,.editorial-head,.hall-heading,.mp-section-head,.community-welcome,.community-steps,.book-reading-panel,.entry-card,.mp-section,.mp-panel,.hall-player,.hall-empty,.hall-invitation,.reference-book,.volume,.reference-player,.reference-campaign,.board-card,.board-empty,.board-form,.request-success,.destination-card,.world-kingdom,.myth-section,.studio-record,.studio-block,.studio-combatant,.chronicle-card,.chronicle-secret,.chronicle-gate,.master-chapter,.master-tool-card,.master-pillar,.master-callout,.mestre-gate,.mestre-block,.campaign-feature,.lede-note,.reading-note,.reading-toc,.filter-bar,.stat,.sheet-dossier,.portrait-card,.atlas-result,.collection-card,.collection-empty,.catalog-option,.preview-attrs>*,.preview-life,.preview-power,.attr-box,.attr-points,.readonly-pill,.entry-stats>div,.preview-list .row,.table-wrap,.hall-subtitle,.hero-side-note),.sheet-catalog-dialog,.music-panel,#painel.painel';
const layers=new WeakMap();let current=null,active=null,point=null,pending=false;
function pause(){if(active){active.remove();if(current)layers.delete(current);}active=null;}
function activate(node){if(node===current&&active)return;pause();current=node;if(!node||document.hidden||reduce.matches||!mouse.matches)return;let layer=layers.get(node);if(!layer||layer.parentNode!==node){layer=document.createElement('span');layer.className='botanical-light';layer.setAttribute('aria-hidden','true');const branches=document.createElement('span');branches.className='botanical-branches';layer.append(branches);node.classList.add('botanical-host');if(getComputedStyle(node).position==='static')node.classList.add('botanical-positioned');node.append(layer);layers.set(node,layer);}layer.classList.add('is-awake');active=layer;}
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
