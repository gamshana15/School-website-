
import fs from 'node:fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('gallery.html', 'utf8');
const albums = JSON.parse(
    fs.readFileSync('public/content/gallery.json', 'utf8')
);

const $ = cheerio.load(html);

if ($('#school-gallery-container').length) {
    throw new Error('Gallery has already been converted.');
}

const sections = $('section').filter((_, section) =>
    $(section).find('.gallery-grid').length > 0
);

const photoCount = sections.find('.gallery-item').length;
const jsonPhotoCount = albums.reduce(
    (total, album) => total + album.photos.length,
    0
);

if (
    sections.length !== albums.length ||
    photoCount !== jsonPhotoCount
) {
    throw new Error('Album or photo count mismatch. Conversion stopped.');
}

sections.first().before(`
    <!-- CMS Dynamic Gallery -->
    <div id="school-gallery-container"></div>
`);

sections.remove();

$('body').append(`
    <script src="js/gallery.js" defer></script>
`);

fs.writeFileSync('gallery.html', $.html(), 'utf8');

console.log('Gallery HTML converted successfully.');
console.log(`Replaced ${sections.length} static albums.`);
console.log(`Preserved ${jsonPhotoCount} photographs in JSON.`);
