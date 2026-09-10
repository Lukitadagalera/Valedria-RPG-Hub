/* Navegação e leitura: complementa as ferramentas originais. */
document.addEventListener('DOMContentLoaded',function(){
 const menu=document.querySelector('[data-menu-toggle]');
 const close=()=>{document.body.classList.remove('nav-open');menu?.setAttribute('aria-expanded','false');};
 menu?.addEventListener('click',()=>menu.setAttribute('aria-expanded',String(document.body.classList.contains('nav-open'))));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();}});
 document.querySelectorAll('.primary-nav a').forEach(a=>a.addEventListener('click',close));
 document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))close();});
 const reading=document.querySelector('#reading-links');
 if(reading){document.querySelectorAll('main section').forEach((section,i)=>{const h=section.querySelector('h2');if(!h)return;if(!section.id)section.id='secao-'+(i+1);const a=document.createElement('a');a.href='#'+section.id;a.textContent=h.textContent;reading.append(a);});if(!reading.children.length)reading.parentElement.hidden=true;}
 const contents=document.querySelector('.book-sidebar details');
 if(contents){const desktop=window.matchMedia('(min-width: 1101px)');const sync=()=>{contents.open=desktop.matches;};sync();desktop.addEventListener('change',sync);contents.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{if(!desktop.matches)contents.open=false;}));}
 const hall=document.querySelector('#hall-entries');
 if(hall && window.VALEDRIA_HALL?.length){const examples=document.querySelector('.hall-illustrations');if(examples)examples.hidden=true;window.VALEDRIA_HALL.forEach(p=>{const card=document.createElement('article');card.className='hall-player';if(p.retrato){const img=document.createElement('img');img.src=p.retrato;img.alt=p.nome;img.loading='lazy';card.append(img);}const h=document.createElement('h2');h.textContent=p.nome;const meta=document.createElement('p');meta.textContent=[p.jogador,p.campanha].filter(Boolean).join(' · ');card.append(h,meta);const ul=document.createElement('ul');(p.feitos||[]).forEach(f=>{const li=document.createElement('li');li.textContent=f;ul.append(li);});card.append(ul);hall.append(card);});}
});
