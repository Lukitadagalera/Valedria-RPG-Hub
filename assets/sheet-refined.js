/* Enhance the existing sheet without replacing its controls or saved data. */
(function(){
 'use strict';
 var form=document.getElementById('ficha-form');if(!form)return;
 var layout=form.parentElement,preview=layout.querySelector('.sheet-preview');
 var cards=Array.from(form.children).filter(function(n){return n.classList.contains('card');});
 if(cards.length!==9||!preview)return;
 document.body.classList.add('character-sheet');
 layout.classList.add('sheet-refined');
 var header=preview.firstElementChild;header.classList.add('sheet-dossier');
 var label=document.createElement('span');label.className='eyebrow';label.textContent='Valédria · Registro de aventureiro';header.prepend(label);
 form.prepend(header);
 var tabs=document.createElement('div');tabs.className='sheet-tabs no-print';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Seções da ficha');
 header.after(tabs);
 var names=['Personagem','Atributos e poder','Perícias e equipamento','História e notas'];
 var panels=names.map(function(name,i){
  var button=document.createElement('button');button.type='button';button.id='sheet-tab-'+i;button.setAttribute('role','tab');button.setAttribute('aria-controls','sheet-panel-'+i);button.textContent=name;tabs.append(button);
  var panel=document.createElement('section');panel.id='sheet-panel-'+i;panel.className='sheet-tab-panel';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',button.id);panel.tabIndex=0;form.insertBefore(panel,cards[0]);
  button.addEventListener('click',function(){activate(i,false);});
  button.addEventListener('keydown',function(e){var next;if(e.key==='ArrowRight')next=(i+1)%names.length;if(e.key==='ArrowLeft')next=(i+names.length-1)%names.length;if(e.key==='Home')next=0;if(e.key==='End')next=names.length-1;if(next!=null){e.preventDefault();activate(next,true);}});
  return panel;
 });
 function activate(index,focus){panels.forEach(function(p,i){p.hidden=i!==index;var b=tabs.children[i];b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;});if(hint)hint.textContent=['Comece pela identidade. Depois distribua os atributos e escolha suas perícias e equipamentos.','Distribua seus pontos e acompanhe a reserva de poder durante a sessão.','Prepare suas habilidades e sua mochila. Cada escolha fica reunida aqui.','Registre quem seu personagem é e o que acontece ao longo da jornada.'][index];if(focus)tabs.children[index].focus();}
 panels[0].classList.add('sheet-identity');panels[0].append(cards[0],cards[1]);
 panels[1].append(cards[3],cards[2]);
 panels[2].classList.add('sheet-collections');
 // Keep a single editable inventory and the existing remove/quantity controls.
 [4,5,6].forEach(function(index){panels[2].append(cards[index]);});
 cards[5].append(document.getElementById('pv-itens'));
 cards[6].append(document.getElementById('pv-artefatos'));
 // The live skills summary stays available for readers and existing preview logic.
 var skillsPreview=document.getElementById('pv-pericias');skillsPreview.closest('.card').hidden=true;
 panels[3].append(cards[7],cards[8]);
 preview.hidden=true;
 activate(0,false);
 var intro=document.querySelector('.page-head');intro.querySelector('h1').textContent='Ficha de personagem';
 intro.querySelector('.lede').textContent='Seu aventureiro, suas escolhas, sua história. Prepare a ficha e acompanhe a jornada em Valédria.';
 var hint=document.createElement('p');hint.className='sheet-guidance';hint.textContent='Comece pela identidade. Depois distribua os atributos e escolha suas perícias e equipamentos.';tabs.after(hint);
 // Native selects remain the authoritative controls and keyboard alternative.
 function choiceCards(id,explanations){
  var select=document.getElementById(id),group=document.createElement('div');group.className='sheet-choices';group.setAttribute('role','group');group.setAttribute('aria-label',select.labels[0].textContent);
  Object.keys(explanations).forEach(function(value){var b=document.createElement('button');b.type='button';var strong=document.createElement('strong');strong.textContent=value||'Sem caminho';var small=document.createElement('span');small.textContent=explanations[value];b.append(strong,small);b.addEventListener('click',function(){select.value=value;select.dispatchEvent(new Event('change',{bubbles:true}));sync();});group.append(b);b.dataset.value=value;});
  function sync(){Array.from(group.children).forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.value===select.value));});}
  select.after(group);select.addEventListener('change',sync);sync();
  // Import/reset can update values without a DOM mutation: refresh after the existing handlers.
  document.addEventListener('change',function(){queueMicrotask(sync);});
  document.getElementById('btn-limpar').addEventListener('click',sync);
  return sync;
 }
 var syncRace=choiceCards('f-raca',{'Humano':'Reinos e tradições humanas','Elfo':'Heranças dos povos élficos','Anão':'Clãs e tradições ancestrais','Demônio':'Castas e linhagens demoníacas'});
 var syncPower=choiceCards('f-caminho',{'':'Sem Magia ou Aura','Magia':'Acompanhe sua reserva de Mana','Aura':'Acompanhe seu Fôlego marcial'});
 // Observe an existing rendered summary to refresh choices after asynchronous JSON imports.
 new MutationObserver(function(){syncRace();syncPower();}).observe(header,{childList:true,subtree:true,characterData:true});
 Array.from(document.querySelectorAll('[data-attr]')).forEach(function(input){
  var control=document.createElement('div');control.className='attribute-stepper';input.before(control);
  [-1,1].forEach(function(delta){var b=document.createElement('button');b.type='button';b.textContent=delta<0?'−':'+';b.setAttribute('aria-label',(delta<0?'Diminuir ':'Aumentar ')+input.labels[0].textContent);b.addEventListener('click',function(){input.value=Math.max(1,(Number(input.value)||1)+delta);input.dispatchEvent(new Event('change',{bubbles:true}));});control.append(b);});
  control.insertBefore(input,control.lastChild);
 });
 document.getElementById('attr-points').setAttribute('aria-live','polite');
 var actions=form.querySelector('.sheet-actions');actions.classList.add('sheet-toolbar');
 document.getElementById('btn-exportar').textContent='Baixar ficha';document.getElementById('btn-importar-trigger').textContent='Carregar ficha';document.getElementById('btn-imprimir').textContent='Imprimir / PDF';
 form.addEventListener('submit',function(e){e.preventDefault();});
})();
