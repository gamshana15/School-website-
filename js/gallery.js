
/**
 * CMS Gallery Management
 * Kondavil Ramakrishna Maha Vidyalayam
 */

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
        photo.alt || photo.caption || photo.title || 'School photograph'
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

function renderGalleryAlbum(album) {
    const photos = Array.isArray(album.photos)
        ? album.photos
        : [];

    return `
        <section class="section ${album.alternateBackground ? 'section-alt' : ''}">

            <div class="container">

                <div class="section-header">

                    ${album.pretitle ? `
                        <span class="section-pretitle">
                            ${escapeGalleryHTML(album.pretitle)}
                        </span>
                    ` : ''}

                    ${album.description ? `
                        <p class="section-subtitle">
                            ${escapeGalleryHTML(album.description)}
                        </p>
                    ` : ''}

                    <h2 class="section-title">
                        ${escapeGalleryHTML(album.titleEnglish || album.titleTamil)}
                    </h2>

                    ${album.titleTamil && album.titleEnglish ? `
                        <p class="section-subtitle" lang="ta">
                            ${escapeGalleryHTML(album.titleTamil)}
                        </p>
                    ` : ''}

                    <div class="section-divider"></div>

                </div>

                <div class="gallery-grid">
                    ${photos.map(renderGalleryPhoto).join('')}
                </div>

            </div>

        </section>
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

        container.innerHTML = albums
            .map(renderGalleryAlbum)
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
