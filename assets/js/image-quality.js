/* Select pixels for the visible crop, not just the width of its container. */
(()=>{
 const seen=new WeakSet(),active=new WeakSet();
 function source(img){const url=new URL(img.getAttribute('src')||'',location.href);const start=url.pathname.indexOf('/assets/');return start<0?'':url.pathname.slice(start+1).replace(/-(480|960|1440|1920)\.webp$/,'.webp');}
 function update(img){const info=window.VALEDRIA_IMAGES?.[source(img)];if(!info)return;const box=img.getBoundingClientRect();if(!box.width||!box.height)return;const cover=getComputedStyle(img).objectFit==='cover';const demand=Math.max(box.width,cover?box.height*info.width/info.height:0);const boost=matchMedia('(min-width:1000px)').matches?1.35:1;const sizes=Math.ceil(Math.min(info.width,demand*boost))+'px';if(img.sizes!==sizes)img.sizes=sizes;}
 const resize=new ResizeObserver(entries=>{for(const e of entries)if(active.has(e.target))update(e.target);});
 const visible=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){active.add(e.target);update(e.target);}else active.delete(e.target);}},{rootMargin:'180px'});
 function attach(img){if(seen.has(img))return;seen.add(img);const path=source(img),info=window.VALEDRIA_IMAGES?.[path];if(!info)return;img.decoding='async';img.srcset=info.srcset.replace(/\.webp /g,'.webp?v=hd2 ');if(!img.closest('.hero-art-slot'))img.loading='lazy';resize.observe(img);visible.observe(img);}
 document.querySelectorAll('img').forEach(attach);
 new MutationObserver(records=>{for(const r of records)for(const n of r.removedNodes)if(n.nodeType===1&&!n.isConnected){const images=[...(n.matches('img')?[n]:[]),...n.querySelectorAll('img')];for(const i of images){resize.unobserve(i);visible.unobserve(i);active.delete(i);seen.delete(i);}}for(const r of records)for(const n of r.addedNodes)if(n.nodeType===1){if(n.matches('img'))attach(n);n.querySelectorAll('img').forEach(attach);}}).observe(document.body,{childList:true,subtree:true});
})();
