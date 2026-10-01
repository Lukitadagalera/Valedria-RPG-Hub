"""Scene maps and their reproducible art briefs; never changes the adventure rules."""
import re

PLACES = {
    'demo-ponte': ['Acampamento da caravana', 'Ponte esquecida', 'Moinho dos viajantes', 'Depósito dos cobradores', 'Enfermaria de Amieiro', 'Celeiro e comporta'],
    'sino-pedra': ['Pátio e estábulo da oficina', 'Forja de bronze', 'Arquivo da oficina', 'Sala de bombas', 'Galeria de manutenção', 'Câmara de alívio'],
    'agua-cinzas': ['Acampamento e curral das caravanas', 'Oásis das cinzas', 'Cisterna do posto', 'Torre e depósito de água', 'Travessia do leito seco', 'Pátio de partilha'],
    'jardim-ecos': ['Arco de entrada do jardim', 'Biblioteca entre raízes', 'Jardim das águas', 'Observatório dos espelhos', 'Riacho das raízes', 'Santuário da memória'],
    'farol-mares': ['Cais de resgate', 'Armazém da enseada', 'Gruta da maré', 'Mecanismo do farol', 'Convés do navio', 'Cais protegido'],
    'mascaras-meia-noite': ['Pátio dos convites', 'Ateliê de máscaras', 'Arquivo do leilão', 'Salão de lances', 'Pavilhão do cais', 'Praça da audiência'],
}

STYLE = ('Use case: stylized-concept. Create one premium fantasy tabletop RPG battlemap, '
         'landscape 3:2, ideally 1536x1024. True orthographic directly overhead, never isometric. '
         'Detailed hand-painted realistic materials and crisp terrain, natural subdued colors, readable paths. '
         'No grid: software overlays a precise 30x20 grid. Entire area 45x30 meters; keep furniture and doors '
         'at believable scale and leave navigable spaces. Roofs removed, room interiors fully visible. '
         'No text, labels, numbers, decorative borders, people, animals or character tokens. '
         'Show only this single location, not a montage or a whole region. Use the following narrative '
         'only to design its physical environment; do not render dialogue, rules or people. ')


def briefs(kits):
    result = []
    for kit in kits:
        scenes = [s for s in kit['gmSections'] if re.match(r'^[1-6] ·', s['title'])]
        assert len(scenes) == 6, kit['id']
        for i, (name, scene) in enumerate(zip(PLACES[kit['id']], scenes), 1):
            result.append(dict(kit=kit['id'], scene=i, name=name,
                image=f"assets/img/kits/locais/{kit['id']}-{i}.webp",
                prompt=STYLE + f"Adventure: {kit['name']}. Region: {kit['place']}. Location: {name}. "
                    + scene['text'] + ' ' + ' '.join(scene.get('points', []))))
    return result


def expand(kits):
    for kit in kits:
        kit['preparation'] = [p.replace('Dois mapas por kit.', 'Duas visões gerais por kit, além dos mapas de cada local.').replace('Mapa 1:', 'Visão geral 1:').replace('mapa 2:', 'visão geral 2:') for p in kit['preparation']]
        kit['preparation'].append('Mapas de locais: cada uma das seis cenas possui um tabuleiro próprio, além das duas visões gerais. Use a visão geral para orientação e o mapa do local para movimentação. Não some as distâncias entre mapas: as transições continuam narrativas. Os mapas não introduzem novos perigos ou recompensas; valem as regras descritas na cena.')
        for item in [b for b in briefs([kit])]:
            index = len(kit['maps'])
            kit['maps'].append(dict(name=item['name'], image=item['image'], scene=item['scene'], kind='location', columns=30, rows=20, cellMeters=1.5, locations=[], routes=[]))
            scene = next(s for s in kit['gmSections'] if s['title'].startswith(str(item['scene'])+' ·'))
            scene['mapIndex'] = index
            scene['text'] = scene['text'].replace('Mapa 1, área', 'Visão geral 1, área').replace('Mapa 2, área', 'Visão geral 2, área')
            scene.setdefault('points', []).insert(0, f"Tabuleiro desta cena: {item['name']} (mapa {index+1}).")
