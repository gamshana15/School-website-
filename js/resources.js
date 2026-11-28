
/**
 * CMS Resource Management
 * Kondavil Ramakrishna Maha Vidyalayam
 */

const resourceIcons = {
    'Publications': '📖',
    'Development Plans': '📈',
    'Prize Day Reports': '🏆',
    'School History': '🏛️',
    'Staff Directory': '👨‍🏫',
    'Student Activities': '🤝',
    'Student Welfare': '🎗️',
    'Infrastructure': '🏗️',
    'Application Forms': '📝',
    'Educational Resources': '📚',
    'Other': '📄'
};

function escapeResourceHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

function safeResourceUrl(value) {

    if (!value) return '';

    try {
        const url = new URL(value, document.baseURI);

        if (
            url.origin === window.location.origin &&
            url.pathname.startsWith('/documents/') &&
            url.pathname.toLowerCase().endsWith('.pdf')
        ) {
            return escapeResourceHTML(url.href);
        }

    } catch (error) {
        console.warn('Invalid PDF path:', value);
    }

    return '';
}

function getResourceDate(item) {
    return Date.parse(item.publishedDate || '') || 0;
}

function renderResourceCard(item) {

    const file = safeResourceUrl(item.file);

    if (!file) return '';

    const icon = resourceIcons[item.category] || '📄';

    return `
        <div class="doc-card">

            <div class="doc-icon" aria-hidden="true">
                ${icon}
            </div>

            <div class="doc-info">

                <h4 class="doc-title">
                    ${escapeResourceHTML(item.title)}
                </h4>

                <p class="doc-meta">
                    ${escapeResourceHTML(item.description)}
                </p>

            </div>

            <div class="doc-btn">

                <a href="${file}"
                   target="_blank"
                   rel="noopener noreferrer"
                   download
                   class="btn btn-sm btn-primary">
                    Download PDF 📥
                </a>

            </div>

        </div>
    `;
}

async function loadSchoolResources() {

    const container = document.getElementById(
        'school-resources-container'
    );

    if (!container) return;

    try {

        const response = await fetch('/content/resources.json');

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const resources = await response.json();

        if (!Array.isArray(resources)) {
            throw new Error('Invalid resource data');
        }

        resources.sort(
            (a, b) => getResourceDate(b) - getResourceDate(a)
        );

        const cards = resources
            .map(renderResourceCard)
            .filter(Boolean);

        if (cards.length === 0) {
            container.textContent = 'No documents available.';
            return;
        }

        container.innerHTML = cards.join('');

    } catch (error) {

        console.error('Unable to load resources:', error);

        container.textContent =
            'Unable to load documents. Please try again later.';
    }
}

document.addEventListener(
    'DOMContentLoaded',
    loadSchoolResources
);
