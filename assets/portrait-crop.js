window.PortraitCrop=function(onApply,kind){
  var dialog=document.createElement('dialog');dialog.className='portrait-crop';dialog.setAttribute('aria-labelledby','crop-title');
  dialog.innerHTML='<h2 id="crop-title">Enquadrar retrato</h2><p>Arraste a imagem ou use os controles para destacar o rosto.</p><canvas width="480" height="640" aria-label="Prévia do recorte do retrato"></canvas><div class="crop-controls"><label>Zoom<input id="crop-zoom" type="range" min="1" max="5" step="0.05" value="1"></label><label>Posição horizontal<input id="crop-x" type="range" min="0" max="100" value="50"></label><label>Posição vertical<input id="crop-y" type="range" min="0" max="100" value="50"></label></div><div class="crop-actions"><button type="button" class="btn btn-ghost" id="crop-cancel">Cancelar</button><button type="button" class="btn btn-primary" id="crop-apply">Aplicar recorte</button></div>';
  document.body.appendChild(dialog);var canvas=dialog.querySelector('canvas'),ctx=canvas.getContext('2d'),image,original,version=0,drag;
  var zoom=dialog.querySelector('#crop-zoom'),x=dialog.querySelector('#crop-x'),y=dialog.querySelector('#crop-y');
  function values(){return {zoom:Number(zoom.value),x:Number(x.value),y:Number(y.value)};}
  function rect(){var v=values(),w=Math.min(image.width,image.height*.75)/v.zoom,h=w/.75;return {w:w,h:h,x:(image.width-w)*v.x/100,y:(image.height-h)*v.y/100};}
  function draw(){if(!image)return;var r=rect();ctx.clearRect(0,0,480,640);ctx.drawImage(image,r.x,r.y,r.w,r.h,0,0,480,640);}
  [zoom,x,y].forEach(function(el){el.addEventListener('input',draw);});
  canvas.addEventListener('pointerdown',function(e){drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',function(e){if(!drag||!image)return;var r=rect(),b=canvas.getBoundingClientRect();if(image.width>r.w)x.value=Math.max(0,Math.min(100,Number(x.value)-(e.clientX-drag.x)*r.w/b.width/(image.width-r.w)*100));if(image.height>r.h)y.value=Math.max(0,Math.min(100,Number(y.value)-(e.clientY-drag.y)*r.h/b.height/(image.height-r.h)*100));drag={x:e.clientX,y:e.clientY};draw();});
  ['pointerup','pointercancel','lostpointercapture'].forEach(function(type){canvas.addEventListener(type,function(){drag=null;});});
  dialog.querySelector('#crop-cancel').onclick=function(){dialog.close();};
  dialog.querySelector('#crop-apply').onclick=function(){if(!image)return;onApply({foto:canvas.toDataURL('image/webp',.9),fotoOriginal:original,fotoRecorte:values()});dialog.close();};
  if(kind){dialog.querySelector('h2').textContent='Enquadrar '+kind;dialog.querySelector('p').textContent='Arraste a imagem ou use zoom e posição para ajustar o enquadramento.';dialog.querySelectorAll('[id]').forEach(function(el){el.id+='-'+kind;});dialog.setAttribute('aria-labelledby','crop-title-'+kind);canvas.setAttribute('aria-label','Prévia do recorte da '+kind);}
  return {open:async function(src,settings){var token=++version;var loaded=new Image();loaded.src=src;await loaded.decode();if(token!==version)return;image=loaded;original=src;var s=settings||{};zoom.value=Math.max(1,Math.min(5,Number(s.zoom)||1));x.value=s.x==null?50:Math.max(0,Math.min(100,Number(s.x)||0));y.value=s.y==null?50:Math.max(0,Math.min(100,Number(s.y)||0));draw();dialog.showModal();zoom.focus();},cancel:function(){version++;dialog.close();}};
};
