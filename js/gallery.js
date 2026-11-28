
/**
 * CMS Gallery Management
 * Kondavil Ramakrishna Maha Vidyalayam
 */

const gallerySections = [
    'Ceremonial Archives',
    'Achievements',
    'Press Photos'
];

function escapeGalleryHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

function safeGalleryUrl(value) {
    if (!value) return '';

    try {
        const url = new URL(value, document.baseURI);

        if (
            url.protocol === 'https:' ||
            url.protocol === 'http:'
        ) {
            return escapeGalleryHTML(url.href);
        }

    } catch (error) {
        console.warn('Invalid gallery image:', value);
    }

    return '';
}

function renderGalleryPhoto(photo) {
    const image = safeGalleryUrl(photo.image);

    if (!image) return '';

    const title = escapeGalleryHTML(photo.title);
    const category = escapeGalleryHTML(photo.category);

    const caption = escapeGalleryHTML(
        photo.caption || photo.title
    );

    const alt = escapeGalleryHTML(
        photo.caption ||
        photo.title ||
        'School photograph'
    );

    return `
        <div class="gallery-item lightbox-trigger"
             data-image="${image}"
             data-caption="${caption}"
             ${photo.imageOnly ? 'data-image-only' : ''}>

            <img src="${image}"
                 alt="${alt}"
                 class="gallery-thumb"
                 loading="lazy" />

            ${!photo.imageOnly && (title || category) ? `
                <div class="gallery-overlay">

                    ${category ? `
                        <span class="gallery-category">
                            ${category}
                        </span>
                    ` : ''}

                    ${title ? `
                        <div class="gallery-title">
                            ${title}
                        </div>
                    ` : ''}

                </div>
            ` : ''}

        </div>
    `;
}

function renderGalleryAlbum(album, index) {

    const photos = Array.isArray(album.photos)
        ? album.photos
        : [];

    return `
        <section class="section ${index % 2 !== 0 ? 'section-alt' : ''}">

            <div class="container">

                <div class="section-header">

                    <h2 class="section-title">
                        ${escapeGalleryHTML(album.titleEnglish)}
                    </h2>

                    <div class="section-divider"></div>

                </div>

                <div class="gallery-grid">
                    ${photos.map(renderGalleryPhoto).join('')}
                </div>

            </div>

        </section>
    `;
}

function getGallerySection(album) {

    if (gallerySections.includes(album.gallerySection)) {
        return album.gallerySection;
    }

    if (album.titleEnglish === 'Media Highlights') {
        return 'Achievements';
    }

    if (
        album.titleEnglish ===
        'Newspaper Articles & Publications'
    ) {
        return 'Press Photos';
    }

    return 'Ceremonial Archives';
}

function getGalleryDate(album) {
    return Date.parse(album.updatedDate || '') || 0;
}

function renderGalleryGroup(section, albums) {

    const group = albums.filter(
        album => getGallerySection(album) === section
    );

    if (section === 'Ceremonial Archives') {
        group.sort(
            (a, b) => getGalleryDate(b) - getGalleryDate(a)
        );
    }

    const heading = section === 'Ceremonial Archives'
        ? ''
        : `
            <div class="container" style="padding-top:2rem;">
                <div class="section-header">
                    <span class="section-pretitle">
                        ${escapeGalleryHTML(section)}
                    </span>
                </div>
            </div>
        `;

    return `
        ${heading}
        ${group.map(renderGalleryAlbum).join('')}
    `;
}

async function loadSchoolGallery() {

    const container = document.getElementById(
        'school-gallery-container'
    );

    if (!container) return;

    try {

        const response = await fetch('/content/gallery.json');

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const albums = await response.json();

        if (!Array.isArray(albums)) {
            throw new Error('Invalid gallery data');
        }

        if (albums.length === 0) {
            container.innerHTML = `
                <div class="container" style="padding:2rem;">
                    <p>No gallery albums available.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = gallerySections
            .map(section => renderGalleryGroup(section, albums))
            .join('');

    } catch (error) {

        console.error('Unable to load school gallery:', error);

        container.innerHTML = `
            <div class="container" style="padding:2rem;">
                <p>Unable to load the gallery. Please try again later.</p>
            </div>
        `;
    }
}

document.addEventListener(
    'DOMContentLoaded',
    loadSchoolGallery
);
