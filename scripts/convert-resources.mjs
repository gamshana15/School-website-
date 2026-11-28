
import fs from 'node:fs';
import * as cheerio from 'cheerio';

const htmlPath = 'resources.html';

const html = fs.readFileSync(htmlPath, 'utf8');

const $ = cheerio.load(html);

const resources = JSON.parse(
    fs.readFileSync('public/content/resources.json', 'utf8')
);

if ($('#school-resources-container').length) {
    throw new Error('Resources page is already converted.');
}

const grid = $('#downloads .card-grid-2');

if (grid.length !== 1) {
    throw new Error('Could not identify the resource grid.');
}

const existingCards = grid.find('.doc-card').length;

if (existingCards !== resources.length) {
    throw new Error('Document count mismatch. Conversion stopped.');
}

grid.before(`
    <div id="publications"></div>
    <div id="plans"></div>
`);

grid.attr('id', 'school-resources-container');

grid.empty();

// Correct the nested main element.
$('main#main-content > main').each((index, element) => {
    $(element).replaceWith($(element).contents());
});

// Add the resource management script.
$('body').append(`
    <script defer src="js/resources.js"></script>
`);

fs.writeFileSync(htmlPath, $.html(), 'utf8');

console.log('Resources page converted successfully!');
console.log(`Migrated ${existingCards} document cards.`);
console.log('Existing page sections and styling retained.');
