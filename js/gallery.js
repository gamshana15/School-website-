
/**
 * CMS Gallery Management
 * Kondavil Ramakrishna Maha Vidyalayam
 *
 * Features:
 * - Automatic WebP thumbnails
 * - Original image lightbox
 * - Fixed gallery section ordering
 * - Latest ceremonial albums first
 * - Continuous alternating backgrounds
 * - Compact integrated section headings
 * - Responsive layout using existing CSS
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

    // Use the optimized thumbnail when available.
    // The original photograph is used in the lightbox.
    const thumbnail =
        safeGalleryUrl(photo.thumbnail) || image;

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

            <img src="${thumbnail}"
                 alt="${alt}"
                 class="gallery-thumb"
                 loading="lazy"
                 decoding="async" />

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

function renderGalleryAlbum(
    album,
    index,
    sectionHeading = '',
    showIntroduction = false
) {

    const photos = Array.isArray(album.photos)
        ? album.photos
        : [];

    // Alternate backgrounds continuously
    // across all gallery sections.
    const backgroundClass =
        index % 2 !== 0 ? 'section-alt' : '';

    return `
        <section class="section ${backgroundClass}">

            <div class="container">

                <div class="section-header">

                    ${sectionHeading ? `
                        <span class="section-pretitle">
                            ${escapeGalleryHTML(sectionHeading)}
                        </span>
                    ` : ''}

                    <h2 class="section-title">
                        ${escapeGalleryHTML(album.titleEnglish)}
                    </h2>

                    <div class="section-divider"></div>

                    ${showIntroduction ? `
                        <p class="section-subtitle">
                            Click on any image to open the
                            high-resolution lightbox viewer.
                        </p>
                    ` : ''}

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

    // Compatibility with older gallery records.
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

function renderGalleryAlbums(albums) {

    let globalIndex = 0;

    return gallerySections.map(section => {

        const group = albums.filter(
            album => getGallerySection(album) === section
        );

        // Do not render headings for empty sections.
        if (group.length === 0) {
            return '';
        }

        // Most recently updated ceremonial albums first.
        if (section === 'Ceremonial Archives') {

            group.sort(
                (a, b) => getGalleryDate(b) - getGalleryDate(a)
            );

        }

        return group.map((album, groupIndex) => {

            // Display each group heading only once.
            const sectionHeading =
                groupIndex === 0 ? section : '';

            // Display the lightbox instruction only once,
            // beneath the first visible album heading.
            const showIntroduction =
                globalIndex === 0;

            return renderGalleryAlbum(
                album,
                globalIndex++,
                sectionHeading,
                showIntroduction
            );

        }).join('');

    }).join('');
}

async function loadSchoolGallery() {

    const container = document.getElementById(
        'school-gallery-container'
    );

    if (!container) return;

    try {

        const response = await fetch('/content/gallery.json');

        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

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

        container.innerHTML = renderGalleryAlbums(albums);

        // Fall back to original photographs if
        // optimized thumbnails fail to load.
        container.querySelectorAll('.gallery-thumb')
            .forEach(img => {

                const useOriginal = () => {

                    const original = img
                        .closest('.gallery-item')
                        ?.getAttribute('data-image');

                    if (original && img.src !== original) {
                        img.src = original;
                    }

                };

                img.addEventListener(
                    'error',
                    useOriginal,
                    { once: true }
                );

                if (img.complete && img.naturalWidth === 0) {

                    useOriginal();

                }

            });

    } catch (error) {

        console.error(
            'Unable to load school gallery:',
            error
        );

        container.innerHTML = `
            <div class="container" style="padding:2rem;">
                <p>
                    Unable to load the gallery.
                    Please try again later.
                </p>
            </div>
        `;

    }
}

document.addEventListener(
    'DOMContentLoaded',
    loadSchoolGallery
);
