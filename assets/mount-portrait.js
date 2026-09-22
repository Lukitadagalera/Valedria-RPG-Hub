window.MountPortrait=function(onChange){
 'use strict';
 var state={},version=0,root=document.getElementById('mount-portrait');
 var image=root.querySelector('img'),empty=root.querySelector('.mount-empty'),status=root.querySelector('[role=status]'),file=root.querySelector('input'),adjust=root.querySelector('[data-mount-adjust]'),remove=root.querySelector('[data-mount-remove]');
 function safe(v){return typeof v==='string'&&v.length<1500000&&/^data:image\/(webp|png|jpeg);base64,[a-zA-Z0-9+/=]+$/.test(v)?v:'';}
 function render(){image.hidden=!state.foto;empty.hidden=!!state.foto;adjust.hidden=remove.hidden=!state.foto;if(state.foto)image.src=state.foto;else image.removeAttribute('src');}
 var crop=window.PortraitCrop(function(result){state=result;render();status.textContent='Imagem da montaria atualizada.';onChange();},'montaria');
 root.querySelector('[data-mount-choose]').onclick=function(){file.click();};
 adjust.onclick=function(){crop.open(state.fotoOriginal||state.foto,state.fotoRecorte).catch(function(){status.textContent='Não foi possível abrir a imagem.';});};
 remove.onclick=function(){version++;crop.cancel();state={};render();status.textContent='Imagem da montaria removida.';onChange();};
 file.onchange=async function(){var f=file.files[0],token=++version;file.value='';if(!f)return;if(!['image/png','image/jpeg','image/webp'].includes(f.type)||f.size>10*1024*1024){status.textContent='Escolha PNG, JPG ou WebP de até 10 MB.';return;}status.textContent='Preparando imagem…';var url=URL.createObjectURL(f);try{var img=new Image();img.src=url;await img.decode();var scale=Math.min(1,1000/Math.max(img.width,img.height)),canvas=document.createElement('canvas');canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);if(token!==version)return;await crop.open(canvas.toDataURL('image/webp',.82));status.textContent='Ajuste a imagem e aplique o recorte.';}catch(e){status.textContent='Não foi possível abrir a imagem. Escolha outro arquivo.';}finally{URL.revokeObjectURL(url);}};
 render();return {get:function(){return Object.assign({},state);},set:function(s){version++;crop.cancel();s=s||{};state={foto:safe(s.foto),fotoOriginal:safe(s.fotoOriginal),fotoRecorte:s.fotoRecorte||null};render();status.textContent='PNG, JPG ou WebP, até 10 MB.';}};
};
