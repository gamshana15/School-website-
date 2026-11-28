
import fs from 'node:fs';

const configPath = '.pages.yml';
const galleryPath = 'public/content/gallery.json';

let config = fs.readFileSync(configPath, 'utf8');

if (config.includes('name: gallerySection') ||
    config.includes('name: publishedDate')) {
    throw new Error('Ordering fields already exist.');
}

const galleryFields = `
      - name: gallerySection
        label: "பிரிவு | Gallery Section"
        type: select
        required: true
        default: "Ceremonial Archives"
        options:
          values:
            - "Ceremonial Archives"
            - "Achievements"
            - "Press Photos"

      - name: updatedDate
        label: "புதுப்பித்த திகதி | Last Updated Date"
        type: date
        options:
          format: yyyy-MM-dd

`;

const resourceFields = `
      - name: publishedDate
        label: "வெளியிட்ட திகதி | Published Date"
        type: date
        options:
          format: yyyy-MM-dd

`;

const galleryMarker = '      - name: photos';
const resourceMarker = '      - name: file\n';

config = config.replace(/\r\n/g, '\n');

if (!config.includes(galleryMarker) ||
    !config.includes(resourceMarker)) {
    throw new Error('Required CMS fields not found.');
}

config = config.replace(
    galleryMarker,
    galleryFields + galleryMarker
);

config = config.replace(
    resourceMarker,
    resourceFields + resourceMarker
);

const albums = JSON.parse(
    fs.readFileSync(galleryPath, 'utf8')
);

for (const album of albums) {

    if (album.titleEnglish === 'Media Highlights') {
        album.gallerySection = 'Achievements';

    } else if (
        album.titleEnglish ===
        'Newspaper Articles & Publications'
    ) {
        album.gallerySection = 'Press Photos';

    } else {
        album.gallerySection = 'Ceremonial Archives';
    }
}

fs.writeFileSync(configPath, config, 'utf8');

fs.writeFileSync(
    galleryPath,
    JSON.stringify(albums, null, 2) + '\n',
    'utf8'
);

console.log('CMS ordering fields added successfully.');

for (const album of albums) {
    console.log(
        `${album.gallerySection}: ${album.titleEnglish}`
    );
}
