/* Printable character record; text is inserted as text, never as markup. */
window.SheetPrint=function(state,reserves){
 document.getElementById('sheet-print')?.remove();const root=document.createElement('article');root.id='sheet-print';root.printPayload={state:{...state,fotoOriginal:undefined,montariaOriginal:undefined},reserves};
 const add=(p,t,txt,c)=>{const e=document.createElement(t);if(txt!=null)e.textContent=txt;if(c)e.className=c;p.append(e);return e;};
 const page=title=>{const s=add(root,'section','','print-page');const deco=add(s,'img',null,'print-decoration');deco.src=new URL('assets/img/decoracao/painel-floral-claro.webp',location.href).href;deco.alt='';const head=add(s,'header','','print-brand');add(head,'span','✧');add(head,'div','VALÉDRIA · CÓDICE DO MUNDO');add(head,'small',title);return s;};
 const block=(p,title,txt,lines=0)=>{const s=add(p,'section','','print-section');add(s,'h2',title);if(txt)add(s,'p',txt,'print-prose');else{const l=add(s,'div','','print-lines');l.style.minHeight=(lines||24)+'mm';for(let i=0;i<Math.floor((lines||24)/7);i++)add(l,'div','','print-rule');l.setAttribute('aria-label','Espaço para preencher à mão');}return s;};
 const a=page('Registro de aventureiro');const head=add(a,'section','','print-identity');const identity=add(head,'div','');add(identity,'small','PERSONAGEM');add(identity,'h1',state.nome||' ',state.nome?'':'print-name-blank');add(identity,'p','Jogador: '+(state.jogador||'____________________________'));add(identity,'p',[state.raca||'Raça: __________',state.subraca,state.papel||'Papel: __________','Nível '+state.nivel].filter(Boolean).join(' · '));
 const portrait=add(head,'div','','print-portrait');if(state.foto){const im=add(portrait,'img');im.src=state.foto;im.alt='Retrato';}else add(portrait,'span','Retrato do personagem');
 const attrs=add(a,'section','','print-attributes');Object.entries({forca:'Força',destreza:'Destreza',constituicao:'Constituição',sabedoria:'Sabedoria',carisma:'Carisma'}).forEach(([key,label])=>{const box=add(attrs,'div','');add(box,'strong',String((reserves.atributos||state.atributos)[key]));add(box,'span',label);});
 const resources=add(a,'section','','print-resources');for(const [label,value]of [['Vida',state.vidaAtual+' / '+reserves.vida],['Mana',state.manaAtual+' / '+reserves.mana],...(state.caminho==='Aura'?[['Fôlego',reserves.aura==null?'Narrativo':state.auraAtual+' / '+reserves.aura]]:[])]){const box=add(resources,'div','');add(box,'small',label);add(box,'strong',value);add(box,'span','Atual: __________');}
 add(a,'p','Defesa: '+(reserves.defesa??'—')+' · Armadura: '+({nenhuma:'Nenhuma',leve:'Leve',media:'Média',pesada:'Pesada'}[state.armadura]||'Nenhuma')+' · Escudo: '+(state.escudo==='sim'?'Sim':'Não'),'print-caption');
 add(a,'p','Caminho: '+(state.caminho||'Nenhum')+' · Potencial de Mana: '+state.manaPotencial+(state.caminho==='Aura'?' · '+(state.auraCaminho||'Caminho não escolhido')+' · Grau: '+state.auraGrau:''),'print-caption');
 const role=window.VALEDRIA_PAPEIS?.find(r=>r.nome===state.papel);if(role)add(a,'p','Vantagem de papel · 1 vez por cena, com validação do mestre: '+role.vantagem,'print-caption');
 const skills=block(a,'Perícias e habilidades',null,state.pericias.length?0:20);if(state.pericias.length){skills.lastChild.remove();for(const x of state.pericias){const r=add(skills,'div','','print-item');add(r,'strong',x.nome);add(r,'p',[x.atributo,x.descricao].filter(Boolean).join(' · '));}}
 for(const [key,title]of [['itens','Itens e equipamentos'],['artefatos','Artefatos mágicos']]){const b=block(a,title,null,state[key].length?0:20);if(state[key].length){b.lastChild.remove();for(const x of state[key]){const r=add(b,'div','','print-item');add(r,'h3',x.nome+(key==='itens'?' × '+(x.quantidade||1):''));add(r,'p',[x.categoria,x.grau,x.preco,x.descricao,x.efeito,x.condicao_de_uso,x.maldicao].filter(Boolean).join(' · '));}}}
 add(a,'footer','VALÉDRIA · Seus feitos escrevem sua história.','print-footer');
 const b=page('História e diário de jornada');add(b,'h1',state.nome||'Diário do aventureiro');
 if(state.montaria){const m=block(b,'Montaria');m.lastChild.remove();const im=add(m,'img',null,'print-mount');im.src=state.montaria;im.alt='Montaria';const spec=(window.VALEDRIA_MONTARIAS||[]).find(x=>x.id===state.montariaId);if(spec)add(m,'p',spec.nome+' · Movimento '+spec.movimento+' m · Vida '+spec.vida+' · Defesa '+spec.defesa+'. '+spec.beneficio);}
 block(b,'Personalidade',state.personalidade,30);block(b,'História e motivações',state.historia,60);block(b,'Notas de mesa',state.notas,55);add(b,'footer','VALÉDRIA · Continue sua jornada.','print-footer');document.body.append(root);return root;
};

// Printing has its own page, outside the scrolling dialog and site styles.
window.PrintCharacterDocument=function(root){
 try{sessionStorage.setItem('valedria-print-document',JSON.stringify(root.printPayload));location.href='ficha-impressao.html';}
 catch{alert('Não foi possível preparar a impressão. Exporte a ficha para guardar uma cópia e tente com imagens menores.');}
};
