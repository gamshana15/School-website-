import fs from 'node:fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('gallery.html', 'utf8');
const $ = cheerio.load(html);

const albums = [];

$('section').each((_, section) => {
    const element = $(section);

    if (!element.find('.gallery-grid').length) return;

    const album = {
        titleEnglish: element.find('.section-title').first().text().trim(),
        titleTamil: '',
        pretitle: element.find('.section-pretitle').first().text().trim(),
        description: element.find('.section-subtitle').first().text().trim(),
        alternateBackground: element.hasClass('section-alt'),
        photos: []
    };

    element.find('.gallery-grid .gallery-item').each((_, photo) => {
        const item = $(photo);
        const img = item.find('img').first();

        album.photos.push({
            image: item.attr('data-image') || img.attr('src') || '',
            title: item.find('.gallery-title').text().trim(),
            category: item.find('.gallery-category').text().trim(),
            caption: item.attr('data-caption') || '',
            alt: img.attr('alt') || '',
            imageOnly: item.attr('data-image-only') !== undefined
        });
    });

    albums.push(album);
});

if (!albums.length || albums.some(album =>
    !album.titleEnglish ||
    !album.photos.length ||
    album.photos.some(photo => !photo.image)
)) {
    throw new Error('Gallery migration validation failed.');
}

const output = 'public/content/gallery.json';

if (fs.existsSync(output)) {
    throw new Error('Gallery JSON already exists. Migration stopped to prevent overwriting.');
}

fs.mkdirSync('public/content', { recursive: true });

fs.writeFileSync(
    output,
    JSON.stringify(albums, null, 2),
    'utf8'
);

console.log('\nGallery migration completed!\n');

let total = 0;

albums.forEach(album => {
    console.log(`${album.titleEnglish}: ${album.photos.length} photos`);
    total += album.photos.length;
});

console.log(`\nTotal albums: ${albums.length}`);
console.log(`Total photographs: ${total}`);