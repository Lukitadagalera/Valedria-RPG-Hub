(() => {
 const make=(tag,text,cls)=>{const el=document.createElement(tag);if(text)el.textContent=text;if(cls)el.className=cls;return el;};
 const mount=document.getElementById('world-kingdoms');
 (window.REINOS||[]).forEach(k=>{const card=make('article',null,'world-kingdom');const img=make('img');img.src=k.img;img.alt=k.nome;img.loading='lazy';card.append(img);const body=make('div',null,'world-kingdom-body');body.append(make('span',k.regiao,'eyebrow'),make('h3',k.nome),make('p',k.descricao));const details=make('details');details.append(make('summary','Conheça as cidades e povoações'));k.cidades.forEach(c=>{const item=make('section');item.append(make('h4',c.nome),make('p',c.descricao));details.append(item);});body.append(details);card.append(body);mount.append(card);});
 document.getElementById('world-crossroads').textContent=window.ENCRUZILHADA?.descricao||'';
 (window.TERRAS_OUTROS_POVOS||[]).forEach(p=>{const card=make('article',null,'destination-card');card.append(make('span',p.regiao,'eyebrow'),make('h3',p.nome),make('p',p.descricao));document.getElementById('world-peoples').append(card);});
})();
