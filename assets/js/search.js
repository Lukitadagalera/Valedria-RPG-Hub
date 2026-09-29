(() => {
  const input=document.getElementById('codex-query'),filter=document.getElementById('codex-category'),results=document.getElementById('codex-results'),status=document.getElementById('codex-status'),more=document.getElementById('codex-more');
  const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  let entries=[],limit=30;
  const query=new URLSearchParams(location.search);input.value=query.get('q')||'';
  function render(){
    const q=normalize(input.value.trim()),words=q.split(/\s+/).filter(Boolean);
    const list=entries.filter(e=>(!filter.value||e.category===filter.value)&&words.every(w=>e.normalized.includes(w))).map(e=>({e,score:normalize(e.title)===q?3:normalize(e.title).includes(q)?2:1})).sort((a,b)=>b.score-a.score||a.e.title.localeCompare(b.e.title,'pt-BR')).map(x=>x.e);
    results.replaceChildren();status.textContent=list.length+' resultados'+(q?' para “'+input.value.trim()+'”':' no códice')+'.';
    list.slice(0,limit).forEach(e=>{
      const article=document.createElement('article');article.className='card search-result';
      const category=document.createElement('span');category.className='eyebrow';category.textContent=e.category;
      const h=document.createElement('h2'),a=document.createElement('a');a.textContent=e.title;const url=new URL(e.url,location.href);url.searchParams.set('theme',document.documentElement.dataset.theme||'dark');a.href=url.href;h.append(a);
      const text=document.createElement('p');text.textContent=e.text.slice(0,260)+(e.text.length>260?'…':'');article.append(category,h,text);results.append(article);
    });
    if(!list.length){const p=document.createElement('p');p.textContent='Nada encontrado. Tente um nome mais curto, outra palavra ou todos os assuntos.';results.append(p);}
    more.hidden=list.length<=limit;
    const url=new URL(location.href);if(input.value.trim())url.searchParams.set('q',input.value.trim());else url.searchParams.delete('q');if(filter.value)url.searchParams.set('assunto',filter.value);else url.searchParams.delete('assunto');history.replaceState(null,'',url);
  }
  document.getElementById('codex-search').addEventListener('submit',e=>{e.preventDefault();limit=30;render();});
  let timer;input.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>{limit=30;render();},180);});filter.addEventListener('change',()=>{limit=30;render();});more.addEventListener('click',()=>{limit+=30;render();});
  fetch('assets/data/search-index.json?v=1').then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{
    entries=data.map(e=>({...e,normalized:normalize(e.title+' '+e.text+' '+e.category)}));
    [...new Set(entries.map(e=>e.category))].sort((a,b)=>a.localeCompare(b,'pt-BR')).forEach(category=>{const o=document.createElement('option');o.value=o.textContent=category;filter.append(o);});
    filter.value=query.get('assunto')||'';render();
  }).catch(()=>{status.textContent='Não foi possível carregar a busca. Recarregue a página ou consulte os livros.';});
})();
