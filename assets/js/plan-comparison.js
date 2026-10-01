(() => {
'use strict';
const plans=[
 {name:'Visitante',intro:'Conheça Valédria e prepare seu personagem.',addition:'Acesso inicial',items:['Apresentação do mundo e conteúdos introdutórios.','Ficha de personagem e impressão.','Mesmo conteúdo com ou sem cadastro gratuito.']},
 {name:'Contador de Histórias',intro:'Prepare suas primeiras aventuras.',addition:'Tudo do Visitante, mais',items:['Sistema, Raças, Magia, Aura, Artefatos e Bestiário.','Biblioteca do Mestre por nível, ferramentas rápidas e caderno de sessão.','2 kits completos, com 16 mapas, fichas e pistas.']},
 {name:'Mestre das Aventuras',intro:'Organize uma campanha contínua.',addition:'Tudo do Contador, mais',items:['Sociedade, Economia, Facções, exploração e crônicas.','4 kits completos: mais 2 aventuras e 16 mapas.','Campanha pronta, sessões, personagens, missões e inventário coletivo.','Controle de encontros e painel dos jogadores.']},
 {name:'Deus das Lendas',intro:'Crie e conduza um mundo que evolui.',addition:'Tudo do Mestre, mais',items:['Crônica viva: ameaças, alianças, decisões e passagem das sessões.','Editor de aventuras com cenas conectadas, atlas pessoal e modelos de criação.','Acervo completo, Guia do Mestre e Mapa e Aventuras.','6 kits completos: mais 2 aventuras e 16 mapas.']}
];
const rows=[
 ['Apresentação do mundo e ficha',true,true,true,true],
 ['Sistema, Raças, Magia, Aura, Artefatos e Bestiário','Introduções',true,true,true],
 ['Sociedade, Economia, Facções, exploração e crônicas','Introduções','Introduções',true,true],
 ['Guia do Mestre e Mapa e Aventuras completos',false,false,false,true],
 ['Biblioteca do Mestre, geradores e caderno',false,'Por nível','Por nível','Completo'],
 ['Kits de sessão completos', '—','2 kits','4 kits','6 kits'],
 ['Mapas dos kits, com grade e download', '—','16 mapas','32 mapas','48 mapas'],
 ['Roteiros, fichas e pistas para imprimir',false,true,true,true],
 ['Campanha pronta e painel de campanhas',false,false,true,true],
 ['Sessões, personagens, missões e inventário coletivo',false,false,true,true],
 ['Iniciativa, condições e painel dos jogadores',false,false,true,true],
 ['Editor de aventuras com caminhos entre cenas',false,false,false,true],
 ['Atlas pessoal e modelos de criação',false,false,false,true],
 ['Crônica viva: ameaças e relações com facções',false,false,false,true],
 ['Avanço de sessão, histórico e resumo dos jogadores',false,false,false,true]
];
for(const root of document.querySelectorAll('[data-plan-comparison]')){
 root.innerHTML='<p class="plan-comparison-intro">Cada assinatura inclui os recursos da anterior. Veja o que você já recebe e o que ganha ao avançar de plano.</p><div class="plan-comparison-cards">'+plans.map((p,i)=>'<article class="mini-card plan-comparison-card"><span class="eyebrow">'+(i===3?'Criação e condução':i===2?'Continuidade':i===1?'Preparação':'Primeiros passos')+'</span><h3>'+p.name+'</h3><p>'+p.intro+'</p><h4>'+p.addition+'</h4><ul>'+p.items.map(item=>'<li>'+item+'</li>').join('')+'</ul></article>').join('')+'</div><h3>Recurso por recurso</h3><p class="plan-table-hint">No celular, deslize a tabela para comparar os quatro acessos. “Introduções” indica apenas os trechos liberados para apresentação.</p><div class="plan-table-scroll" role="region" aria-label="Comparação detalhada das assinaturas" tabindex="0"><table class="plan-comparison-table"><caption>Recursos disponíveis por nível de acesso</caption><thead><tr><th scope="col">Recurso</th>'+plans.map(p=>'<th scope="col">'+p.name+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr><th scope="row">'+row[0]+'</th>'+row.slice(1).map(v=>'<td>'+ (v===true?'<span class="plan-included">✓ Incluído</span>':v===false?'<span>Não incluído</span>':v)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div><p class="plan-comparison-note">No teste do GitHub, documentos e progresso ficam neste navegador; exporte cópias para guardar. Compartilhamento por link entre dispositivos dependerá da hospedagem dos serviços. Preços, cobrança e o livro digital de presente serão ativados no lançamento.</p>';
}
})();
