(() => {
 const prompts=['Que pequeno hábito torna seu personagem inesquecível?','Qual lugar de Valédria você gostaria de visitar com o grupo?','Que decisão de outro jogador surpreendeu você numa sessão?','Que objeto seu personagem nunca deixaria para trás?','Qual foi a melhor ajuda que você recebeu de alguém numa mesa?','Que tipo de aventura você gostaria de viver com novos amigos?'];let index=0;
 document.getElementById('next-prompt').addEventListener('click',()=>{index=(index+1)%prompts.length;document.getElementById('conversation-prompt').textContent=prompts[index];});
})();
