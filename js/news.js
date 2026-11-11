/**
 * ==========================================================================
 * KONDAVIL RAMAKRISHNA MAHA VIDYALAYAM - NEWS DATA & HANDLER
 * ==========================================================================
 * TEACHER GUIDE: HOW TO ADD OR EDIT A NEWS ARTICLE:
 * 1. To add a new article, copy one of the blocks below and paste it at the TOP
 *    of the `schoolNews` array.
 * 2. Update the `title`, `date`, `category`, `image`, `description`, and `link`.
 * 3. Save this file. The website news page and homepage will update automatically!
 * ==========================================================================
 */

const schoolNews = [
  {
  id: 8,
  titleTamil: "தேசிய உற்பத்தித்திறன் விருதுகள் 2025/26: அரச பாடசாலைகள் (உயர்தரம் வரை) பிரிவில் மூன்றாம் இடம்",
  titleEnglish: "National Productivity Awards 2025/26: 3rd Place in Government Schools up to Advanced Level",
  date: "2026-11-08",
  dateDisplay: "November 2026",
  category: "Achievements",
  image: "images/newspaper/9.jpeg",
  description: "கைத்தொழில் மற்றும் தொழில்முயற்சி அபிவிருத்தி அமைச்சின் கீழ் இயங்கும் தேசிய உற்பத்தித்திறன் செயலகத்தினால் 2025/26 ஆம் ஆண்டுக்காக நடத்தப்பட்ட தேசிய உற்பத்தித்திறன் விருதுகள் போட்டியில், அரச பாடசாலைகள் (உயர்தரம் வரை) பிரிவில் எமது கொண்டாவில் இராமகிருஷ்ண மகா வித்தியாலயம் மூன்றாம் இடத்தைப் பெற்றுள்ளது. இவ்விருது வழங்கும் நிகழ்வு 2026 நவம்பர் 08 ஆம் திகதி நடைபெற்றது.",
  detailsUrl: "images/newspaper/8.jpeg",
  readMoreText: "View Award Certificate & Trophy"
},
    {
    id: 7,
    titleTamil: "தேசிய உற்பத்தித்திறன் போட்டியில் தேசிய மட்டத்தில் மூன்றாம் இடம்",
    titleEnglish: "National Productivity Awards 2025/26: 3rd Place in the School Sector",
    date: "2026-09-30",            // ← CHANGE to the real date
    dateDisplay: "September 2026",   // ← CHANGE
    category: "Achievements",
    image: "images/newspaper/7.jpeg",
    description: "தேசிய உற்பத்தித்திறன் செயலகத்தால் 2025/26 ஆம் ஆண்டுக்காக நடத்தப்பட்ட தேசிய உற்பத்தித்திறன் விருதுகள் போட்டியில், பாடசாலைப் பிரிவில் எமது வித்தியாலயம் தேசிய ரீதியில் மூன்றாம் இடத்தைப் பெற்றுள்ளது. எட்டுத் துறைகளை உள்ளடக்கிய 1000 புள்ளிகளுக்கான மதிப்பீட்டின் அடிப்படையில் இவ்விருது கிடைத்தது.",
    detailsUrl: "images/newspaper/7.jpeg",
    readMoreText: "View Award Details"
  },
      {
    id: 3,
    titleTamil: "இல்ல மெய்வல்லுநர் போட்டி 2025",
    titleEnglish: "Inter-House Athletics Meet 2025",
    date: "2025-01-18",            // ← CHECK
    dateDisplay: "18 January 2025",   // ← CHECK
    category: "School Events",
    image: "images/newspaper/3.jpeg",
    description: "கோண்டாவில் இராமகிருஷ்ண மகா வித்தியாலயத்தின் இல்ல மெய்வல்லுநர் போட்டி, பாடசாலை விளையாட்டு மைதானத்தில் அதிபர் கு. திலீபன் தலைமையில் நடைபெற்றது. பழைய மாணவரும் யாழ். போதனா மருத்துவமனையின் பிரதிப் பணிப்பாளருமான கலாநிதி பிரதம விருந்தினராகக் கலந்துகொண்டார்.",
    detailsUrl: "images/newspaper/3b.jpeg",
    readMoreText: "View Second Report"
  },
    {
    id: 1,
    titleTamil: "வருடாந்த பரிசளிப்பு விழா 2024 & வைரவிழா மலர் வெளியீடு",
    titleEnglish: "Annual Prize Giving Ceremony 2024 & Diamond Jubilee Souvenir",
    date: "2024-10-15",
    dateDisplay: "15 October 2024",
    category: "Academic & Awards",
    image: "images/newspaper/1.jpeg",
    description: "கோண்டாவில் இராமகிருஷ்ண மகா வித்தியாலயத்தின் 2024 ஆம் ஆண்டிற்கான வருடாந்த பரிசளிப்பு விழாவும், பாடசாலையின் வைரவிழா மலர் வெளியீட்டு நிகழ்வும் அதிதிகள், பெற்றோர்கள், பழைய மாணவர்கள் முன்னிலையில் வெகு சிறப்பாக நடைபெற்றது.",
    detailsUrl: "documents/prizeReport.pdf",
    readMoreText: "View Prize Report (PDF)"
  },
    {
    id: 4,
    titleTamil: "மாணவர் நலன்புரி மற்றும் சமூக உதவிக் குழுவின் கல்வி ஊக்குவிப்புத் திட்டம்",
    titleEnglish: "Student Welfare & Community Social Assistance Initiative",
    date: "2024-07-05",
    dateDisplay: "05 July 2024",
    category: "Welfare",
    image: "images/newspaper/4.jpeg",
    description: "பாடசாலை சமூக நலன்புரி உதவிக் குழுவினரால் கல்வி உபகரணங்கள், கற்றல் உதவிகள் மற்றும் புலமைப்பரிசில் திட்டங்கள் தகுதியுடைய மாணவர்களுக்கு வழங்கி வைக்கப்பட்டது.",
    detailsUrl: "documents/socialAssistant.pdf",
    readMoreText: "View Welfare Document (PDF)"
  },
  {
    id: 6,
    titleTamil: "சர்வதேச நீர் தின நிகழ்வு & மாணவர் கௌரவிப்பு",
    titleEnglish: "World Water Day Observed at Kondavil Ramakrishna",
    date: "2024-03-22",            // ← CHANGE to the date on the newspaper
    dateDisplay: "March 2024",     // ← CHANGE
    category: "School Events",
    image: "images/newspaper/6.jpeg",
    description: "சர்வதேச நீர் தினத்தை முன்னிட்டு நடத்தப்பட்ட பல்வேறு போட்டிகளில் வெற்றிபெற்ற மாணவர்களுக்குச் சான்றிதழ் வழங்கிக் கௌரவிக்கும் நிகழ்வு, அதிபர் தலைமையில் பாடசாலைப் பிரதான மண்டபத்தில் நடைபெற்றது. நிகழ்வில் பல்வேறு கலை நிகழ்ச்சிகளும் இடம்பெற்றன.",
    detailsUrl: "images/newspaper/6b.jpeg",
    readMoreText: "View Second Clipping"
  },
  {
    id: 5,
    titleTamil: "இல்ல மெய்வல்லுநர் போட்டி 2024",
    titleEnglish: "Inter-House Athletics Meet 2024",
    date: "2024-02-01",            // ← CHANGE to the real date
    dateDisplay: "February 2024",  // ← CHANGE
    category: "School Events",
    image: "images/newspaper/5.jpeg",
    description: "பாடசாலையின் இல்ல மெய்வல்லுநர் போட்டி பாடசாலை மைதானத்தில் அதிபர் தலைமையில் சிறப்பாக நடைபெற்றது. பழைய மாணவரும் யாழ். போதனா மருத்துவமனையின் பிரதிப் பணிப்பாளருமான கலாநிதி பிரதம விருந்தினராகக் கலந்துகொண்டார்.",
    detailsUrl: "images/newspaper/5b.jpeg",
    readMoreText: "View Newspaper clipping"
  }

];

// Function to render news cards on news.html or index.html
function renderNewsCards(containerId, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = limit ? schoolNews.slice(0, limit) : schoolNews;

  container.innerHTML = items.map(item => `
    <article class="card news-card">
      <div class="card-img-wrapper lightbox-trigger" data-image="${item.image}" data-caption="${item.titleTamil} - ${item.titleEnglish}">
        <img src="${item.image}" alt="${item.titleEnglish}" loading="lazy" style="object-position: top center;" />
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="badge-tag">${item.category}</span>
          <span class="news-date">📅 ${item.dateDisplay}</span>
        </div>
        <h3 class="card-title">${item.titleTamil}</h3>
        <p class="card-subtitle-en" style="font-size:0.875rem; color:var(--school-primary); font-weight:600; margin-bottom:0.5rem;">${item.titleEnglish}</p>
        <p class="card-text">${item.description}</p>
        <div class="card-footer">
          <a href="${item.detailsUrl}" class="btn btn-sm btn-outline-primary" target="_blank" rel="noopener">
            ${item.readMoreText} ↗
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

// Auto-render when DOM loads if container exists
document.addEventListener('DOMContentLoaded', () => {
  renderNewsCards('home-news-container', 3);
  renderNewsCards('all-news-container');
});
