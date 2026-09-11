/* The atlas shares the geography catalogue; every marker opens a complete entry. */
(function(){
  'use strict';
  var wrap=document.getElementById('mapa-wrap'),viewport=document.getElementById('atlas-viewport');
  if(!wrap||!viewport)return;
  var points=window.MAPA_PONTOS,search=document.getElementById('atlas-search'),region=document.getElementById('atlas-region');
  var results=document.getElementById('atlas-results'),count=document.getElementById('atlas-count');
  var zoom=1,base=0;
  var img=document.createElement('img');img.src=window.MAPA_IMAGEM;img.alt='Atlas de Valédria: reinos, territórios, rios, montanhas e localidades numeradas.';img.width=1800;img.height=1500;wrap.appendChild(img);
  var markers=new Map();
  points.forEach(function(p){
    var marker=document.createElement('button');marker.type='button';marker.className='mapa-ponto';marker.style.left=p.x+'%';marker.style.top=p.y+'%';marker.textContent=p.numero;marker.title=p.nome+' — '+p.tipo;marker.setAttribute('aria-label',p.numero+'. '+p.nome+' — '+p.tipo);marker.addEventListener('click',function(){window.abrirAtlasLocal(p);});wrap.appendChild(marker);markers.set(p.id,marker);
  });
  Array.from(new Set(points.map(function(p){return p.reino;}))).forEach(function(name){var o=document.createElement('option');o.value=name;o.textContent=name;region.appendChild(o);});
  function normalize(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
  function render(){
    var q=normalize(search.value.trim());var filtered=points.filter(function(p){return (!region.value||p.reino===region.value)&&normalize(p.nome+' '+p.reino+' '+p.tipo).includes(q);});
    results.replaceChildren();count.textContent=filtered.length+' de '+points.length+' localidades';
    if(!filtered.length){var empty=document.createElement('p');empty.textContent='Nenhuma localidade encontrada. Experimente outro nome ou território.';results.appendChild(empty);}
    filtered.forEach(function(p){var button=document.createElement('button');button.type='button';button.className='atlas-result';var n=document.createElement('b');n.textContent=p.numero;var text=document.createElement('span');var name=document.createElement('strong');name.textContent=p.nome;var meta=document.createElement('small');meta.textContent=p.tipo+' · '+p.reino;text.append(name,meta);button.append(n,text);button.addEventListener('click',function(){viewport.scrollLeft=wrap.clientWidth*p.x/100-viewport.clientWidth/2;viewport.scrollTop=wrap.clientHeight*p.y/100-viewport.clientHeight/2;window.abrirAtlasLocal(p);});results.appendChild(button);});
  }
  search.addEventListener('input',render);region.addEventListener('change',render);render();
  function size(){var old=base||Math.max(680,viewport.clientWidth);var cx=(viewport.scrollLeft+viewport.clientWidth/2)/(old*zoom);var cy=(viewport.scrollTop+viewport.clientHeight/2)/(old*zoom*5/6);base=Math.max(680,viewport.clientWidth);wrap.style.width=base*zoom+'px';viewport.scrollLeft=cx*base*zoom-viewport.clientWidth/2;viewport.scrollTop=cy*base*zoom*5/6-viewport.clientHeight/2;}
  function setZoom(next){var w=wrap.clientWidth;var cx=(viewport.scrollLeft+viewport.clientWidth/2)/w,cy=(viewport.scrollTop+viewport.clientHeight/2)/(w*5/6);zoom=Math.max(1,Math.min(3,next));wrap.style.width=base*zoom+'px';viewport.scrollLeft=cx*base*zoom-viewport.clientWidth/2;viewport.scrollTop=cy*base*zoom*5/6-viewport.clientHeight/2;document.getElementById('atlas-in').disabled=zoom===3;document.getElementById('atlas-out').disabled=zoom===1;}
  document.getElementById('atlas-in').addEventListener('click',function(){setZoom(zoom+.5);});document.getElementById('atlas-out').addEventListener('click',function(){setZoom(zoom-.5);});document.getElementById('atlas-fit').addEventListener('click',function(){setZoom(1);viewport.scrollTop=0;viewport.scrollLeft=0;});
  size();setZoom(1);window.addEventListener('resize',size);
  var routes=document.getElementById('atlas-routes');window.MAPA_ROTAS.forEach(function(r){var article=document.createElement('article');var h=document.createElement('h3');h.textContent=r.nome;var line=document.createElement('p');line.textContent=r.locais.join(' → ');var desc=document.createElement('p');desc.textContent=r.descricao;article.append(h,line,desc);routes.appendChild(article);});
})();
