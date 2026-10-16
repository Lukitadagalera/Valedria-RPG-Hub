(function(){
  var RACAS_SUB = {"Humano": ["Plebeus", "Artesãos e mercadores estabelecidos", "Nobreza menor", "Alta nobreza e realeza"], "Elfo": ["Elfos da Floresta", "Elfos Negros", "Elfos Costeiros"], "Anão": ["Clã Ferro-Fundo", "Clã Pedra-Funda", "Clã Chama-Antiga", "Clã Veio-Negro"], "Demônio": ["Orcs das Planícies", "Goblins das Minas", "Demônios do Mar Profundo", "Naga-Demônios do Deserto", "Demônios das Montanhas Vermelhas"]};
  var ATTR_LABELS = {"forca": "Força", "destreza": "Destreza", "constituicao": "Constituição", "sabedoria": "Sabedoria", "carisma": "Carisma"};
  var RULES = window.VALEDRIA_REGRAS;
  var BASE_POINTS = RULES.pontosIniciais;
  var POINTS_PER_LEVEL = RULES.pontosPorNivel;
  /* Progressão de Mana por Potencial (Livro VI): reserva inicial de 50 no
     nível 1, crescendo por composição percentual a cada nível acima do 1º. */
  function manaMax(nivel,potencial){return RULES.manaMax(nivel,potencial);}
  /* Fôlego de Aura por grau marcial (Livro VII): reserva fixa por cena —
     Imperador/Deus não tem pool comum, são técnicas reservadas narradas pelo mestre. */
  var AURA_FOLEGO_POR_GRAU = RULES.folegoPorGrau;
  function auraMax(grau){
    var v = AURA_FOLEGO_POR_GRAU[grau];
    return v == null ? 8 : v;
  }
  var ITENS_MAP = {};
  (window.ITENS || []).forEach(function(it){ ITENS_MAP[it.nome] = it; });
  var itensLista = el('#itens-lista');
  if (itensLista) itensLista.innerHTML = (window.ITENS || []).map(function(it){ return '<option value="'+esc(it.nome)+'">'; }).join('');

  function el(sel, root){ return (root||document).querySelector(sel); }
  function els(sel, root){ return Array.prototype.slice.call((root||document).querySelectorAll(sel)); }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

  /* Leitura legada via cookies; novas fichas e fotos usam localStorage.
     Persistência local da ficha via cookies: salvamos automaticamente
     enquanto o jogador edita, e recarregamos ao abrir a página de novo no
     mesmo navegador. Como um cookie sozinho tem limite de ~4KB, quebramos
     o JSON em pedaços (chunks) numerados. Isso fica preso a este
     navegador/dispositivo — não é uma conta na nuvem — por isso o
     exportar/importar em JSON continua disponível como cópia de segurança. */
  var SAVE_PREFIX = 'vf_ficha_';
  var SAVE_CHUNK = 3500;
  function setCookie(name, value, days){
    try {
      var d = new Date(); d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + d.toUTCString() + '; path=/; SameSite=Lax';
    } catch (e) { /* cookie indisponivel neste contexto */ }
  }
  function getCookie(name){
    try {
      var target = name + '=';
      var parts = document.cookie.split('; ');
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].indexOf(target) === 0) return decodeURIComponent(parts[i].slice(target.length));
      }
    } catch (e) { /* cookie indisponivel neste contexto */ }
    return null;
  }
  function deleteCookie(name){ try { document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; } catch (e) {} }
  function clearFichaCookies(){
    try {
      var n = parseInt(getCookie(SAVE_PREFIX + 'n') || '0', 10);
      for (var i = 0; i < n; i++) deleteCookie(SAVE_PREFIX + i);
      deleteCookie(SAVE_PREFIX + 'n');
    } catch (e) { /* nao bloqueia o restante do botao Limpar */ }
  }
  function markSaveStatus(ok){
    var txt = el('#save-indicator-text');
    if (!txt) return;
    if (ok) {
      var t = new Date();
      var hh = String(t.getHours()).padStart(2, '0'), mm = String(t.getMinutes()).padStart(2, '0');
      txt.textContent = 'Ficha salva automaticamente neste navegador às ' + hh + ':' + mm + '.';
    } else {
      txt.textContent = 'Não foi possível salvar automaticamente neste navegador — exporte o JSON para não perder sua ficha.';
    }
  }
  function saveFichaToBrowser(){
    try {
      localStorage.setItem('valedria-ficha-v2', JSON.stringify(getState()));
      clearFichaCookies();
      markSaveStatus(true); return true;
    } catch (e) { markSaveStatus(false); return false; }
  }
  function loadFichaFromBrowser(){
    try {var saved=localStorage.getItem('valedria-ficha-v2');if(saved)return JSON.parse(saved);} catch(e) {}
    try {
      var n = parseInt(getCookie(SAVE_PREFIX + 'n') || '0', 10);
      if (!n) return null;
      var parts = [];
      for (var i = 0; i < n; i++) {
        var c = getCookie(SAVE_PREFIX + i);
        if (c == null) return null;
        parts.push(c);
      }
      return JSON.parse(decodeURIComponent(parts.join('')));
    } catch (e) { return null; }
  }
  var saveTimer = null;
  var applyingState = false;
  function scheduleSave(){
    if (applyingState) return;
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(saveFichaToBrowser, 600);
  }

  var racaSel = el('#f-raca'), subracaSel = el('#f-subraca');
  racaSel.addEventListener('change', function(){
    var opts = RACAS_SUB[racaSel.value];
    if (!opts) { subracaSel.innerHTML = '<option value="">Selecione a raça primeiro</option>'; subracaSel.disabled = true; }
    else {
      subracaSel.disabled = false;
      subracaSel.innerHTML = '<option value="">Selecione</option>' + opts.map(function(o){ return '<option>'+esc(o)+'</option>'; }).join('');
    }
    updatePreview();
  });

  var caminhoSel = el('#f-caminho');
  var poderCard = el('#poder-card'), manaBlock = el('#mana-block'), manaHint = el('#mana-hint');
  var auraBlock = el('#aura-block'), auraHint = el('#aura-hint');
  var manaPotencialSel = el('#f-mana-potencial'), manaAtualInput = el('#f-mana-atual'), manaMaxDisplay = el('#mana-max-display');
  var auraGrauSel = el('#f-aura-grau'), auraAtualInput = el('#f-aura-atual'), auraMaxDisplay = el('#aura-max-display');

  function updatePoderVisibility(){
    var caminho = caminhoSel.value;
    poderCard.hidden = !caminho;
    manaBlock.hidden = caminho !== 'Magia';
    manaHint.hidden = caminho !== 'Magia';
    auraBlock.hidden = caminho !== 'Aura';
    auraHint.hidden = caminho !== 'Aura';
  }
  function clampMana(){
    var max = manaMax(currentNivel(), manaPotencialSel.value);
    manaMaxDisplay.textContent = String(max);
    var v = parseInt(manaAtualInput.value, 10);
    if (isNaN(v)) v = max;
    v = Math.max(0, Math.min(max, v));
    manaAtualInput.value = v;
    manaAtualInput.max = max;
    return v;
  }
  function clampAura(){
    var grauReservado = AURA_FOLEGO_POR_GRAU[auraGrauSel.value] == null;
    var max = auraMax(auraGrauSel.value);
    auraMaxDisplay.textContent = grauReservado ? 'Reservado (técnicas narradas pelo mestre)' : String(max);
    auraAtualInput.disabled = grauReservado;
    var btnRestaurar = el('#btn-aura-restaurar');
    if (btnRestaurar) btnRestaurar.disabled = grauReservado;
    var v = parseInt(auraAtualInput.value, 10);
    if (isNaN(v)) v = max;
    v = Math.max(0, Math.min(max, v));
    auraAtualInput.value = v;
    auraAtualInput.max = max;
    return v;
  }
  caminhoSel.addEventListener('change', function(){
    updatePoderVisibility();
    if (caminhoSel.value === 'Magia') clampMana();
    if (caminhoSel.value === 'Aura') clampAura();
    updatePreview();
  });
  manaPotencialSel.addEventListener('change', function(){ clampMana(); updatePreview(); });
  manaAtualInput.addEventListener('input', function(){ scheduleDebounced(clampAndPreview); });
  manaAtualInput.addEventListener('blur', function(){ clampMana(); updatePreview(); });
  manaAtualInput.addEventListener('change', function(){ clampMana(); updatePreview(); });
  el('#btn-mana-restaurar').addEventListener('click', function(){
    manaAtualInput.value = manaMax(currentNivel(), manaPotencialSel.value);
    clampMana(); updatePreview();
  });
  auraGrauSel.addEventListener('change', function(){ clampAura(); updatePreview(); });
  auraAtualInput.addEventListener('input', function(){ scheduleDebounced(clampAndPreview); });
  auraAtualInput.addEventListener('blur', function(){ clampAura(); updatePreview(); });
  auraAtualInput.addEventListener('change', function(){ clampAura(); updatePreview(); });
  el('#btn-aura-restaurar').addEventListener('click', function(){
    auraAtualInput.value = auraMax(auraGrauSel.value);
    clampAura(); updatePreview();
  });
  var debounceTimer = null;
  function scheduleDebounced(fn){
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(fn, 500);
  }
  function clampAndPreview(){
    if (caminhoSel.value === 'Magia') clampMana();
    if (caminhoSel.value === 'Aura') clampAura();
    updateAttrPoints();
    updatePreview();
  }

  ['#f-nome', '#f-jogador', '#f-papel', '#f-historia', '#f-notas', '#f-personalidade'].forEach(function(sel){
    var field = el(sel);
    if (field) { field.addEventListener('input', updatePreview); field.addEventListener('change', updatePreview); }
  });

  var nivelInput = el('#f-nivel');
  var vidaInput = el('#f-vida-atual');
  function derived(){
    var attrs={};els('[data-attr]').forEach(function(inp){attrs[inp.dataset.attr]=Math.max(1,Math.min(attrMax(),parseInt(inp.value,10)||1));});
    return RULES.derivados({atributos:attrs,caminho:caminhoSel.value,auraGrau:auraGrauSel.value,auraCaminho:el('#f-aura-caminho').value,armadura:el('#f-armadura').value,escudo:el('#f-escudo').value});
  }
  function vidaMax(){ return derived().vida; }
  ['#f-aura-caminho','#f-armadura','#f-escudo'].forEach(function(sel){el(sel).addEventListener('change',updatePreview);});
  function clampVida(){
    var max = vidaMax(), current = parseInt(vidaInput.value, 10);
    vidaInput.value = Number.isFinite(current) ? Math.max(0, Math.min(max,current)) : max;
    vidaInput.max = max;
    el('#vida-max-display').textContent = String(max);
  }
  el('#btn-vida-restaurar').addEventListener('click', function(){
    vidaInput.value = vidaMax();
    clampVida(); updatePreview();
  });
  vidaInput.addEventListener('input', updatePreview);
  vidaInput.addEventListener('change', function(){clampVida();updatePreview();});
  function currentNivel(){
    var n = parseInt(nivelInput.value, 10);
    if (isNaN(n) || n < 1) n = 1;
    return Math.min(10,n);
  }
  function totalPoints(){ return BASE_POINTS + POINTS_PER_LEVEL * (currentNivel() - 1); }
  function attrMax(){ return totalPoints()-4; }
  if (nivelInput) {
    nivelInput.addEventListener('input', reclampTodosAtributos);
    nivelInput.addEventListener('change', reclampTodosAtributos);
    nivelInput.addEventListener('blur', reclampTodosAtributos);
  }

  var attrInputs = els('[data-attr]');
  /* O orçamento total vale também durante a digitação. */
  function readAttr(inp){
    var v = parseInt(inp.value, 10);
    if (isNaN(v)) return 0;
    return v;
  }
  function clampAttr(inp){
    var v = parseInt(inp.value, 10);
    if (isNaN(v)) v = 1;
    var others=attrInputs.filter(function(x){return x!==inp;}).reduce(function(sum,x){return sum+Math.max(1,readAttr(x)||1);},0);
    v = Math.max(1, Math.min(Math.max(1,totalPoints()-others), v));
    inp.value = v;
    return v;
  }
  function reclampTodosAtributos(){
    nivelInput.value = currentNivel();
    var values={};attrInputs.forEach(function(inp){values[inp.dataset.attr]=readAttr(inp);});
    var normalized=RULES.limitarAtributos(values,currentNivel());
    attrInputs.forEach(function(inp){inp.value=normalized[inp.dataset.attr];});
    if (caminhoSel.value === 'Magia') clampMana();
    if (caminhoSel.value === 'Aura') clampAura();
    updateAttrPoints();
    updatePreview();
  }
  function updateAttrPoints(){
    var total = totalPoints();
    var spent = 0;
    attrInputs.forEach(function(inp){ spent += readAttr(inp); });
    var box = el('#attr-points'), val = el('#attr-points-value');
    val.textContent = spent + ' / ' + total;
    box.classList.toggle('is-over', spent > total);
    attrInputs.forEach(function(inp){inp.max=Math.max(1,total-spent+Math.max(1,readAttr(inp)||1));var plus=inp.closest('.attr-box').querySelector('[data-step="1"]');if(plus)plus.disabled=spent>=total;});
    var hint = el('#attr-hint');
    if (hint) {
      hint.textContent = 'Compra por pontos: seu personagem tem ' + total + ' pontos no nível ' + currentNivel() +
        ' (15 iniciais + 5 por nível acima do 1º) para distribuir entre os 5 atributos, com mínimo de 1 em cada e sem teto fixo por atributo — o limite real é o total disponível.';
    }
  }
  attrInputs.forEach(function(inp){
    /* Permite apagar temporariamente o campo; valida o valor preenchido. */
    inp.addEventListener('input', function(){ if(inp.value!=='')clampAttr(inp); updateAttrPoints(); updatePreview(); });
    inp.addEventListener('blur', function(){ clampAttr(inp); updateAttrPoints(); updatePreview(); });
    inp.addEventListener('change', function(){ clampAttr(inp); updateAttrPoints(); updatePreview(); });
  });

  var itensEditor=el('#itens-editor'),periciasEditor=el('#pericias-editor');
  var collection=window.SheetCatalog({onChange:updatePreview});
  var currentSheetId = null;
  var savedStateSnapshot = null;
  var unsavedChanges = false;
  var navigationApproved = false;
  var unsavedChangesMessage = 'Tem certeza de que deseja sair sem salvar as alterações?';

  function updateSaveButtonLabel(){
    el('#btn-salvar').textContent = currentSheetId ? 'Salvar alterações' : 'Salvar ficha na conta';
  }

  function updateUnsavedChanges(){
    if (savedStateSnapshot === null) return;
    unsavedChanges = JSON.stringify(getState()) !== savedStateSnapshot;
    updateSaveButtonLabel();
  }

  async function readApiResponse(response, action){
    if(!(response.headers.get('content-type')||'').includes('application/json')){
      if(response.status===404){
        throw Error('A rota da ficha não está disponível neste servidor. Reinicie o servidor com npm run dev e tente novamente.');
      }
      throw Error('O servidor retornou uma resposta inesperada ao '+action+' (HTTP '+response.status+').');
    }
    try{return await response.json();}
    catch{throw Error('O servidor retornou uma resposta inválida ao '+action+'.');}
  }

  var roleRecord = null;
  el('#f-papel-usado').addEventListener('change',updatePreview);
  el('#btn-papel-nova-cena').addEventListener('click',function(){el('#f-papel-usado').checked=false;updatePreview();});
  function getState(){
    var nivelAtual = currentNivel();
    var attrs = {};
    /* Leitura defensiva: mesmo que o campo ainda mostre um valor fora do
       limite (antes do auto-ajuste com debounce ou do blur), o estado usado
       para prévia, exportação e salvamento nunca ultrapassa o máximo do nível. */
    attrInputs.forEach(function(inp){
      var v = readAttr(inp) || 1;
      attrs[inp.dataset.attr] = Math.max(1, Math.min(attrMax(), v));
    });
    var manaPotencial = manaPotencialSel.value;
    var manaAtualV = parseInt(manaAtualInput.value, 10);
    if (isNaN(manaAtualV)) manaAtualV = manaMax(nivelAtual, manaPotencial);
    manaAtualV = Math.max(0, Math.min(manaMax(nivelAtual, manaPotencial), manaAtualV));
    var auraGrau = auraGrauSel.value;
    var auraAtualV = parseInt(auraAtualInput.value, 10);
    if (isNaN(auraAtualV)) auraAtualV = auraMax(auraGrau);
    auraAtualV = Math.max(0, Math.min(auraMax(auraGrau), auraAtualV));
    var extra=collection.get();
    var itens=extra.itens,pericias=extra.pericias;
    return {
      nome: el('#f-nome').value, jogador: el('#f-jogador').value,
      raca: racaSel.value, subraca: subracaSel.value, papel: el('#f-papel').value,
      nivel: currentNivel(), vidaAtual: Math.max(0,Math.min(vidaMax(),parseInt(vidaInput.value,10)||0)), caminho: caminhoSel.value,
      manaPotencial: manaPotencial, manaAtual: manaAtualV,
      auraGrau: auraGrau, auraAtual: auraAtualV, auraCaminho: el('#f-aura-caminho').value, armadura: el('#f-armadura').value, escudo: el('#f-escudo').value,
      versao: 6, papelTeste: roleRecord, papelUsado: el('#f-papel-usado').checked, atributos: attrs, pericias: pericias, itens: itens, artefatos: extra.artefatos, foto: extra.foto, fotoOriginal: extra.fotoOriginal, fotoRecorte: extra.fotoRecorte, montariaId: extra.montariaId, montaria: extra.montaria, montariaOriginal: extra.montariaOriginal, montariaRecorte: extra.montariaRecorte, personalidade: el('#f-personalidade').value,
      historia: el('#f-historia').value, notas: el('#f-notas').value
    };
  }

  function validateState(s){
    if(!s||typeof s!=='object'||Array.isArray(s)||(!('nome' in s)&&!('atributos' in s)))throw Error('Ficha inválida');
    if(s.versao!=null&&(!Number.isInteger(s.versao)||s.versao>6||s.versao<1))throw Error('Versão não suportada');
    ['nome','jogador','raca','subraca','papel','caminho','manaPotencial','auraGrau','personalidade','historia','notas'].forEach(function(k){if(s[k]!=null&&(typeof s[k]!=='string'||s[k].length>100000))throw Error('Texto inválido');});
    ['nivel','vidaAtual','manaAtual','auraAtual'].forEach(function(k){if(s[k]!=null&&(!Number.isFinite(Number(s[k]))||Number(s[k])<0))throw Error('Número inválido');});
    for(const [key,values] of Object.entries({auraCaminho:['','Força','Velocidade','Morte','Técnica'],armadura:['nenhuma','leve','media','pesada'],escudo:['nao','sim']})){if(s[key]!=null&&!values.includes(s[key]))throw Error('Opção inválida: '+key);}
    if(s.papelTeste!=null && (typeof s.papelTeste!=='object'||Array.isArray(s.papelTeste)||!window.VALEDRIA_PAPEIS.some(function(r){return r.nome===s.papelTeste.papel;})||typeof s.papelTeste.campanha!=='string'||typeof s.papelTeste.personagem!=='string'))throw Error('Registro de papel inválido');
    if(s.atributos!=null){if(typeof s.atributos!=='object'||Array.isArray(s.atributos))throw Error('Atributos inválidos');Object.keys(ATTR_LABELS).forEach(function(k){if(s.atributos[k]!=null&&!Number.isFinite(Number(s.atributos[k])))throw Error('Atributo inválido');});}
    ['itens','artefatos','pericias'].forEach(function(k){if(s[k]!=null&&(!Array.isArray(s[k])||s[k].length>500||s[k].some(function(x){return !x||typeof x.nome!=='string'||x.nome.length>300;})))throw Error('Lista inválida');});
    return s;
  }
  function setState(s){
    validateState(s);
    el('#f-papel-usado').checked=s.papelUsado===true;
    roleRecord = s.papelTeste && typeof s.papelTeste==='object' && s.papelTeste.papel===s.papel ? s.papelTeste : null;
    if(roleRecord){try{var records=JSON.parse(localStorage.getItem('valedria-role-tests-v1')||'{}'),rid=JSON.stringify([roleRecord.campanha.toLocaleLowerCase('pt-BR'),roleRecord.personagem.toLocaleLowerCase('pt-BR')]);if(!records[rid]||String(records[rid].data)<String(roleRecord.data)){records[rid]=roleRecord;localStorage.setItem('valedria-role-tests-v1',JSON.stringify(records));}}catch(e){}}

    applyingState = true;
    if(saveTimer)clearTimeout(saveTimer);
    try {
    el('#f-nome').value = s.nome || '';
    el('#f-jogador').value = s.jogador || '';
    racaSel.value = s.raca || '';
    racaSel.dispatchEvent(new Event('change'));
    subracaSel.value = s.subraca || '';
    el('#f-papel').value = s.papel || '';
    el('#f-nivel').value = Math.max(1,Math.min(10,Number(s.nivel)||1));
    caminhoSel.value = s.caminho || '';
    caminhoSel.dispatchEvent(new Event('change'));
    manaPotencialSel.value = s.manaPotencial || 'Comum';
    manaAtualInput.value = (s.manaAtual != null) ? s.manaAtual : manaMax(parseInt(s.nivel, 10) || 1, manaPotencialSel.value);
    clampMana();
    el('#f-aura-caminho').value=s.auraCaminho||'';
    el('#f-armadura').value=s.armadura||'nenhuma';
    el('#f-escudo').value=s.escudo||'nao';
    auraGrauSel.value = s.auraGrau || 'Aprendiz';
    auraAtualInput.value = (s.auraAtual != null) ? s.auraAtual : auraMax(auraGrauSel.value);
    clampAura();
    var loadedAttrs=RULES.limitarAtributos(s.atributos,currentNivel());attrInputs.forEach(function(inp){inp.value=loadedAttrs[inp.dataset.attr];});
    vidaInput.value = s.vidaAtual == null ? vidaMax() : s.vidaAtual;
    clampVida();
    collection.set(s);


    el('#f-personalidade').value=s.personalidade||'';
    el('#f-historia').value = s.historia || '';
    el('#f-notas').value = s.notas || '';
    updateAttrPoints();
    } finally { applyingState = false; }
    updatePreview();
  }

  function updatePreview(){
    if(!collection||applyingState)return;
    clampVida();
    var s = getState(), d = derived();
    if(roleRecord && roleRecord.papel!==s.papel)roleRecord=null;
    el('#f-papel').disabled=!!roleRecord;
    var role=window.VALEDRIA_PAPEIS.find(function(r){return r.nome===s.papel;});
    el('#sheet-role-benefit').textContent=role?'Vantagem de '+role.nome+' (uma vez por cena, antes da rolagem e com validação do mestre): '+role.vantagem:'Escolha seu papel ou descubra-o no teste do Livro IV.';
    el('#defesa-display').textContent=d.defesa;
    el('#defesa-hint').textContent='10 + '+Math.floor(d.atributos.destreza/2)+' de Destreza + proteção equipada.'+(s.armadura==='pesada'?' Armadura pesada: desvantagem em Furtividade.':'');
    el('#aura-bonus-display').textContent=s.caminho==='Aura'?(s.auraCaminho?'Bônus de Aura (não gastam pontos): '+Object.keys(d.bonus).filter(function(k){return d.bonus[k];}).map(function(k){return ATTR_LABELS[k]+' +'+d.bonus[k];}).join(' · ')+'. Os campos acima são a base; o resumo mostra os totais.':'Selecione seu Caminho principal de Aura para calcular os bônus do grau.'):'Os campos de atributos são os pontos base. Bônus de Aura só se aplicam ao escolher esse caminho.';
    el('#pv-nome').textContent = s.nome || 'Personagem sem nome';
    var meta = [];
    meta.push(s.raca ? (s.raca + (s.subraca ? ' · ' + s.subraca : '')) : 'Raça —');
    meta.push('Nível ' + (s.nivel || '—'));
    meta.push(s.papel || 'Papel —');
    if (s.caminho) meta.push(s.caminho);
    el('#pv-meta').innerHTML = meta.map(function(m){ return '<span>'+esc(m)+'</span>'; }).join('');
    el('#pv-attrs').innerHTML = Object.keys(ATTR_LABELS).map(function(k){
      return '<div class="mini-card"><strong>'+d.atributos[k]+'</strong><span>'+esc(ATTR_LABELS[k])+'</span></div>';
    }).join('');
    el('#pv-vida').innerHTML = '<strong>'+s.vidaAtual+' / '+vidaMax()+'</strong><span>Vida · Defesa '+d.defesa+'</span>';
    var pvPower = el('#pv-power');
    if (s.caminho !== 'Aura') {
      pvPower.hidden = false;
      pvPower.innerHTML = '<div class="mini-card"><strong>'+s.manaAtual+' / '+manaMax(currentNivel(), s.manaPotencial)+'</strong><span>Mana ('+esc(s.caminho === 'Magia' ? s.manaPotencial : 'reserva; escolha Magia para conjurar')+')</span></div>';
    } else if (s.caminho === 'Aura') {
      pvPower.hidden = false;
      var auraReservado = AURA_FOLEGO_POR_GRAU[s.auraGrau] == null;
      var auraTxt = auraReservado ? 'Reservado' : (s.auraAtual+' / '+auraMax(s.auraGrau));
      pvPower.innerHTML = '<div class="mini-card"><strong>'+s.manaAtual+' / '+manaMax(currentNivel(),s.manaPotencial)+'</strong><span>Mana latente — Aura usa Fôlego</span></div><div class="mini-card"><strong>'+auraTxt+'</strong><span>Fôlego ('+esc(s.auraGrau)+')</span></div>';
    } else {
      pvPower.hidden = true;
      pvPower.innerHTML = '';
    }
    el('#pv-pericias').innerHTML = s.pericias.length ? s.pericias.map(function(p){
      return '<div class="row"><span>'+esc(p.nome)+'</span><span>'+esc(p.atributo||'')+'</span></div>';
    }).join('') : '<div class="row"><span>Nenhuma perícia adicionada</span></div>';
    updateUnsavedChanges();
    scheduleSave();
  }

  el('#btn-salvar').addEventListener('click', function(){
    if (saveTimer) clearTimeout(saveTimer);
    var btn = el('#btn-salvar');
    var original = currentSheetId ? 'Salvar alterações' : 'Salvar ficha na conta';
    btn.disabled = true;
    el('#sheet-login-link').hidden = true;
    if (saveFichaToBrowser()) {
      var state = getState();
      if (!state.nome.trim()) {
        el('#save-indicator-text').textContent = 'Dê um nome ao personagem antes de salvar na conta.';
        btn.textContent = 'Nome obrigatório';
        btn.disabled = false;
        return;
      }
      el('#save-indicator-text').textContent = 'Salvando ficha na sua conta...';
      fetch(currentSheetId ? '/api/fichas/' + encodeURIComponent(currentSheetId) : '/api/fichas', {
        method: currentSheetId ? 'PUT' : 'POST',
        credentials: 'same-origin',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(state)
      }).then(async function(response){
        var result = await readApiResponse(response, 'salvar a ficha');
        if (!response.ok) {
          if (response.status === 401) {
            el('#sheet-login-link').hidden = false;
            throw Error('Entre com Google para habilitar o salvamento na conta.');
          }
          throw Error(result.error || 'Não foi possível salvar na conta.');
        }
        currentSheetId = result.ficha._id;
        savedStateSnapshot = JSON.stringify(state);
        updateUnsavedChanges();
        history.replaceState(null, '', location.pathname + '?ficha=' + encodeURIComponent(currentSheetId));
        el('#save-indicator-text').textContent = 'Ficha salva na sua conta e neste navegador.';
        btn.textContent = 'Salvo na conta!';
      }).catch(function(error){
        el('#save-indicator-text').textContent = error.message || 'Não foi possível salvar na conta.';
        console.error(error);
        btn.textContent = 'Falha ao salvar';
      }).finally(function(){
        setTimeout(function(){ updateSaveButtonLabel(); btn.disabled = false; }, 1800);
      });
    } else {
      btn.textContent = 'Não foi possível salvar localmente';
      setTimeout(function(){ updateSaveButtonLabel(); btn.disabled = false; }, 1800);
    }
  });

  el('#btn-exportar').addEventListener('click', function(){
    var s = getState();
    var blob = new Blob([JSON.stringify(s, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = (s.nome ? s.nome.replace(/[^a-z0-9-]+/gi, '-') : 'ficha-valedria') + '.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  el('#btn-importar-trigger').addEventListener('click', function(){ el('#input-importar').click(); });
  el('#input-importar').addEventListener('change', function(ev){
    var file = ev.target.files[0];
    if (!file) return;
    if(file.size>8*1024*1024){alert('A ficha deve ter até 8 MB.');ev.target.value='';return;}
    var reader = new FileReader();
    reader.onload = function(){
      try { setState(JSON.parse(reader.result)); }
      catch (e) { alert('Não foi possível ler este arquivo. Verifique se é um JSON de ficha exportado por este site.'); }
    };
    reader.readAsText(file);
    ev.target.value = '';
  });

  try{
    var pendingRole=JSON.parse(sessionStorage.getItem('valedria-role-pending')||'null');
    if(pendingRole && window.VALEDRIA_PAPEIS.some(function(r){return r.nome===pendingRole.papel;})){
      var notice=document.createElement('p');notice.textContent='Resultado de '+pendingRole.personagem+' na campanha '+pendingRole.campanha+': '+pendingRole.papel+'. Aplicar nesta ficha?';el('#sheet-role-pending').append(notice);
      var applyRole=document.createElement('button');applyRole.type='button';applyRole.className='btn btn-secondary';applyRole.textContent='Aplicar resultado nesta ficha';applyRole.onclick=function(){roleRecord=pendingRole;el('#f-papel').value=pendingRole.papel;if(!el('#f-nome').value)el('#f-nome').value=pendingRole.personagem;sessionStorage.removeItem('valedria-role-pending');el('#sheet-role-pending').replaceChildren();updatePreview();};el('#sheet-role-pending').append(applyRole);
    }
  }catch(e){}
  window.addEventListener('beforeprint',function(){const preview=document.querySelector('.sheet-print-preview[open]');if(preview){document.body.append(preview.querySelector('#sheet-print'));preview.close();window.scrollTo(0,0);return;}window.SheetPrint(getState(),{vida:vidaMax(),mana:manaMax(currentNivel(),manaPotencialSel.value),aura:AURA_FOLEGO_POR_GRAU[auraGrauSel.value],atributos:derived().atributos,defesa:derived().defesa});});
  el('#btn-imprimir').addEventListener('click',function(){
    document.querySelector('.sheet-print-preview')?.remove();
    const doc=window.SheetPrint(getState(),{vida:vidaMax(),mana:manaMax(currentNivel(),manaPotencialSel.value),aura:AURA_FOLEGO_POR_GRAU[auraGrauSel.value],atributos:derived().atributos,defesa:derived().defesa});
    const dialog=document.createElement('dialog');dialog.className='sheet-print-preview';dialog.setAttribute('aria-label','Prévia da ficha para impressão');
    const toolbar=document.createElement('div');toolbar.className='print-preview-toolbar';const print=document.createElement('button');print.className='btn btn-primary';print.textContent='Imprimir / Salvar como PDF';print.onclick=()=>window.PrintCharacterDocument(doc);const close=document.createElement('button');close.className='btn btn-secondary';close.textContent='Voltar à ficha';close.onclick=()=>dialog.close();toolbar.append(print,close);dialog.append(toolbar,doc);document.body.append(dialog);dialog.addEventListener('close',()=>dialog.remove());dialog.showModal();
  });
  el('#btn-limpar').addEventListener('click', function(){
    if (confirm('Limpar toda a ficha atual? Esta ação não pode ser desfeita (inclusive a cópia salva neste navegador).')) {
      currentSheetId = null;
      history.replaceState(null, '', location.pathname);
      el('#ficha-form').reset();
      collection.set({});

      vidaInput.value = '';
      try{sessionStorage.removeItem('valedria-ficha-vida-atual');}catch(e){}
      try{localStorage.removeItem('valedria-ficha-v2');}catch(e){}
      attrInputs.forEach(function(inp){ inp.value = 1; });
      subracaSel.innerHTML = '<option value="">Selecione a raça primeiro</option>'; subracaSel.disabled = true;
      manaPotencialSel.value = 'Comum'; manaAtualInput.value = 50;
      auraGrauSel.value = 'Aprendiz'; auraAtualInput.value = 3;
      updatePoderVisibility();
      clearFichaCookies();
      updateAttrPoints();
      updatePreview();
      savedStateSnapshot = JSON.stringify(getState());
      unsavedChanges = false;
      updateSaveButtonLabel();
    }
  });

  document.addEventListener('click', function(event){
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    var destination = new URL(link.href, location.href);
    if (destination.origin !== location.origin ||
        (destination.pathname === location.pathname && destination.search === location.search)) return;
    if (!unsavedChanges) return;
    if (!window.confirm(unsavedChangesMessage)) {
      event.preventDefault();
      return;
    }
    navigationApproved = true;
  });

  window.addEventListener('beforeunload', function(event){
    if (!unsavedChanges || navigationApproved) return;
    event.preventDefault();
    event.returnValue = unsavedChangesMessage;
    return unsavedChangesMessage;
  });

  updatePoderVisibility();
  clampMana();
  clampAura();
  window.addEventListener('pagehide',function(){if(collection)saveFichaToBrowser();});
  var query = new URLSearchParams(location.search);
  var fichaIdParam = query.get('ficha');
  var isNewSheet = query.get('nova') === '1';
  var fichaSalva = fichaIdParam || isNewSheet ? null : loadFichaFromBrowser();
  if (fichaIdParam) {
    updateAttrPoints();
    updatePreview();
    savedStateSnapshot = JSON.stringify(getState());
  } else if (fichaSalva) {
    try{if(fichaSalva.vidaAtual==null){var legacyLife=sessionStorage.getItem('valedria-ficha-vida-atual');if(legacyLife!=null)fichaSalva.vidaAtual=Number(legacyLife);}setState(fichaSalva);}catch(e){markSaveStatus(false);}
    savedStateSnapshot = JSON.stringify(getState());
  } else {
    updateAttrPoints();
    updatePreview();
    savedStateSnapshot = JSON.stringify(getState());
  }
  updateSaveButtonLabel();
  if (fichaIdParam) {
    fetch('/api/fichas/' + encodeURIComponent(fichaIdParam), {
      credentials: 'same-origin',
      cache: 'no-store',
      headers: { Accept: 'application/json' }
    }).then(async function(response){
      var result = await readApiResponse(response, 'carregar a ficha');
      if (!response.ok) {
        if (response.status === 401) {
          el('#sheet-login-link').hidden = false;
          throw Error('Entre com Google para abrir uma ficha salva na conta.');
        }
        throw Error(result.error || 'Não foi possível abrir esta ficha.');
      }
      currentSheetId = result.ficha._id;
      setState(result.ficha);
      savedStateSnapshot = JSON.stringify(getState());
      unsavedChanges = false;
      updateSaveButtonLabel();
      saveFichaToBrowser();
      el('#save-indicator-text').textContent = 'Ficha carregada da sua conta e salva neste navegador.';
    }).catch(function(error){
      el('#save-indicator-text').textContent = error.message || 'Não foi possível carregar a ficha da conta.';
    });
  }
})();

(function(){
  var image = document.querySelector('.brand-symbol img');
  if (!image) return;
  image.addEventListener('load', function(){ image.parentElement.classList.add('loaded'); });
  image.addEventListener('error', function(){ image.hidden = true; });
  if (image.complete) {
    if (image.naturalWidth) image.parentElement.classList.add('loaded');
    else image.hidden = true;
  }
})();
