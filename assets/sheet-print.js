/* A document for printing, separate from editable controls. All user text stays text. */
window.SheetPrint = function(state, reserves) {
  document.getElementById('sheet-print')?.remove();
  const root = document.createElement('article'); root.id = 'sheet-print';
  const add = (parent, tag, text, className) => {const el=document.createElement(tag);el.textContent=text;if(className)el.className=className;parent.append(el);return el;};
  const header=add(root,'header','', 'print-identity');
  if(state.foto){const img=document.createElement('img');img.src=state.foto;img.alt='Retrato de '+state.nome;header.append(img);}
  const identity=add(header,'div','');
  add(identity,'p','VALÉDRIA · FICHA DE PERSONAGEM');
  add(identity,'h1',state.nome||'Personagem sem nome');
  add(identity,'p',[state.raca,state.subraca,state.papel,'Nível '+state.nivel].filter(Boolean).join(' · '));
  if(state.jogador)add(identity,'p','Jogador: '+state.jogador);
  add(identity,'p','Vida: '+state.vidaAtual+' / '+reserves.vida);
  add(identity,'p','Mana: '+state.manaAtual+' / '+reserves.mana+' · '+(state.caminho==='Magia'?state.manaPotencial:state.caminho==='Aura'?'Latente; Aura usa Fôlego':'Reserva; escolha Magia para conjurar'));
  if(state.caminho==='Aura')add(identity,'p','Fôlego: '+(reserves.aura==null?'Reservado — narrado pelo mestre':state.auraAtual+' / '+reserves.aura)+' · '+state.auraGrau);
  const attrs=add(root,'section','','print-attributes');
  Object.entries({forca:'Força',destreza:'Destreza',constituicao:'Constituição',sabedoria:'Sabedoria',carisma:'Carisma'}).forEach(([key,name])=>add(attrs,'p',name+': '+state.atributos[key]));
  const section=(title)=>{const el=add(root,'section','','print-section');add(el,'h2',title);return el;};
  const skills=section('Perícias');
  if(!state.pericias.length)add(skills,'p','Nenhuma perícia adicionada.');
  state.pericias.forEach(x=>add(skills,'p',x.nome+' — '+(x.atributo||'')+(x.descricao?' · '+x.descricao:'')));
  [['itens','Itens e equipamentos'],['artefatos','Artefatos mágicos']].forEach(([key,title])=>{
    const el=section(title);if(!state[key].length)add(el,'p','Nenhum registro.');
    state[key].forEach(x=>{const item=add(el,'div','','print-item');add(item,'h3',x.nome+(key==='itens'?' × '+(x.quantidade||1):''));add(item,'p',[x.categoria,x.grau,x.tipo,x.preco].filter(Boolean).join(' · '));
      [['descricao',''],['efeito','Efeito: '],['condicao_de_uso','Condição de uso: '],['maldicao','Maldição: ']].forEach(([field,label])=>{if(x[field])add(item,'p',label+x[field]);});});
  });
  [['personalidade','Personalidade'],['historia','História e motivações'],['notas','Notas de mesa']].forEach(([key,title])=>add(section(title),'p',state[key]||'Não preenchido.','print-prose'));
  document.body.append(root);
};