/**
 * ==========================================================================
 * KONDAVIL RAMAKRISHNA MAHA VIDYALAYAM - EVENTS DATA & HANDLER
 * ==========================================================================
 * TEACHER GUIDE: HOW TO ADD OR EDIT A SCHOOL EVENT:
 * 1. Add a new event object to the `schoolEvents` list below.
 * 2. Update `day`, `month`, `year`, `titleTamil`, `titleEnglish`, `time`,
 *    `venue`, `description`, and `status` ("upcoming" or "past").
 * 3. Save the file.
 * ==========================================================================
 */

const schoolEvents = [
  {
    id: 1,
    day: "15",
    month: "OCT",
    year: "2024",
    titleTamil: "வருடாந்த பரிசளிப்பு விழா & வைரவிழா மலர் வெளியீடு",
    titleEnglish: "Annual Prize Giving & Diamond Jubilee Souvenir Release",
    time: "09:00 AM - 01:30 PM",
    venue: "School Main Auditorium, Kondavil",
    category: "Academic",
    status: "past",
    description: "2024 ஆம் ஆண்டிற்கான கல்வியாண்டு பரிசளிப்பு வைபவமும், வைரவிழா மலர் வெளியீட்டு நிகழ்வும் பிரமுகர்கள் முன்னிலையில் இடம்பெற்றது.",
    link: "documents/prizeReport.pdf",
    linkText: "View Report"
  },
  {
    id: 2,
    day: "28",
    month: "OCT",
    year: "2024",
    titleTamil: "சரஸ்வதி பூசை மற்றும் விஜயதசமி கலை நிகழ்வுகள்",
    titleEnglish: "Saraswathi Pooja & Vijayadasami Cultural Festivities",
    time: "08:30 AM - 12:00 PM",
    venue: "School Shrine & Auditorium",
    category: "Cultural",
    status: "past",
    description: "கலைமகளின் அருளாசியோடு பாடசாலையில் சரஸ்வதி பூசை சிறப்பு வழிபாடுகளும், மாணவர்களின் பண்ணிசை, நடன நிகழ்வுகளும் இடம்பெற்றன.",
    link: "school-life.html",
    linkText: "View Activities"
  },
  {
    id: 3,
    day: "18",
    month: "NOV",
    year: "2024",
    titleTamil: "மூன்றாம் தவணை இறுதிப் பரீட்சைகள் ஆரம்பம்",
    titleEnglish: "Third Term Final Evaluation Examinations",
    time: "08:00 AM - 01:30 PM",
    venue: "All Classrooms (Grades 1 - 13)",
    category: "Examinations",
    status: "past",
    description: "மாணவர்களின் கல்வி அடைவுகளை மதிப்பீடு செய்யும் 2024 ஆம் ஆண்டிற்கான மூன்றாம் தவணைப் பரீட்சைகள் ஆரம்பமாகின்றன.",
    link: "academics.html",
    linkText: "Academic Info"
  },
  {
    id: 4,
    day: "15",
    month: "JAN",
    year: "2025",
    titleTamil: "தைப்பொங்கல் பெருவிழா மற்றும் பாரம்பரிய பண்பாட்டு நிகழ்வுகள்",
    titleEnglish: "Thai Pongal Cultural Festival & Traditions",
    time: "08:00 AM - 11:30 AM",
    venue: "School Grounds & Courtyard",
    category: "Cultural",
    status: "past",
    description: "உழவர் பெருநாளை முன்னிட்டு பாடசாலை சமூகத்தின் கூட்டுப் பொங்கல் வழிபாடும் மாணவர்களின் கோலப்போட்டி, கலை நிகழ்வுகளும் நடைபெற்றன.",
    link: "school-life.html",
    linkText: "School Life"
  },
  {
    id: 5,
    day: "20",
    month: "FEB",
    year: "2025",
    titleTamil: "வருடாந்த இல்ல மெய்வல்லுநர் விளையாட்டுப் போட்டி",
    titleEnglish: "Annual Inter-House Athletic & Sports Meet",
    time: "01:00 PM - 06:00 PM",
    venue: "School Sports Ground, Kondavil East",
    category: "Sports",
    status: "past",
    description: "மாணவர்களின் விளையாட்டுத் திறமைகளை வெளிக்கொணரும் வருடாந்த இல்ல மெய்வல்லுநர் இறுதிப் போட்டிகள் மற்றும் பரிசளிப்பு விழா.",
    link: "school-life.html",
    linkText: "Sports Info"
  },
  {
    id: 6,
    day: "12",
    month: "MAR",
    year: "2025",
    titleTamil: "ஸ்ரீ இராமகிருஷ்ண பரமஹம்சர் ஜெயந்தி மற்றும் விவேகானந்தர் நினைவு நாள்",
    titleEnglish: "Sri Ramakrishna Paramahamsa Jayanthi Celebration",
    time: "08:30 AM - 11:30 AM",
    venue: "Vidyalayam Main Hall",
    category: "Spiritual",
    status: "past",
    description: "பாடசாலையின் வழிகாட்டிகளான பகவான் ஸ்ரீ இராமகிருஷ்ணர் மற்றும் சுவாமி விவேகானந்தரின் அருளுரைகள் மற்றும் ஆன்மீகச் சிறப்புச் சொற்பொழிவு.",
    link: "about.html",
    linkText: "School Values"
  }
];

function renderEventsCards(containerId, filterStatus) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = filterStatus 
    ? schoolEvents.filter(e => e.status === filterStatus)
    : schoolEvents;

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; background: #fff; border-radius: 8px; border: 1px solid var(--border-color);">
        <p style="color: var(--text-secondary); font-size: 1rem;">தற்போது புதிய நிகழ்வுகள் அறிவிக்கப்படவில்லை. நிகழ்வுகள் பற்றிய உத்தியோகபூர்வ தகவல்கள் விரைவில் இங்கு பதிவேற்றப்படும்.</p>
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.5rem;">No new event scheduled at the moment. Please check back for official updates.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(ev => `
    <div class="card event-card" style="display:flex; flex-direction:row; align-items:stretch;">
      <div style="background:var(--school-primary); color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.25rem; min-width:90px; text-align:center; border-right:3px solid var(--school-secondary);">
        <span style="font-size:1.75rem; font-weight:800; font-family:var(--font-heading); line-height:1;">${ev.day}</span>
        <span style="font-size:0.875rem; font-weight:700; color:var(--school-secondary); text-transform:uppercase; margin-top:0.25rem;">${ev.month}</span>
        <span style="font-size:0.75rem; opacity:0.85;">${ev.year}</span>
      </div>
      <div class="card-body" style="padding:1.25rem;">
        <div class="card-meta">
          <span class="badge-tag">${ev.category}</span>
          <span style="font-size:0.8125rem; color:var(--text-muted);">🕒 ${ev.time}</span>
        </div>
        <h3 class="card-title" style="font-size:1.15rem; margin-bottom:0.25rem;">${ev.titleTamil}</h3>
        <p style="font-size:0.85rem; color:var(--school-primary); font-weight:600; margin-bottom:0.5rem;">${ev.titleEnglish}</p>
        <p style="font-size:0.8125rem; color:var(--text-muted); margin-bottom:0.65rem;">📍 ${ev.venue}</p>
        <p class="card-text" style="font-size:0.875rem; margin-bottom:0.75rem;">${ev.description}</p>
        ${ev.link ? `<a href="${ev.link}" class="btn btn-sm btn-outline-primary" style="align-self:flex-start;">${ev.linkText} →</a>` : ''}
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderEventsCards('home-events-container');
  renderEventsCards('all-events-container');
});
