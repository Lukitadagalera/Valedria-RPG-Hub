/* Links oficiais, sem criar convites ou canais fictícios. */
(() => {
 const links=window.VALEDRIA_COMUNIDADE||{};
 for(const kind of ['servidor','wiki']){
  let url;try{url=new URL(links[kind]);}catch{continue;}
  if(url.protocol!=='https:'||!['discord.gg','discord.com','www.discord.com'].includes(url.hostname))continue;
  document.querySelectorAll(`[data-discord="${kind}"]`).forEach(a=>{a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';a.hidden=false;});
  document.querySelectorAll(`[data-pending="${kind}"]`).forEach(p=>p.hidden=true);
 }
})();
