/* Bounded decorative animation: no scroll/mouse loop and no animated filters. */
(()=>{'use strict';const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const selector='main :is(.card,.page-head,.reference-heading,.community-welcome,.book-reading-panel,.entry-card,.mp-section,.hall-player,.reference-book,.volume)';
const budget=navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4?1:2;
const visible=new Set(),known=new Set(),layers=new Map();
function update(){let count=0;const active=[];for(const node of visible){const enabled=!document.hidden&&!reduce.matches&&count<budget&&!active.some(parent=>parent.contains(node))&&node.getBoundingClientRect().height<1400;if(enabled){count++;active.push(node);}let layer=layers.get(node);if(enabled&&!layer){layer=document.createElement('span');layer.className='botanical-light';layer.setAttribute('aria-hidden','true');const branches=document.createElement('span');branches.className='botanical-branches';layer.append(branches);node.classList.add('botanical-host');node.append(layer);layers.set(node,layer);}if(layer)layer.classList.toggle('is-awake',enabled);}for(const [node,layer] of layers)if(!visible.has(node))layer.classList.remove('is-awake');}
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);}update();},{threshold:0});
function scan(){for(const node of known)if(!node.isConnected){observer.unobserve(node);known.delete(node);visible.delete(node);layers.delete(node);}for(const node of document.querySelectorAll(selector)){if(known.has(node)||node.parentElement.closest('.botanical-host'))continue;known.add(node);observer.observe(node);}update();}
let pending=false;new MutationObserver(records=>{if(records.every(r=>[...r.addedNodes,...r.removedNodes].every(n=>n.nodeType!==1||n.classList.contains('botanical-light'))))return;if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;scan();});}}).observe(document.querySelector('main')||document.body,{childList:true,subtree:true});
document.addEventListener('visibilitychange',update);reduce.addEventListener('change',update);scan();
})();
