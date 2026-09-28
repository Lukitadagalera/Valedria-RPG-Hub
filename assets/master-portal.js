/* One account session: production API or explicitly labelled local demonstration. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let csrf='', account=null, library=null, favorites=[], generation=0, lastIdea='', ready=Promise.resolve();
 const message=(text)=>{const target=account?$('#member-message'):$('#mp-auth-message');target.textContent=text;if(text){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({block:'nearest'});}};
 async function api(path,body){return window.ValedriaSession.request(path,body);}
 function storageKey(kind){return 'valedria-master:'+account.id+':'+kind;}
 function readLocal(kind,fallback){try{return JSON.parse(localStorage.getItem(storageKey(kind)))??fallback;}catch{return fallback;}}
 function clearPrivate(){generation++;$('#member-plan').hidden=true;$('#member-plan').replaceChildren();window.ValedriaStudio?.clear();library=null;lastIdea='';favorites=[];$('#mp-workspace').hidden=true;$('#library-cards').replaceChildren();$('#reader-content').replaceChildren();$('#reader-title').textContent='';$('#reader-summary').textContent='';$('#session-notes').replaceChildren();$('#tool-result').replaceChildren();$('#mp-reader').close();}
 function clearMember(){clearPrivate();account=null;csrf='';$('#member-account').textContent='';$('#mp-member').hidden=true;$('#mp-public').hidden=false;}
 async function refresh(){
  const session=await api('/session');csrf=session.csrfToken||'';
  if(!session.user){clearMember();csrf=session.csrfToken||'';return;}
  if(account && account.id!==session.user.id)clearPrivate();
  account=session.user;$('#mp-public').hidden=true;$('#mp-member').hidden=false;$('#member-account').textContent=(account.email||'Sua conta')+(window.ValedriaSession.demo?' · Demonstração salva neste navegador':'');
  const active=session.entitlement?.status==='active';$('#mp-locked').hidden=active;
  if(!active){clearPrivate();location.replace('conta.html#assinatura');return;}
  const current=++generation;
  $('#member-message').textContent='Abrindo sua biblioteca…';
  const result=await api('/library');if(current!==generation)return;
  if(!Array.isArray(result.items)||!result.generators)throw new Error('A biblioteca está indisponível. Tente novamente em instantes.');
  library=result;const saved=readLocal('favorites',[]);favorites=Array.isArray(saved)?saved.filter(x=>typeof x==='string'):[];
  $('#library-category').innerHTML='<option value="">Todo o acervo</option>'+[...new Set(library.items.map(i=>i.category))].map(c=>'<option>'+esc(c)+'</option>').join('');
  $('#mp-workspace').hidden=false;$('#member-message').textContent='';
  const planIndex={contador:0,mestre:1,deus:2}[session.entitlement.plan||'contador'];
  const source=$$('#assinaturas .mp-plan')[planIndex];
  const planMount=$('#member-plan');planMount.replaceChildren();planMount.hidden=!source;
  if(source){
   const card=document.createElement('article');card.className='mp-panel mp-plan';
   const artwork=source.querySelector('img').cloneNode(true);artwork.loading='eager';
   const banner='assets/img/assinaturas/'+['contador','mestre','deus'][planIndex]+'-panorama';
   artwork.src=banner+'.webp';artwork.srcset=banner+'-960.webp 960w, '+banner+'.webp 2172w';
   artwork.sizes='(max-width:760px) calc(100vw - 32px), (max-width:1440px) calc(100vw - 56px), 1384px';
   artwork.width=2172;artwork.height=724;
   const copy=document.createElement('div');copy.className='mp-plan-copy';
   const status=document.createElement('span');status.className='mp-tag';status.textContent='Acesso ativo';
   const title=document.createElement('h2');title.textContent=source.querySelector('h3').textContent;
   copy.append(status,title);card.append(artwork,copy);planMount.append(card);
  }
  renderLibrary();loadNotes();
  await window.ValedriaStudio?.open({api,user:account,plan:session.entitlement.plan||'contador'});
 }
 const authToken=new URLSearchParams(location.hash.slice(1));if(authToken.has('verify_token')||authToken.has('reset_token'))location.replace('conta.html'+location.hash);
 $('#mp-logout').addEventListener('click',async()=>{try{await api('/logout',{});clearMember();location.href='conta.html';}catch(e){$('#member-message').textContent='Não foi possível encerrar a sessão no servidor. Tente sair novamente.';}});
 $('#mp-check-access').addEventListener('click',()=>refresh().catch(e=>$('#member-message').textContent=e.message));
 function panel(name){$$('#mp-workspace > section').forEach(s=>s.hidden=s.id!=='panel-'+name);$$('[data-panel]').forEach(b=>{if(b.dataset.panel===name)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});}
 $('.mp-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-panel]');if(b)panel(b.dataset.panel);});
 function renderLibrary(){if(!library)return;const term=$('#library-search').value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();const cat=$('#library-category').value;
  const items=library.items.filter(i=>(!cat||i.category===cat)&&(!$('#library-favorites').checked||favorites.includes(i.id))&&JSON.stringify([i.title,i.summary,i.tags]).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(term));
  $('#library-count').textContent=items.length+' materiais';$('#library-cards').innerHTML=items.map(i=>'<article class="mp-panel"><span class="eyebrow">'+esc(i.category)+'</span><h3>'+esc(i.title)+'</h3><p>'+esc(i.summary)+'</p><div class="mp-card-actions"><button class="btn btn-secondary" data-read="'+esc(i.id)+'">Abrir leitura →</button><button class="mp-favorite" data-favorite="'+esc(i.id)+'" aria-label="'+(favorites.includes(i.id)?'Remover dos':'Adicionar aos')+' favoritos: '+esc(i.title)+'" aria-pressed="'+favorites.includes(i.id)+'">'+(favorites.includes(i.id)?'★':'☆')+'</button></div></article>').join('')||'<p class="mp-empty">Nenhum material encontrado. Experimente outro assunto ou categoria.</p>';
 }
 ['library-search','library-category','library-favorites'].forEach(id=>$('#'+id).addEventListener('input',renderLibrary));
 $('#library-cards').addEventListener('click',e=>{const read=e.target.closest('[data-read]'),fav=e.target.closest('[data-favorite]');if(read)openReader(read.dataset.read);if(fav){const id=fav.dataset.favorite;favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];try{localStorage.setItem(storageKey('favorites'),JSON.stringify(favorites));}catch{$('#member-message').textContent='Favoritos disponíveis nesta sessão; o navegador não permitiu salvar.';}renderLibrary();}});
 function openReader(id){const item=library?.items.find(i=>i.id===id);if(!item)return;$('#reader-title').textContent=item.title;$('#reader-category').textContent=item.category;$('#reader-summary').textContent=item.summary;$('#reader-content').innerHTML=item.sections.map(s=>'<section><h3>'+esc(s.title)+'</h3>'+(s.text?'<p>'+esc(s.text)+'</p>':'')+(s.points?'<ul>'+s.points.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':'')+(s.rows?'<div class="mp-table-scroll" tabindex="0" aria-label="Tabela com rolagem horizontal"><table><thead><tr>'+s.headers.map(h=>'<th scope="col">'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+s.rows.map(row=>'<tr>'+row.map(c=>'<td>'+esc(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>':'')+'</section>').join('');$('#mp-reader').showModal();$('#mp-reader').scrollTop=0;}
 $('#reader-close').addEventListener('click',()=>$('#mp-reader').close());
 const pick=values=>values[Math.floor(Math.random()*values.length)],names={problemas:'Problema',interessados:'Interessado',complicacoes:'Complicação',consequencias:'Consequência',nome:'Nome',ocupacao:'Ocupação',desejo:'Desejo',complicacao:'Complicação',titulo:'Encontro',sinal:'Sinal',situacao:'Situação',escolha:'Escolha',consequencia:'Consequência'};
 $$('[data-generate]').forEach(b=>b.addEventListener('click',()=>{if(!library)return;const key=b.dataset.generate,data=library.generators[key];let entries;if(key==='rumores')entries=[['Rumor',pick(data)]];else if(key==='encontros')entries=Object.entries(pick(data)).map(([k,v])=>[names[k]||k,v]);else entries=Object.entries(data).map(([k,v])=>[names[k]||k,pick(v)]);lastIdea=entries.map(([k,v])=>k+': '+v).join('\n');$('#tool-result').innerHTML=entries.map(([k,v])=>'<p><strong>'+esc(k)+':</strong> '+esc(v)+'</p>').join('');$('#tool-to-notes').hidden=false;}));
 const fields={titulo:'Campanha e sessão',abertura:'Cena de abertura',cenas:'Cenas e locais',personagens:'Personagens e interesses',pistas:'Pistas e revelações',consequencias:'Escolhas e consequências',ideias:'Ideias e improvisos'};
 function loadNotes(){const saved=readLocal('notes',{});$('#session-notes').innerHTML=Object.entries(fields).map(([key,label])=>'<label>'+label+'<textarea name="'+key+'" maxlength="20000">'+esc(typeof saved[key]==='string'?saved[key]:'')+'</textarea></label>').join('');}
 function saveNotes(){const data=Object.fromEntries(new FormData($('#session-notes')));try{localStorage.setItem(storageKey('notes'),JSON.stringify(data));$('#notes-status').textContent='Caderno salvo neste navegador.';}catch{$('#notes-status').textContent='O navegador não permitiu salvar. Exporte uma cópia antes de sair.';}return data;}
 $('#session-notes').addEventListener('input',saveNotes);$('#session-notes').addEventListener('submit',e=>e.preventDefault());
 $('#tool-to-notes').addEventListener('click',()=>{const el=$('#session-notes [name="ideias"]');if((el.value+'\n\n'+lastIdea).length>20000){$('#member-message').textContent='O campo de ideias está cheio. Exporte o caderno antes de reorganizá-lo.';return;}el.value+=(el.value?'\n\n':'')+lastIdea;saveNotes();panel('notes');el.focus();});
 $('#notes-export').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({format:'valedria-master-notes',version:1,notes:saveNotes()},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='valedria-caderno-do-mestre.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 $('#notes-import').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>1000000)throw Error();const data=JSON.parse(await file.text());if(data.format!=='valedria-master-notes'||data.version!==1||!data.notes||Object.keys(fields).some(k=>typeof data.notes[k]!=='string'||data.notes[k].length>20000))throw Error();if(!confirm('Substituir as anotações atuais pelo caderno importado? Exporte uma cópia antes, se quiser mantê-las.'))return;Object.keys(fields).forEach(k=>$('#session-notes [name="'+k+'"]').value=data.notes[k]);saveNotes();}catch{$('#notes-status').textContent='Arquivo inválido. Escolha um caderno exportado por esta área.';}finally{e.target.value='';}});
 ready=refresh().catch(e=>message(e.message));
 // Revalidate after returning to the page. Never persist the private library offline.
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&account)refresh().catch(e=>$('#member-message').textContent=e.message);});
})();
