#!/usr/bin/env python3
"""Generate archimate-icons.json (Iconify icon-set format) from the SVGs in image/.

Iconify format reference: https://github.com/iconify/icon-sets/blob/master/json/svg-spinners.json

Each SVG contributes one icon: the icon name is the file basename and the icon
body is the SVG's inner content (the outermost <g> children), minus the
<title>, any elements positioned outside the 50x50 viewport (Inkscape export
artifacts), ids and xmlns noise.

Run:  python3 build_icons_json.py
"""
import glob
import json
import os
import re

IMAGE_DIR = "image"
OUTPUT = "archimate-icons.json"
PREFIX = "archimate"
REPO_URL = "https://github.com/m3ssage/archimate-in-a-webpage"


def _junk_element(attrs):
    """True if a self-closing element sits entirely at negative coordinates."""
    for key in ("x", "y", "cx", "cy"):
        m = re.search(key + r'="(-?\d+(?:\.\d+)?)"', attrs)
        if m and float(m.group(1)) < 0:
            return True
    m = re.search(r'd="([^"]*)"', attrs)
    if m:
        fm = re.search(r"[mM]\s*(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)", m.group(1))
        if fm and float(fm.group(1)) < 0:
            return True
    return False


def icon_body(svg_text):
    """Extract a clean, compact icon body from an <svg> document."""
    start = svg_text.find("<g")
    if start == -1:
        raise ValueError("no <g> element found")
    g_open_end = svg_text.find(">", start) + 1
    end = svg_text.rfind("</g>")
    inner = svg_text[g_open_end:end]

    inner = re.sub(r"<title>.*?</title>", "", inner, flags=re.S)

    def clean(m):
        close, tag, attrs, selfclose = m.group(1), m.group(2), m.group(3), m.group(4)
        if selfclose and _junk_element(attrs):
            return ""
        attrs = re.sub(r'\s+id="[^"]*"', "", attrs)
        attrs = re.sub(r'\s+xmlns(?::\w+)?="[^"]*"', "", attrs)
        attrs = re.sub(r'\s+stroke="null"', "", attrs)
        return "<" + close + tag + attrs + selfclose + ">"

    body = re.sub(r"<(/?)(\w+)([^>]*?)(/?)>", clean, inner)
    body = re.sub(r"\s+", " ", body).strip()
    return body


def _normalize_dim(value):
    f = float(value)
    r = round(f)
    return r if abs(f - r) < 0.01 else round(f, 2)


def main():
    icons = {}
    dims = set()
    files = sorted(glob.glob(os.path.join(IMAGE_DIR, "*.svg")))
    for path in files:
        with open(path, encoding="utf-8") as fh:
            svg_text = fh.read()
        name = os.path.splitext(os.path.basename(path))[0]
        m = re.search(r'<svg[^>]*\bwidth="([\d.]+)"[^>]*\bheight="([\d.]+)"', svg_text) or \
            re.search(r'<svg[^>]*\bheight="([\d.]+)"[^>]*\bwidth="([\d.]+)"', svg_text)
        if m:
            dims.add((_normalize_dim(m.group(1)), _normalize_dim(m.group(2))))
        icons[name] = {"body": icon_body(svg_text)}

    data = {
        "prefix": PREFIX,
        "info": {
            "name": "ArchiMate 3.x",
            "total": len(icons),
            # NOTE: adjust author/license to match the actual source of the icons
            "author": {"name": "m3ssage", "url": REPO_URL},
            "license": {"title": "Custom (see repository)", "url": REPO_URL},
            "version": "1.0.0",
            "samples": ["application_component", "business_process", "technology_node"],
        },
        "icons": icons,
    }
    if len(dims) == 1:
        data["width"], data["height"] = dims.pop()

    with open(OUTPUT, "w", encoding="utf-8") as fh:
        json.dump(data, fh, indent=2, ensure_ascii=False)
        fh.write("\n")
    print(f"wrote {OUTPUT}: {len(icons)} icons, dimensions={dims or data.get('width', 'per-icon')}x{data.get('height')}")


if __name__ == "__main__":
    main()
