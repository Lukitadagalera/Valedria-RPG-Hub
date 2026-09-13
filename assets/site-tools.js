/* Shared deep links keep search results and the atlas connected to the books. */
(() => {
  const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const used=new Set([...document.querySelectorAll('[id]')].map(x=>x.id));
  document.querySelectorAll('main h2,main h3,main h4').forEach(h=>{
    if(h.id)return;const stem='entrada-'+slug(h.textContent);let id=stem,i=2;while(used.has(id))id=stem+'-'+i++;h.id=id;used.add(id);
  });
  // Search entries can target text inside generated tables as well as headings.
  const target=new URLSearchParams(location.search).get('encontrar');
  if(target){
    const normalized=slug(target);
    const candidates=[...document.querySelectorAll('main h2,main h3,main h4,main td strong,main td')];
    const found=candidates.find(el=>slug(el.textContent)===normalized)||candidates.find(el=>slug(el.textContent).startsWith(normalized+'-'));
    if(found){found.classList.add('search-target');found.setAttribute('tabindex','-1');requestAnimationFrame(()=>{found.scrollIntoView({block:'center'});found.focus({preventScroll:true});});}
  } else if(location.hash){
    const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if(target)requestAnimationFrame(()=>target.scrollIntoView());
  }
})();
