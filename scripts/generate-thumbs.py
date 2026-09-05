#!/usr/bin/env python3
"""Generate cohesive 16:10 portfolio thumbnails with tinted backgrounds."""

from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "thumbs"
W, H = 1600, 1000

PROJECTS = [
    {
        "id": "talkIT",
        "src": "talkITcover.png",
        "bg": "#CFE0FF",
        "mode": "cover",
        "focus": (0.5, 0.5),
    },
    {
        "id": "confiDENT",
        "src": "blueConfident.png",
        "bg": "#FFDCC4",
        "mode": "contain",
        "scale": 0.82,
        "radius": 20,
    },
    {
        "id": "imagimals",
        "src": "imagimalsDark.png",
        "bg": "#FFE4B8",
        "mode": "cover",
        "focus": (0.5, 0.45),
    },
    {
        "id": "blink",
        "src": "blinkPhone.png",
        "bg": "#DDD6FE",
        "mode": "contain",
        "scale": 0.8,
        "radius": 22,
    },
    {
        "id": "heatra",
        "src": "heatraWear.png",
        "bg": "#FFD1DC",
        "mode": "contain",
        "scale": 0.82,
        "radius": 20,
    },
    {
        "id": "knead",
        "src": "gamePlay.png",
        "bg": "#FFF0A8",
        "mode": "cover",
        "focus": (0.5, 0.42),
    },
    {
        "id": "rockOnRaccoon",
        "src": "rockBack.png",
        "bg": "#E0E7FF",
        "mode": "cover",
        "focus": (0.5, 0.5),
    },
    {
        "id": "courseCorrect",
        "src": "driveInUSe.png",
        "bg": "#BBF7D0",
        "mode": "cover",
        "focus": (0.5, 0.4),
    },
]

ART = [
    {"id": "outOfWater", "src": "artO.png", "bg": "#F5F3F0", "mode": "contain", "scale": 0.88, "radius": 12},
    {"id": "face", "src": "face.png", "bg": "#F5F3F0", "mode": "contain", "scale": 0.88, "radius": 12},
    {"id": "bug", "src": "bug.png", "bg": "#F5F3F0", "mode": "contain", "scale": 0.88, "radius": 12},
    {"id": "reef", "src": "nana.png", "bg": "#F5F3F0", "mode": "contain", "scale": 0.88, "radius": 12},
    {"id": "nana", "src": "reef.png", "bg": "#F5F3F0", "mode": "contain", "scale": 0.88, "radius": 12},
]


def hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    return mask


def fit_contain(im: Image.Image, scale: float) -> Image.Image:
    target_w = int(W * scale)
    target_h = int(H * scale)
    ratio = min(target_w / im.width, target_h / im.height)
    new_size = (max(1, int(im.width * ratio)), max(1, int(im.height * ratio)))
    return im.resize(new_size, Image.Resampling.LANCZOS)


def fit_cover(im: Image.Image, focus: tuple[float, float]) -> Image.Image:
    ratio = max(W / im.width, H / im.height)
    new_size = (max(1, int(im.width * ratio)), max(1, int(im.height * ratio)))
    resized = im.resize(new_size, Image.Resampling.LANCZOS)
    left = int((resized.width - W) * focus[0])
    top = int((resized.height - H) * focus[1])
    return resized.crop((left, top, left + W, top + H))


def compose(project: dict) -> Image.Image:
    src_path = ROOT / project["src"]
    if not src_path.exists():
        raise FileNotFoundError(src_path)

    canvas = Image.new("RGB", (W, H), hex_to_rgb(project["bg"]))
    im = Image.open(src_path).convert("RGBA")

    if project["mode"] == "cover":
        fitted = fit_cover(im, project.get("focus", (0.5, 0.5)))
        canvas.paste(fitted, (0, 0))
        return canvas

    fitted = fit_contain(im, project.get("scale", 0.75))
    radius = project.get("radius", 0)
    if radius:
        mask = rounded_mask(fitted.size, radius)
        fitted.putalpha(mask)

    shadow = Image.new("RGBA", (fitted.width + 48, fitted.height + 48), (0, 0, 0, 0))
    shadow_layer = Image.new("RGBA", fitted.size, (0, 0, 0, 70))
    if radius:
        shadow_layer.putalpha(rounded_mask(fitted.size, radius))
    shadow.paste(shadow_layer, (24, 28), shadow_layer)
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=16))

    x = (W - fitted.width) // 2
    y = (H - fitted.height) // 2
    shadow_canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    shadow_canvas.paste(shadow, (x - 24, y - 28), shadow)
    canvas = Image.alpha_composite(canvas.convert("RGBA"), shadow_canvas)
    canvas.paste(fitted, (x, y), fitted)
    return canvas.convert("RGB")


def main() -> None:
    OUT.mkdir(exist_ok=True)
    for project in PROJECTS + ART:
        out_path = OUT / f"{project['id']}.jpg"
        image = compose(project)
        image.save(out_path, "JPEG", quality=90, optimize=True, progressive=True)
        print(f"wrote {out_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
