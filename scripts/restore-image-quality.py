from pathlib import Path
from PIL import Image,ImageOps
import json,re
root=Path('.'); backup=Path('../originais-png'); webpbackup=Path('../image-originals'); count=0;before=after=0;responsive={}
for p in sorted((root/'assets/img').rglob('*.webp')):
 if re.search(r'-(480|960|1440|1920)\.webp$',p.name):continue
 rel=p.relative_to(root); candidates=[backup/rel.with_suffix('.png'),webpbackup/rel,webpbackup/rel.with_name(rel.stem+'.png.webp')]
 sources=[q for q in candidates if q.exists()]
 if not sources:continue
 source=max(sources,key=lambda q:Image.open(q).width*Image.open(q).height)
 im=ImageOps.exif_transpose(Image.open(source)); cap=2560
 im.thumbnail((cap,cap),Image.Resampling.LANCZOS)
 before+=p.stat().st_size
 im.save(p,'WEBP',quality=92,method=6)
 after+=p.stat().st_size;count+=1
 variants=[]
 if 'decoracao' not in p.parts and im.width>=700:
  for w in [480,960,1440,1920]:
   if w>=im.width:continue
   small=im.copy();small.thumbnail((w,10000),Image.Resampling.LANCZOS);target=p.with_name(p.stem+'-'+str(w)+'.webp');small.save(target,'WEBP',quality=90,method=6);variants.append((target.as_posix(),small.width))
  variants.append((p.as_posix(),im.width));responsive[p.as_posix()]={'srcset':', '.join(f'{url} {w}w' for url,w in variants),'width':im.width,'height':im.height}
for p in root.glob('*.html'):
 s=p.read_text(encoding='utf8')
 def replace(m):
  tag=m[0];src=re.search(r'\bsrc="([^"]+)"',tag)
  if not src or src[1] not in responsive:return tag
  info=responsive[src[1]]
  # Most content illustrations occupy half the viewport; full-width landscapes use the whole.
  sizes='100vw' if any(t in src[1] for t in ['hero-','cronicas-','panorama']) else '(max-width: 700px) 94vw, 60vw'
  if '/home/capa-' in src[1]:sizes='(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 26vw'
  if '/brasao-' in src[1]:sizes='150px'
  if 'marca-valedria' in src[1]:sizes='56px'
  for key,val in [('srcset',info['srcset']),('sizes',sizes),('width',info['width']),('height',info['height'])]:
   tag=re.sub(r'\s'+key+r'="[^"]*"','',tag)
   tag=tag[:-1]+f' {key}="{val}">'
  return tag
 s=re.sub(r'<img\b[^>]*>',replace,s);p.write_text(s,encoding='utf8')
oldpath=root/'assets/data/responsive-images.js';old=json.loads(oldpath.read_text().split('=',1)[1].rstrip(';\n'));old.update(responsive);oldpath.write_text('window.VALEDRIA_IMAGES='+json.dumps(old,separators=(',',':'))+';',encoding='utf8')
print(json.dumps({'restored':count,'mastersBeforeMiB':round(before/1048576,1),'mastersAfterMiB':round(after/1048576,1),'responsive':len(responsive)}))
