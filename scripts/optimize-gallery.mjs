
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const dist = path.resolve('dist');
const imagesDir = path.join(dist, 'images');
const thumbnailsDir = path.join(dist, 'thumbnails');

const galleryFile = path.join(
    dist, 'content', 'gallery.json'
);

const albums = JSON.parse(
    await fs.readFile(galleryFile, 'utf8')
);

if (!Array.isArray(albums)) {
    throw new Error('Invalid gallery data');
}

let optimized = 0;
let skipped = 0;
let originalBytes = 0;
let thumbnailBytes = 0;

const processed = new Map();

for (const album of albums) {

    if (!Array.isArray(album.photos)) continue;

    for (const photo of album.photos) {

        delete photo.thumbnail;

        if (!photo.image) continue;

        try {
            const url = new URL(
                photo.image,
                'https://school.local/'
            );

            if (
                url.origin !== 'https://school.local' ||
                !url.pathname.startsWith('/images/')
            ) {
                skipped++;
                continue;
            }

            const relativePath = decodeURIComponent(
                url.pathname.slice('/images/'.length)
            );

            const source = path.resolve(
                imagesDir, relativePath
            );

            if (!source.startsWith(imagesDir + path.sep)) {
                throw new Error('Invalid image path');
            }

            if (processed.has(source)) {
                const cached = processed.get(source);

                if (cached) photo.thumbnail = cached;

                continue;
            }

            const thumbnailPath = relativePath + '.webp';

            const destination = path.resolve(
                thumbnailsDir, thumbnailPath
            );

            if (!destination.startsWith(
                thumbnailsDir + path.sep
            )) {
                throw new Error('Invalid thumbnail path');
            }

            await fs.mkdir(
                path.dirname(destination),
                { recursive: true }
            );

            const original = await fs.stat(source);

            await sharp(source)
                .rotate()
                .resize({
                    width: 800,
                    height: 800,
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .webp({ quality: 80 })
                .toFile(destination);

            const thumbnail = await fs.stat(destination);

            if (thumbnail.size >= original.size) {
                await fs.unlink(destination);
                processed.set(source, null);
                skipped++;
                continue;
            }

            const thumbnailUrl =
                '/thumbnails/' +
                thumbnailPath
                    .split('/')
                    .map(encodeURIComponent)
                    .join('/');

            photo.thumbnail = thumbnailUrl;

            processed.set(source, thumbnailUrl);

            originalBytes += original.size;
            thumbnailBytes += thumbnail.size;

            optimized++;

            console.log(
                `Optimized: ${relativePath} | ` +
                `${Math.round(original.size / 1024)} KB -> ` +
                `${Math.round(thumbnail.size / 1024)} KB`
            );

        } catch (error) {
            skipped++;

            console.warn(
                `Skipped: ${photo.image}`,
                error.message
            );
        }
    }
}

await fs.writeFile(
    galleryFile,
    JSON.stringify(albums, null, 2),
    'utf8'
);

const reduction = originalBytes > 0
    ? ((1 - thumbnailBytes / originalBytes) * 100)
        .toFixed(2)
    : 0;

console.log('\nGallery optimization completed');
console.log('Optimized images:', optimized);
console.log('Skipped images:', skipped);

console.log(
    'Original size:',
    (originalBytes / 1024 / 1024).toFixed(2),
    'MB'
);

console.log(
    'Thumbnail size:',
    (thumbnailBytes / 1024 / 1024).toFixed(2),
    'MB'
);

console.log('Size reduction:', reduction + '%');
