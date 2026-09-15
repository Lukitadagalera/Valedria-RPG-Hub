/* Membership is validated by the API; the public site never unlocks content locally. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let apiBase='', csrf='', account=null, library=null, favorites=[], mode='login', busy=false, generation=0, lastIdea='', ready=Promise.resolve();
 const configured=window.VALEDRIA_MASTER_CONFIG?.apiBase;
 if(configured){const u=new URL(configured,location.href);if(u.protocol==='https:' || (u.origin===location.origin && ['localhost','127.0.0.1'].includes(u.hostname)))apiBase=u.href.replace(/\/$/,'');}
 const message=(text)=>{const target=account?$('#member-message'):$('#mp-auth-message');target.textContent=text;if(text){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({block:'nearest'});}};
 async function api(path,body){
  if(!apiBase)throw new Error('As contas ainda estão em preparação. Nenhum dado foi enviado.');
  let response;
  try{response=await fetch(apiBase+path,{method:body===undefined?'GET':'POST',signal:AbortSignal.timeout(15000),credentials:'include',cache:'no-store',headers:{Accept:'application/json',...(body!==undefined?{'Content-Type':'application/json','X-CSRF-Token':csrf}:{})},...(body!==undefined?{body:JSON.stringify(body)}:{})});}
  catch{throw new Error('Não foi possível conectar ao acesso do Mestre. Confira se a versão de teste está aberta neste computador e tente novamente.');}
  if(response.status===401){clearMember();throw new Error('Sua sessão terminou. Entre novamente.');}
  if(response.status===403 && path==='/library'){clearPrivate();$('#mp-locked').hidden=false;throw new Error('Seu acesso ao acervo não está ativo.');}
  if(!response.ok)throw new Error(response.status===429?'Muitas tentativas. Aguarde alguns minutos e tente novamente.':path==='/login'&&response.status===400?'E-mail ou senha incorretos, ou e-mail ainda não confirmado. Confira e tente novamente.':'Não foi possível concluir. Confira seus dados ou tente novamente em instantes.');
  if(response.status!==204&&!response.headers.get('content-type')?.includes('application/json'))throw new Error('Este endereço não está conectado ao acesso do Mestre. Abra a versão de teste pelo link indicado.');
  return response.status===204?{}:response.json();
 }
 function storageKey(kind){return 'valedria-master:'+account.id+':'+kind;}
 function readLocal(kind,fallback){try{return JSON.parse(localStorage.getItem(storageKey(kind)))??fallback;}catch{return fallback;}}
 function clearPrivate(){generation++;window.ValedriaStudio?.clear();library=null;lastIdea='';favorites=[];$('#mp-workspace').hidden=true;$('#library-cards').replaceChildren();$('#reader-content').replaceChildren();$('#reader-title').textContent='';$('#reader-summary').textContent='';$('#session-notes').replaceChildren();$('#tool-result').replaceChildren();$('#mp-reader').close();}
 function clearMember(){clearPrivate();account=null;csrf='';$('#member-account').textContent='';$('#mp-member').hidden=true;$('#mp-public').hidden=false;}
 async function refresh(){
  const session=await api('/session');csrf=session.csrfToken||'';
  if(!session.user){clearMember();csrf=session.csrfToken||'';return;}
  if(account && account.id!==session.user.id)clearPrivate();
  account=session.user;$('#mp-public').hidden=true;$('#mp-member').hidden=false;$('#member-account').textContent=account.email||'Sua conta';
  const active=session.entitlement?.status==='active';$('#mp-locked').hidden=active;
  if(!active){clearPrivate();return;}
  const current=++generation;
  $('#member-message').textContent='Abrindo sua biblioteca…';
  const result=await api('/library');if(current!==generation)return;
  if(!Array.isArray(result.items)||!result.generators)throw new Error('A biblioteca está indisponível. Tente novamente em instantes.');
  library=result;const saved=readLocal('favorites',[]);favorites=Array.isArray(saved)?saved.filter(x=>typeof x==='string'):[];
  $('#library-category').innerHTML='<option value="">Todo o acervo</option>'+[...new Set(library.items.map(i=>i.category))].map(c=>'<option>'+esc(c)+'</option>').join('');
  $('#mp-workspace').hidden=false;$('#member-message').textContent='Acesso ativo · '+(session.entitlement.label||'Seu acervo está pronto.');renderLibrary();loadNotes();
  await window.ValedriaStudio?.open({api,user:account,plan:session.entitlement.plan||'contador'});
 }
 const screens={login:['Entrar na Área do Mestre','Acesse sua conta para abrir a biblioteca e preparar sua próxima sessão.','Entrar na minha área'],register:['Crie sua conta','Comece pelo seu e-mail. Criar uma conta não ativa nem cobra uma assinatura.','Criar minha conta'],recover:['Recuperar minha senha','Informe seu e-mail para receber as instruções de recuperação.','Enviar instruções'],reset:['Escolha uma nova senha','Use pelo menos 12 caracteres e uma senha exclusiva para esta conta.','Salvar nova senha']};
 function setMode(next){mode=next;const [title,intro,submit]=screens[next];$('#auth-title').textContent=title;$('#auth-intro').textContent=intro;$('#mp-submit').textContent=submit;$('#password-field').hidden=next==='recover';$('#mp-password').disabled=next==='recover';$('#mp-password').minLength=next==='register'||next==='reset'?12:1;$('#mp-password').autocomplete=next==='login'?'current-password':'new-password';$('#mp-password').value='';$('#mp-password').type='password';$('#mp-show').textContent='Mostrar';$('#mp-show').setAttribute('aria-pressed','false');$('#mp-email').disabled=next==='reset';$('#login-options').hidden=next!=='login';$$('[data-auth="register"]').forEach(e=>e.hidden=next!=='login');$$('[data-auth="login"]').forEach(e=>e.hidden=next==='login');message('');}
 $$('[data-auth]').forEach(b=>b.addEventListener('click',()=>{if(!busy)setMode(b.dataset.auth);}));
 $('#mp-show').addEventListener('click',e=>{const show=$('#mp-password').type==='password';$('#mp-password').type=show?'text':'password';e.currentTarget.textContent=show?'Ocultar':'Mostrar';e.currentTarget.setAttribute('aria-label',show?'Ocultar senha':'Mostrar senha');e.currentTarget.setAttribute('aria-pressed',String(show));});
 let resetToken=new URLSearchParams(location.hash.slice(1)).get('reset_token');
 const verifyToken=new URLSearchParams(location.hash.slice(1)).get('verify_token');
 if(verifyToken)history.replaceState(null,'',location.pathname+location.search);
 if(resetToken){history.replaceState(null,'',location.pathname+location.search);setMode('reset');}
 $('#mp-auth-form').addEventListener('submit',async e=>{
  e.preventDefault();if(busy)return;busy=true;$('#mp-submit').disabled=true;$('#mp-submit').textContent='Aguarde…';message('');
  try{
   await ready;
   if(!apiBase)throw new Error('As contas ainda estão em preparação. Nenhum dado foi enviado.');
   if(!csrf){const session=await api('/session');csrf=session.csrfToken||'';}
   const body={email:$('#mp-email').value.trim(),password:$('#mp-password').value,remember:$('#mp-remember').checked};
   if(mode==='recover'){await api('/password-reset',{email:body.email});message('Se houver uma conta com esse e-mail, você receberá as instruções de recuperação.');}
   else if(mode==='register'){await api('/register',{email:body.email,password:body.password});message('Confira seu e-mail para os próximos passos. A assinatura não é ativada ao criar a conta.');}
   else if(mode==='reset'){await api('/password-update',{token:resetToken,password:body.password});resetToken=null;csrf='';setMode('login');message('Senha atualizada. Entre com sua nova senha.');}
   else{await api('/login',body);await refresh();$('#mp-password').value='';$('#member-title').setAttribute('tabindex','-1');$('#member-title').focus();$('#mp-member').scrollIntoView({block:'start'});}
  }catch(error){message(error.message);}finally{busy=false;$('#mp-submit').disabled=false;$('#mp-submit').textContent=screens[mode][2];}
 });
 $('#mp-logout').addEventListener('click',async()=>{try{await api('/logout',{});clearMember();setMode('login');message('Você saiu da conta.');}catch(e){$('#member-message').textContent='Não foi possível encerrar a sessão no servidor. Tente sair novamente.';}});
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
 if(apiBase){
  $('#launch-notice').hidden=true;
  ready=(resetToken||verifyToken?api('/session').then(s=>{csrf=s.csrfToken||'';}):refresh()).catch(e=>message(e.message));
  ready.then(async()=>{if(verifyToken){await api('/verify-email',{token:verifyToken});message('E-mail confirmado. Entre com sua senha.');}}).catch(e=>message(e.message));
 }else{
  $('#mp-auth-form').hidden=true;$('.mp-account-links').hidden=true;
  $('#auth-intro').textContent='O login desta apresentação pública ainda não está ativado. Para revisar o conteúdo agora, abra a versão de teste neste computador.';
  $('#launch-notice').textContent='A conta de teste funciona no endereço local, com o serviço de teste em execução.';
  $('#mp-local-test').hidden=false;
 }
 // Revalidate after returning to the page. Never persist the private library offline.
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&account)refresh().catch(e=>$('#member-message').textContent=e.message);});
})();
