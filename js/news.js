
/**
 * KONDAVIL RAMAKRISHNA MAHA VIDYALAYAM
 * CMS News Loader and Display Handler
 *
 * News content: public/content/news.json
 * Content editor: Pages CMS
 */

let schoolNews = [];

// Protect HTML from unsafe content.
function escapeNewsHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

// Allow safe website and external HTTPS/HTTP links.
function safeNewsUrl(value) {
  if (!value) return '';

  try {
    const url = new URL(value, document.baseURI);

    if (url.protocol === 'https:' || url.protocol === 'http:') {
      return escapeNewsHTML(url.href);
    }
  } catch (error) {
    console.warn('Invalid news URL:', value);
  }

  return '';
}

// Render news cards using the existing website design.
function renderNewsCards(containerId, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = limit
    ? schoolNews.slice(0, limit)
    : schoolNews;

  container.innerHTML = items.map(item => {
    const image = safeNewsUrl(item.image);
    const link = safeNewsUrl(item.detailsUrl);
    const titleTamil = escapeNewsHTML(item.titleTamil);
    const titleEnglish = escapeNewsHTML(item.titleEnglish);

    return `
      <article class="card news-card">
        ${image ? `
          <div class="card-img-wrapper lightbox-trigger"
               data-image="${image}"
               data-caption="${titleTamil} - ${titleEnglish}">
            <img src="${image}"
                 alt="${titleEnglish}"
                 loading="lazy"
                 style="object-position: top center;" />
          </div>
        ` : ''}

        <div class="card-body">
          <div class="card-meta">
            <span class="badge-tag">
              ${escapeNewsHTML(item.category)}
            </span>
            <span class="news-date">
              📅 ${escapeNewsHTML(item.dateDisplay || item.date)}
            </span>
          </div>

          <h3 class="card-title">${titleTamil}</h3>

          <p class="card-subtitle-en"
             style="font-size:0.875rem; color:var(--school-primary); font-weight:600; margin-bottom:0.5rem;">
            ${titleEnglish}
          </p>

          <p class="card-text">
            ${escapeNewsHTML(item.description)}
          </p>

          ${link ? `
            <div class="card-footer">
              <a href="${link}"
                 class="btn btn-sm btn-outline-primary"
                 target="_blank"
                 rel="noopener noreferrer">
                ${escapeNewsHTML(item.readMoreText || 'Read More')} ↗
              </a>
            </div>
          ` : ''}
        </div>
      </article>
    `;
  }).join('');
}

// Load news managed by Pages CMS.
async function loadSchoolNews() {
  try {
    const response = await fetch('/content/news.json');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid news data format');
    }

   schoolNews = data.sort((a, b) => 
  new Date(b.date) - new Date(a.date)
);

    renderNewsCards('home-news-container', 3);
    renderNewsCards('all-news-container');

  } catch (error) {
    console.error('Unable to load school news:', error);

    ['home-news-container', 'all-news-container'].forEach(id => {
      const container = document.getElementById(id);

      if (container) {
        container.textContent =
          'செய்திகளை ஏற்ற முடியவில்லை. Unable to load news.';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', loadSchoolNews);
