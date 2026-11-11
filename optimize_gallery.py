
from pathlib import Path
from PIL import Image, ImageOps
from zipfile import ZipFile, ZIP_DEFLATED
from datetime import datetime

# Only these two folders will be optimised
folders = [
    Path("images/prize-giving-2026"),
    Path("images/teachers-day-2026")
]

# Keep original photos safe outside the website project
backup = Path("..") / (
    f"School-website-originals-{datetime.now():%Y%m%d-%H%M%S}.zip"
)

photos = []

for folder in folders:
    if not folder.exists():
        raise FileNotFoundError(f"Folder not found: {folder}")

    photos.extend(
        p for p in folder.iterdir()
        if p.is_file() and p.suffix.lower() in [".jpg", ".jpeg"]
    )

if not photos:
    raise RuntimeError("No JPG photos found.")

# Backup all originals before modifying anything
with ZipFile(backup, "w", ZIP_DEFLATED) as archive:
    for photo in photos:
        archive.write(photo, photo.as_posix())

print(f"Original photos backed up to: {backup.resolve()}")

total_before = 0
total_after = 0

for photo in photos:
    original_size = photo.stat().st_size

    with Image.open(photo) as image:
        image = ImageOps.exif_transpose(image)
        image = image.convert("RGB")

        # Resize only if the image exceeds 3000 pixels
        image.thumbnail(
            (3000, 3000),
            Image.Resampling.LANCZOS
        )

        image.save(
            photo,
            "JPEG",
            quality=90,
            optimize=True,
            progressive=True
        )

    new_size = photo.stat().st_size

    total_before += original_size
    total_after += new_size

    print(
        f"{photo.name}: "
        f"{original_size / 1024 / 1024:.2f} MB -> "
        f"{new_size / 1024 / 1024:.2f} MB"
    )

print("\nOptimisation completed!")
print(f"Total before: {total_before / 1024 / 1024:.2f} MB")
print(f"Total after:  {total_after / 1024 / 1024:.2f} MB")
print(f"Space saved:  {(total_before-total_after) / 1024 / 1024:.2f} MB")
print(f"Original backup: {backup.resolve()}")
