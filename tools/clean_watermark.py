from __future__ import annotations

import argparse
import os
from pathlib import Path
from typing import Iterable

from PIL import Image


def find_images(paths: Iterable[Path]) -> list[Path]:
    exts = {".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP"}
    files: list[Path] = []
    for p in paths:
        if p.is_dir():
            for root, _, filenames in os.walk(p):
                for fn in filenames:
                    if Path(fn).suffix in exts:
                        files.append(Path(root) / fn)
        elif p.is_file() and p.suffix in exts:
            files.append(p)
    return files


def clone_cover_bottom_right(img: Image.Image, width_ratio: float, height_ratio: float, lift_ratio: float) -> Image.Image:
    w, h = img.size
    cover_w = max(1, int(w * width_ratio))
    cover_h = max(1, int(h * height_ratio))

    # Target area: bottom-right rectangle
    x1 = w - cover_w
    y1 = h - cover_h
    x2 = w
    y2 = h

    # Source area: same width/height, lifted up by lift_ratio of image height
    lift = int(h * lift_ratio)
    src_y1 = max(0, y1 - lift)
    src_y2 = min(h, src_y1 + cover_h)
    src_x1 = x1
    src_x2 = x1 + cover_w

    src = img.crop((src_x1, src_y1, src_x2, src_y2))
    # If the lifted region doesn't perfectly match, resize to target
    if src.size != (cover_w, cover_h):
        src = src.resize((cover_w, cover_h), Image.Resampling.LANCZOS)

    out = img.copy()
    out.paste(src, (x1, y1))
    return out


def main() -> None:
    parser = argparse.ArgumentParser(description="Clone-cover bottom-right watermark area of images and save cleaned copies.")
    parser.add_argument("inputs", nargs="+", help="Image files or directories to process")
    parser.add_argument("--width-ratio", type=float, default=0.25, help="Width of area to cover as fraction of image width (default: 0.25)")
    parser.add_argument("--height-ratio", type=float, default=0.18, help="Height of area to cover as fraction of image height (default: 0.18)")
    parser.add_argument("--lift-ratio", type=float, default=0.20, help="How far up to sample from, as fraction of image height (default: 0.20)")
    parser.add_argument("--out", type=str, default="assets/img/clean", help="Output directory for cleaned images")
    args = parser.parse_args()

    inputs = [Path(p) for p in args.inputs]
    images = find_images(inputs)
    if not images:
        print("No images found.")
        return

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    for img_path in images:
        try:
            with Image.open(img_path) as im:
                im = im.convert("RGB")
                cleaned = clone_cover_bottom_right(im, args.width_ratio, args.height_ratio, args.lift_ratio)
                out_path = out_dir / img_path.name
                cleaned.save(out_path, quality=92)
                print(f"Cleaned -> {out_path}")
        except Exception as e:
            print(f"Failed {img_path}: {e}")


if __name__ == "__main__":
    main()






