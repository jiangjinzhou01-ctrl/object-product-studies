"""Prepare the locally hosted Noto Sans SC subset. Optional asset task, not required by CI.
Requires: python -m pip install fonttools brotli
The original font and this subset remain under SIL OFL 1.1.
"""
from pathlib import Path
import io
import json
import re
import urllib.parse
import urllib.request
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
characters = set()
for path in (root / "src").rglob("*"):
    if path.suffix in [".tsx", ".ts"]:
        characters.update(re.findall(r"[\u3000-\u303f\u3400-\u9fff\uff00-\uffef]", path.read_text()))
base = "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400..700&display=swap"
url = base + "&text=" + urllib.parse.quote("".join(sorted(characters)))
request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 Chrome/130.0.0.0 Safari/537.36"})
css = urllib.request.urlopen(request, timeout=45).read().decode()
files = []
for weight, font_url in re.findall(r"font-weight: (\d+);.*?url\(([^)]+)\)", css, re.S):
    if weight not in ["400", "600"]:
        continue
    data = urllib.request.urlopen(font_url, timeout=45).read()
    font = TTFont(io.BytesIO(data))
    font.flavor = "woff2"
    output = root / "public" / "assets" / "fonts" / ("noto-sc-" + weight + ".woff2")
    output.parent.mkdir(parents=True, exist_ok=True)
    font.save(output)
    files.append({"file": str(output.relative_to(root)), "weight": int(weight), "bytes": output.stat().st_size})
license_url = "https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/OFL.txt"
license_text = urllib.request.urlopen(license_url, timeout=45).read()
(root / "public" / "licenses" / "Noto-Sans-SC-OFL.txt").write_bytes(license_text)
(root / "docs" / "font-sources.json").write_text(json.dumps({
    "family": "Noto Sans SC",
    "source": "https://fonts.google.com/noto/specimen/Noto+Sans+SC",
    "license": "SIL Open Font License 1.1",
    "licenseUrl": license_url,
    "modification": "Character subset from public application content; converted to WOFF2. No glyph design changes.",
    "characterCount": len(characters),
    "files": files
}, indent=2) + "\n")
print("Prepared", len(files), "font files for", len(characters), "Chinese characters.")
