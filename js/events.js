
/**
 * KONDAVIL RAMAKRISHNA MAHA VIDYALAYAM
 * CMS Events Loader and Display Handler
 *
 * Events content: public/content/events.json
 * Content editor: Pages CMS
 */

let schoolEvents = [];

// Protect HTML from unsafe content.
function escapeEventHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

// Allow safe website and external links.
function safeEventUrl(value) {
  if (!value) return '';

  try {
    const url = new URL(value, document.baseURI);

    if (url.protocol === 'https:' ||
        url.protocol === 'http:') {
      return escapeEventHTML(url.href);
    }
  } catch (error) {
    console.warn('Invalid event URL:', value);
  }

  return '';
}

// Get today's date in Sri Lankan time.
function getSchoolToday() {
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

// Determine event status automatically.
function getEventStatus(date) {
  return date >= getSchoolToday()
    ? 'upcoming'
    : 'past';
}

// Convert date into the existing card format.
function getEventDateParts(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return { day: '', month: '', year: '' };
  }

  return {
    day: date.getUTCDate(),
    month: date.toLocaleString('en-GB', {
      month: 'short',
      timeZone: 'UTC'
    }).toUpperCase(),
    year: date.getUTCFullYear()
  };
}

// Render events using the existing design.
function renderEventsCards(containerId, filterStatus) {
  const container = document.getElementById(containerId);

  if (!container) return;

  const items = filterStatus
    ? schoolEvents.filter(
        ev => getEventStatus(ev.date) === filterStatus
      )
    : schoolEvents;

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; background: #fff; border-radius: 8px; border: 1px solid var(--border-color);">
        <p style="color: var(--text-secondary); font-size: 1rem;">
          தற்போது புதிய நிகழ்வுகள் அறிவிக்கப்படவில்லை. நிகழ்வுகள் பற்றிய உத்தியோகபூர்வ தகவல்கள் விரைவில் இங்கு பதிவேற்றப்படும்.
        </p>
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.5rem;">
          No new event scheduled at the moment. Please check back for official updates.
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(ev => {
    const { day, month, year } = getEventDateParts(ev.date);
    const link = safeEventUrl(ev.link);

    return `
      <div class="card event-card" style="display:flex; flex-direction:row; align-items:stretch;">

        <div style="background:var(--school-primary); color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.25rem; min-width:90px; text-align:center; border-right:3px solid var(--school-secondary);">

          <span style="font-size:1.75rem; font-weight:800; font-family:var(--font-heading); line-height:1;">
            ${day}
          </span>

          <span style="font-size:0.875rem; font-weight:700; color:var(--school-secondary); text-transform:uppercase; margin-top:0.25rem;">
            ${month}
          </span>

          <span style="font-size:0.75rem; opacity:0.85;">
            ${year}
          </span>

        </div>

        <div class="card-body" style="padding:1.25rem;">

          <div class="card-meta">

            <span class="badge-tag">
              ${escapeEventHTML(ev.category)}
            </span>

            <span style="font-size:0.8125rem; color:var(--text-muted);">
              🕒 ${escapeEventHTML(ev.time)}
            </span>

          </div>

          <h3 class="card-title" style="font-size:1.15rem; margin-bottom:0.25rem;">
            ${escapeEventHTML(ev.titleTamil)}
          </h3>

          <p style="font-size:0.85rem; color:var(--school-primary); font-weight:600; margin-bottom:0.5rem;">
            ${escapeEventHTML(ev.titleEnglish)}
          </p>

          <p style="font-size:0.8125rem; color:var(--text-muted); margin-bottom:0.65rem;">
            📍 ${escapeEventHTML(ev.venue)}
          </p>

          <p class="card-text" style="font-size:0.875rem; margin-bottom:0.75rem;">
            ${escapeEventHTML(ev.description)}
          </p>

          ${link ? `
            <a href="${link}"
               class="btn btn-sm btn-outline-primary"
               style="align-self:flex-start;">
              ${escapeEventHTML(ev.linkText || 'Read More')} →
            </a>
          ` : ''}

        </div>
      </div>
    `;
  }).join('');
}

// Load events from CMS-managed JSON.
async function loadSchoolEvents() {
  try {
    const response = await fetch('/content/events.json');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid events data format');
    }

    const today = getSchoolToday();

    const upcoming = data
      .filter(ev => ev.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));

    const past = data
      .filter(ev => ev.date < today)
      .sort((a, b) => b.date.localeCompare(a.date));

    // Upcoming events first, followed by past events.
    schoolEvents = [...upcoming, ...past];

    renderEventsCards('home-events-container');
    renderEventsCards('all-events-container');

  } catch (error) {
    console.error('Unable to load school events:', error);

    ['home-events-container', 'all-events-container']
      .forEach(id => {
        const container = document.getElementById(id);

        if (container) {
          container.textContent =
            'நிகழ்வுகளை ஏற்ற முடியவில்லை. Unable to load events.';
        }
      });
  }
}

document.addEventListener('DOMContentLoaded', loadSchoolEvents);
