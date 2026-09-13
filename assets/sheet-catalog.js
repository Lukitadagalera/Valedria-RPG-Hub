window.SheetCatalog=function(options){
  'use strict';
  var state={itens:[],artefatos:[],pericias:[],foto:''},active='pericias',photoVersion=0;
  var $=function(s){return document.querySelector(s);};
  var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
  var catalog={pericias:window.PERICIAS||[],itens:window.ITENS_BASICOS||[],artefatos:window.ITENS||[]};
  var titles={pericias:'Escolher perícias',itens:'Itens e equipamentos',artefatos:'Artefatos mágicos'};
  function restrictions(c){return (c.condicao_de_uso?'<p class="catalog-effect"><strong>Condição de uso</strong> '+esc(c.condicao_de_uso)+'</p>':'')+(c.maldicao?'<p class="catalog-effect"><strong>Maldição</strong> '+esc(c.maldicao)+'</p>':'');}
  var dialog=document.createElement('dialog');dialog.className='sheet-catalog-dialog';dialog.setAttribute('aria-labelledby','catalog-title');
  dialog.innerHTML='<div class="catalog-head"><div><span class="eyebrow">Códice de Valédria</span><h2 id="catalog-title"></h2></div><button type="button" class="catalog-close" aria-label="Fechar catálogo">×</button></div><div class="catalog-tools"><label>Buscar<input type="search" id="catalog-search" placeholder="Nome ou descrição"></label><label><span id="catalog-filter-label">Categoria</span><select id="catalog-filter"></select></label></div><p id="catalog-count" role="status" aria-live="polite"></p><div id="catalog-grid" class="catalog-grid"></div><div class="catalog-foot"><span>As escolhas aparecem na sua ficha.</span><button type="button" class="btn btn-primary catalog-done">Concluir</button></div>';
  document.body.appendChild(dialog);
  function category(c){return active==='pericias'?c.atributo:active==='artefatos'?c.grau:c.categoria;}
  function normalize(s){return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
  function renderCatalogue(){
    var q=normalize($('#catalog-search').value),filter=$('#catalog-filter').value;
    var found=catalog[active].filter(function(c){return (!filter||category(c)===filter)&&normalize(c.nome+' '+(c.descricao||'')+' '+(c.efeito||'')).includes(q);});
    $('#catalog-count').textContent=found.length+' opções encontradas';
    var grid=$('#catalog-grid');grid.replaceChildren();
    found.forEach(function(c){
      var selected=state[active].some(function(x){return x.nome===c.nome;});
      var article=document.createElement('article');article.className='catalog-option'+(selected?' is-selected':'');
      article.innerHTML='<div class="catalog-meta"><span>'+esc(category(c))+'</span>'+(c.preco?'<strong>'+esc(c.preco)+'</strong>':'')+'</div><h3>'+esc(c.nome)+'</h3><p>'+esc(c.descricao)+'</p>'+(c.efeito?'<p class="catalog-effect"><strong>Efeito</strong> '+esc(c.efeito)+'</p>':'');
      var btn=document.createElement('button');btn.type='button';btn.className='btn btn-secondary';btn.textContent=selected?'Adicionado ✓':'Adicionar à ficha';btn.disabled=selected;btn.setAttribute('aria-label',(selected?'Adicionado: ':'Adicionar ')+c.nome);
      btn.addEventListener('click',function(){state[active].push(Object.assign({},c,active==='itens'?{quantidade:1}:{}));render();options.onChange();btn.disabled=true;btn.textContent='Adicionado ✓';article.classList.add('is-selected');$('#catalog-count').textContent=c.nome+' adicionado à ficha.';});
      article.insertAdjacentHTML('beforeend',restrictions(c));article.appendChild(btn);grid.appendChild(article);
    });
    if(!found.length)grid.textContent='Nenhuma opção encontrada. Tente outra busca ou categoria.';
  }
  function open(kind){active=kind;$('#catalog-title').textContent=titles[kind];$('#catalog-search').value='';$('#catalog-filter-label').textContent=kind==='pericias'?'Atributo':kind==='artefatos'?'Grau':'Categoria';$('#catalog-filter').innerHTML='<option value="">Todos</option>'+Array.from(new Set(catalog[kind].map(category))).map(function(x){return '<option>'+esc(x)+'</option>';}).join('');renderCatalogue();dialog.showModal();$('#catalog-search').focus();}
  $('.catalog-close').onclick=function(){dialog.close();};$('.catalog-done').onclick=function(){dialog.close();};
  dialog.addEventListener('click',function(e){if(e.target===dialog){var b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
  $('#catalog-search').addEventListener('input',renderCatalogue);$('#catalog-filter').addEventListener('change',renderCatalogue);
  $('#btn-add-pericia').onclick=function(){open('pericias');};$('#btn-add-item').onclick=function(){open('itens');};$('#btn-add-artefato').onclick=function(){open('artefatos');};
  function render(){
    ['pericias','itens','artefatos'].forEach(function(kind){
      var container=kind==='pericias'?$('#pericias-editor'):$('#pv-'+kind);
      if(kind!=='pericias')$('#'+kind+'-editor').replaceChildren();
      container.replaceChildren();
      if(!state[kind].length){var empty=document.createElement('p');empty.className='collection-empty';empty.textContent=kind==='pericias'?'Escolha as habilidades que seu personagem domina.':kind==='itens'?'Prepare sua mochila com itens do catálogo.':'Registre aqui as relíquias da sua jornada.';container.appendChild(empty);}
      state[kind].forEach(function(c,i){
        var row=document.createElement('article');row.className='collection-card';
        row.innerHTML='<div class="collection-heading"><h3>'+esc(c.nome)+'</h3><button type="button" class="collection-remove no-print" aria-label="Remover '+esc(c.nome)+'">×</button></div>'+(kind==='pericias'?'<p class="collection-badge">'+esc(c.atributo||'Perícia importada sem atributo')+'</p><p>'+esc(c.descricao||'Registro preservado da ficha anterior.')+'</p>':kind==='itens'?'<div class="collection-meta"><span>'+esc(c.categoria||'Item importado')+'</span><strong>'+esc(c.preco||'Preço não informado')+'</strong></div><p>'+esc(c.descricao)+'</p>':'<p class="collection-badge">'+esc([c.grau,c.tipo].filter(Boolean).join(' · ')||'Artefato importado')+'</p><p>'+esc(c.descricao)+'</p><p class="catalog-effect"><strong>Efeito</strong> '+esc(c.efeito||'Efeito não registrado')+'</p>');
        row.querySelector('button').onclick=function(){state[kind].splice(i,1);render();options.onChange();};
        if(kind==='itens'){var label=document.createElement('label');label.className='quantity-field';label.textContent='Quantidade';var input=document.createElement('input');input.type='number';input.min='1';input.max='999';input.value=c.quantidade||1;input.onchange=function(){c.quantidade=Math.max(1,Math.min(999,parseInt(input.value,10)||1));input.value=c.quantidade;options.onChange();};label.appendChild(input);row.appendChild(label);}
        if(kind==='artefatos')row.insertAdjacentHTML('beforeend',restrictions(c));container.appendChild(row);
      });
    });
    $('#f-foto-preview').hidden=!state.foto;$('#portrait-empty').hidden=!!state.foto;$('#foto-remover').hidden=!state.foto;$('#foto-ajustar').hidden=!state.foto;
    if(state.foto)$('#f-foto-preview').src=state.foto;else $('#f-foto-preview').removeAttribute('src');
  }
  function safePhoto(value){return typeof value==='string'&&value.length<1500000&&/^data:image\/(webp|png|jpeg);base64,[a-zA-Z0-9+/=]+$/.test(value)?value:'';}
  var crop=window.PortraitCrop(function(result){Object.assign(state,result);$('#foto-status').textContent='Retrato atualizado.';render();options.onChange();});
  $('#foto-ajustar').onclick=function(){crop.open(state.fotoOriginal||state.foto,state.fotoRecorte).catch(function(){$('#foto-status').textContent='Não foi possível abrir o retrato.';});};
  $('#foto-escolher').onclick=function(){$('#f-foto').click();};
  $('#f-foto').addEventListener('change',async function(e){
    var file=e.target.files[0],version=++photoVersion;e.target.value='';if(!file)return;
    if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>10*1024*1024){$('#foto-status').textContent='Escolha uma imagem PNG, JPG ou WebP com até 10 MB.';return;}
    $('#foto-status').textContent='Preparando retrato…';
    var url=URL.createObjectURL(file);
    try{var image=new Image();image.src=url;await image.decode();var scale=Math.min(1,1280/Math.max(image.width,image.height));var canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.width*scale));canvas.height=Math.max(1,Math.round(image.height*scale));canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);if(version!==photoVersion)return;await crop.open(canvas.toDataURL('image/webp',.88));$('#foto-status').textContent='Ajuste o enquadramento e aplique o recorte.';}catch(error){$('#foto-status').textContent='Não foi possível abrir essa imagem. Escolha outro arquivo.';}finally{URL.revokeObjectURL(url);}
  });
  $('#foto-remover').onclick=function(){photoVersion++;crop.cancel();state.foto='';state.fotoOriginal='';state.fotoRecorte=null;$('#foto-status').textContent='Retrato removido.';render();options.onChange();};
  render();
  return {
    get:function(){return JSON.parse(JSON.stringify(state));},
    set:function(s){
      photoVersion++;crop.cancel();state={itens:[],pericias:[],artefatos:[],foto:safePhoto(s.foto),fotoOriginal:safePhoto(s.fotoOriginal),fotoRecorte:s.fotoRecorte||null};
      (s.pericias||[]).forEach(function(c){var official=catalog.pericias.find(function(x){return x.nome===c.nome;});state.pericias.push(Object.assign({},c,official||{}));});
      (s.artefatos||[]).forEach(function(c){state.artefatos.push(Object.assign({},c));});
      (s.itens||[]).forEach(function(c){var magic=catalog.artefatos.find(function(x){return x.nome===c.nome;});var basic=catalog.itens.find(function(x){return x.nome===c.nome;});if(!s.versao&&(magic||c.efeito)){state.artefatos.push(Object.assign({},magic||{},c));}else state.itens.push(Object.assign({},basic||{},c,{quantidade:Math.max(1,Math.min(999,parseInt(c.quantidade,10)||1))}));});
      render();
    }
  };
};
