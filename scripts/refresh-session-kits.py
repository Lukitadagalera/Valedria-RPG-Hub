"""Rebuild the published kit catalogue from scripts/kits, from any working directory."""
import os
import runpy
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
os.chdir(ROOT)
runpy.run_path(str(ROOT / 'scripts/kits/build.py'), run_name='__main__')
