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
 var names=['Personagem','Atributos','Perícias e equipamento','História e notas'];
 var panels=names.map(function(name,i){
  var button=document.createElement('button');button.type='button';button.id='sheet-tab-'+i;button.setAttribute('role','tab');button.setAttribute('aria-controls','sheet-panel-'+i);button.textContent=name;tabs.append(button);
  var panel=document.createElement('section');panel.id='sheet-panel-'+i;panel.className='sheet-tab-panel';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',button.id);panel.tabIndex=0;form.insertBefore(panel,cards[0]);
  button.addEventListener('click',function(){activate(i,false);});
  button.addEventListener('keydown',function(e){var next;if(e.key==='ArrowRight')next=(i+1)%names.length;if(e.key==='ArrowLeft')next=(i+names.length-1)%names.length;if(e.key==='Home')next=0;if(e.key==='End')next=names.length-1;if(next!=null){e.preventDefault();activate(next,true);}});
  return panel;
 });
 function activate(index,focus){panels.forEach(function(p,i){p.hidden=i!==index;var b=tabs.children[i];b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;});if(hint)hint.textContent=['Comece pela identidade. Depois distribua os atributos e escolha suas perícias e equipamentos.','Distribua seus pontos entre os cinco atributos do personagem.','Prepare suas habilidades e sua mochila. Cada escolha fica reunida aqui.','Registre quem seu personagem é e o que acontece ao longo da jornada.'][index];if(focus)tabs.children[index].focus();}
 panels[0].classList.add('sheet-identity');panels[0].append(cards[0],cards[1]);
 panels[1].append(cards[3]);
 var portraitColumn=document.createElement('div');portraitColumn.className='sheet-portraits';cards[0].before(portraitColumn);var mountCard=document.getElementById('mount-portrait');mountCard.classList.add('card');portraitColumn.append(cards[0],mountCard);
 var powerField=document.getElementById('f-caminho').closest('.field');powerField.after(cards[2]);cards[2].classList.add('sheet-power-options');
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
 Array.from(document.querySelectorAll('[data-attr]')).forEach(function(input){
  var control=document.createElement('div');control.className='attribute-stepper';input.before(control);
  [-1,1].forEach(function(delta){var b=document.createElement('button');b.type='button';b.textContent=delta<0?'−':'+';b.setAttribute('aria-label',(delta<0?'Diminuir ':'Aumentar ')+input.labels[0].textContent);b.addEventListener('click',function(){input.value=Math.max(1,(Number(input.value)||1)+delta);input.dispatchEvent(new Event('change',{bubbles:true}));});control.append(b);});
  control.insertBefore(input,control.lastChild);
 });
 document.getElementById('attr-points').setAttribute('aria-live','polite');
 var actions=form.querySelector('.sheet-actions');actions.classList.add('sheet-toolbar');
 document.getElementById('btn-exportar').textContent='Baixar ficha';document.getElementById('btn-importar-trigger').textContent='Carregar ficha';document.getElementById('btn-imprimir').textContent='Imprimir / PDF';
 form.addEventListener('submit',function(e){e.preventDefault();});
 var help={
 'f-nome':'Escreva o nome do seu personagem, como ele será conhecido em Valédria.',
 'f-jogador':'Informe seu nome ou apelido para identificar quem joga com este personagem.',
 'f-raca':'Escolha a raça combinada com o mestre. A escolha libera as castas, subraças ou clãs correspondentes.',
 'f-subraca':'Primeiro escolha a raça; depois selecione sua origem social ou cultural. Comprar um título humano permite chegar apenas à nobreza menor, nunca à alta nobreza.',
 'f-papel':'Escolha o papel do personagem em acordo com o mestre: Guardião, Aventureiro ou Especialista. Consulte o Livro IV para as regras.',
 'f-nivel':'Comece no nível 1, salvo orientação do mestre. Aumente o nível quando ele autorizar; isso atualiza os pontos disponíveis e as reservas calculadas.',
 'f-caminho':'Escolha Magia, Aura ou Nenhum. Magia e Aura são mutuamente exclusivas. Magias e técnicas específicas são aprendidas durante a aventura.',
 'f-vida-atual':'Registre a Vida restante após receber dano ou cura. O valor não pode ultrapassar a Vida máxima calculada pela ficha.',
 'vida-max-display':'Valor calculado automaticamente com as regras do personagem. Edite os atributos e o nível, não este total.',
 'f-mana-potencial':'Selecione o Potencial de Mana autorizado pelo mestre. Ele determina o crescimento da reserva por nível; veja o Livro VI.',
 'f-mana-atual':'Diminua ao gastar Mana e aumente quando recuperar. Restaurar Mana preenche a reserva até o máximo; use apenas quando as regras permitirem.',
 'mana-max-display':'Reserva máxima calculada pelo nível e Potencial de Mana. Todo conjurador começa com 50 no nível 1.',
 'f-aura-grau':'Escolha o grau marcial alcançado com autorização do mestre. Ele determina sua reserva de Fôlego e as técnicas disponíveis.',
 'f-aura-atual':'Registre o Fôlego restante na cena. Restaure após o descanso previsto nas regras; graus reservados são conduzidos pelo mestre.',
 'aura-max-display':'Limite calculado para o grau marcial. Consulte o Livro VII para recuperação e graus reservados.',
 'attr-forca':'Distribua pontos para potência física, esforço e perícias de Força. Use + e − ou digite. Mínimo 1; respeite o total disponível.',
 'attr-destreza':'Distribua pontos para agilidade, precisão e perícias de Destreza. Mínimo 1; os pontos são compartilhados entre os cinco atributos.',
 'attr-constituicao':'Distribua pontos para resistência física e os cálculos associados de Vida. Mínimo 1; observe o total de pontos usados.',
 'attr-sabedoria':'Distribua pontos para percepção, discernimento e perícias de Sabedoria. Mínimo 1; consulte os testes no Livro IV.',
 'attr-carisma':'Distribua pontos para presença, influência e perícias de Carisma. Mínimo 1; respeite o orçamento total de atributos.',
 'f-personalidade':'Descreva temperamento, valores, hábitos, medos e ambições. Isso ajuda você a interpretar decisões e relações.',
 'f-historia':'Conte de onde veio, o que busca e quais pessoas ou acontecimentos marcaram sua vida. Combine os vínculos com o mestre.',
 'f-notas':'Guarde pistas, dívidas, promessas e acontecimentos da mesa. Estas notas entram na ficha exportada: revise-as antes de compartilhar.'
 };
 var helpDialog=document.createElement('dialog');helpDialog.className='sheet-help-dialog';helpDialog.setAttribute('aria-labelledby','sheet-help-title');helpDialog.innerHTML='<button type="button" class="sheet-help-close" aria-label="Fechar explicação">×</button><h2 id="sheet-help-title"></h2><p></p>';document.body.append(helpDialog);helpDialog.querySelector('button').onclick=function(){helpDialog.close();};helpDialog.addEventListener('click',function(e){if(e.target===helpDialog){var r=helpDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)helpDialog.close();}});
 function explain(target,text,container,name){if(!target||!container)return;var b=document.createElement('button');b.type='button';b.className='sheet-help-button no-print';b.textContent='?';b.setAttribute('aria-label','Como preencher: '+name);b.setAttribute('aria-haspopup','dialog');b.addEventListener('click',function(){helpDialog.querySelector('h2').textContent=name;helpDialog.querySelector('p').textContent=text;helpDialog.showModal();});target.after(b);if(target.tagName==='LABEL'){var row=document.createElement('div');row.className='sheet-help-label';target.before(row);row.append(target,b);}}
 Object.keys(help).forEach(function(id){var input=document.getElementById(id);if(!input)return;var field=input.closest('.field,.attr-box'),label=field&&field.querySelector('label');if(label)explain(label,help[id],field,label.textContent);});
 [[mountCard,'Escolha uma imagem da sua montaria, ajuste o recorte e confirme. Ela fica salva com a ficha e acompanha o arquivo exportado. A imagem não concede uma montaria: combine a posse e suas regras com o mestre.'],[cards[0],'Escolha uma foto do personagem. No recorte, ajuste o zoom e o enquadramento antes de aplicar. Você pode reajustar ou remover depois.'],[cards[4],'Abra o catálogo, busque uma perícia e adicione. Comece com duas; adicionais exigem o mestre. O atributo é fixo. Use o botão de remover para desfazer uma escolha.'],[cards[5],'Adicione equipamentos pelo catálogo. Ajuste Quantidade no cartão ou remova o item. CC significa cobre; CP, prata; CO, ouro. 100 CC = 1 CP e 100 CP = 1 CO. Adicionar registra a posse, mas não desconta dinheiro automaticamente.'],[cards[6],'Escolha somente artefatos obtidos e autorizados pelo mestre. Leia efeito, condição e eventual maldição. O botão de remover retira o registro da ficha.']].forEach(function(pair){var title=pair[0].querySelector('h2');explain(title,pair[1],pair[0],title.textContent);});
 explain(actions.querySelector('#btn-salvar'),'Salvar guarda a ficha neste navegador. Baixar ficha cria uma cópia para backup; Carregar ficha restaura uma cópia e substitui os dados atuais. Imprimir / PDF abre a versão para impressão. Limpar tudo apaga a ficha local após confirmação.',form,'salvar, carregar e imprimir');
})();
