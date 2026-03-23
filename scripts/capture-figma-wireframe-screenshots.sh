#!/usr/bin/env bash
# Capture the published Figma site and split into parts for MILESTONE4_REPORT.tex
# Requires: Google Chrome, Python 3 + Pillow
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/docs/wireframes"
mkdir -p "$OUT"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --no-sandbox --window-size=1440,9000 \
  --screenshot="$OUT/figma-site-full.png" --virtual-time-budget=15000 \
  "https://visor-unity-00479441.figma.site/"
ROOT="$ROOT" python3 << 'PY'
import os
from PIL import Image
root = os.environ["ROOT"]
src = os.path.join(root, "docs/wireframes/figma-site-full.png")
outdir = os.path.join(root, "docs/wireframes")
im = Image.open(src)
w, h = im.size
n = 3
slice_h = h // n
for i in range(n):
    top = i * slice_h
    bottom = h if i == n - 1 else (i + 1) * slice_h
    crop = im.crop((0, top, w, bottom))
    crop.save(os.path.join(outdir, f"figma-wireframes-part{i+1}.png"), optimize=True)
    print("wrote", i + 1, crop.size)
PY
