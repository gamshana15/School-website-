
/**
 * KONDAVIL RAMAKRISHNA MAHA VIDYALAYAM
 * CMS Announcements Handler
 *
 * Content: public/content/announcements.json
 */

// Protect HTML from unsafe content.
function escapeAnnouncementHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

// Validate announcement links.
function safeAnnouncementUrl(value) {
  if (!value) return '';

  try {
    const url = new URL(value, document.baseURI);

    if (url.protocol === 'https:' ||
        url.protocol === 'http:') {
      return escapeAnnouncementHTML(url.href);
    }
  } catch (error) {
    console.warn('Invalid announcement URL:', value);
  }

  return '';
}

// Get today's date in Sri Lanka.
function getAnnouncementToday() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Colombo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(part => [part.type, part.value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

// Load and display announcements.
async function loadAnnouncements() {
  const container = document.getElementById(
    'school-announcements'
  );

  if (!container) return;

  try {
    const response = await fetch(
      '/content/announcements.json'
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid announcements data');
    }

    const today = getAnnouncementToday();

    // Show only active and valid announcements.
    const announcements = data.filter(item =>
      item.active !== false &&
      item.publishDate &&
      item.publishDate <= today &&
      (!item.expiryDate || item.expiryDate >= today)
    );

    // Important announcements first, then newest first.
    announcements.sort((a, b) =>
      Number(Boolean(b.important)) -
      Number(Boolean(a.important)) ||
      b.publishDate.localeCompare(a.publishDate)
    );

    if (announcements.length === 0) {
      container.hidden = true;
      return;
    }

    container.innerHTML = `
      <div class="container">
        ${announcements.map(item => {
          const link = safeAnnouncementUrl(item.link);

          return `
            <article class="announcement-item
              ${item.important ? 'announcement-important' : ''}">

              <span class="announcement-icon"
                    aria-hidden="true">📢</span>

              <div class="announcement-content">

                <div class="announcement-label">
                  ${item.important
                    ? 'Important Announcement'
                    : 'அறிவித்தல் | Announcement'}
                </div>

                <p class="announcement-tamil" lang="ta">
                  ${escapeAnnouncementHTML(item.titleTamil)}
                </p>

                ${item.titleEnglish ? `
                  <p class="announcement-english">
                    ${escapeAnnouncementHTML(item.titleEnglish)}
                  </p>
                ` : ''}

                ${link ? `
                  <a class="announcement-link"
                     href="${link}"
                     target="_blank"
                     rel="noopener noreferrer">
                    Read More →
                  </a>
                ` : ''}

              </div>
            </article>
          `;
        }).join('')}
      </div>
    `;

    container.hidden = false;

  } catch (error) {
    console.error('Unable to load announcements:', error);
    container.hidden = true;
  }
}

document.addEventListener(
  'DOMContentLoaded',
  loadAnnouncements
);
