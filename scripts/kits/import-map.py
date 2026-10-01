"""Encode a generated scene map for the website without reducing its resolution."""
import argparse
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[2]
parser = argparse.ArgumentParser()
parser.add_argument('index', type=int, help='Zero-based index in map-prompts.json')
parser.add_argument('source', type=Path)
args = parser.parse_args()
jobs = json.loads(Path(__file__).with_name('map-prompts.json').read_text(encoding='utf-8'))
if not 0 <= args.index < len(jobs):
    parser.error('Unknown map index')
job = jobs[args.index]
target = root / job['image']
if target.exists():
    parser.error('Refusing to overwrite an existing map')
with Image.open(args.source) as source:
    if source.width * 2 != source.height * 3 or source.width < 1536:
        raise ValueError('Expected landscape 3:2 artwork, at least 1536 pixels wide')
    target.parent.mkdir(parents=True, exist_ok=True)
    source.convert('RGB').save(target, 'WEBP', quality=91, method=6)
print(job['image'], target.stat().st_size)
