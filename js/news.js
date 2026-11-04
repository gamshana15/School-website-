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
    id: 2,
    titleTamil: "பாடசாலை மட்ட இணைப்பாடவிதான மற்றும் விளையாட்டுச் சாதனைகள்",
    titleEnglish: "Zonal & Provincial Co-Curricular Excellence Recognition",
    date: "2024-09-20",
    dateDisplay: "20 September 2024",
    category: "Achievements",
    image: "images/newspaper/2.jpeg",
    description: "நல்லூர் கோட்ட மற்றும் யாழ்ப்பாண வலய மட்டத்தில் நடைபெற்ற கலை, கலாசார மற்றும் விளையாட்டுப் போட்டிகளில் பங்குபற்றி சாதனை படைத்த எமது மாணவச் செல்வங்கள் கௌரவிக்கப்பட்டனர்.",
    detailsUrl: "school-life.html",
    readMoreText: "Read Co-Curricular Details"
  },
  {
    id: 3,
    titleTamil: "ஐந்தாண்டு மூலோபாய அபிவிருத்தித் திட்டம் (2025-2029) அங்கீகாரம்",
    titleEnglish: "Five Year Strategic School Development Plan (2025-2029)",
    date: "2024-08-10",
    dateDisplay: "10 August 2024",
    category: "Administration",
    image: "images/newspaper/3.jpeg",
    description: "பாடசாலையின் உட்கட்டமைப்பு, நவீன கணனி ஆய்வுகூட வசதிகள், விஞ்ஞான பரிசோதனைக்கூட விரிவாக்கம் மற்றும் கல்வித் தர மேம்பாட்டை உள்ளடக்கிய ஐந்தாண்டு திட்ட வரைபு உத்தியோகபூர்வமாக வெளியிடப்பட்டது.",
    detailsUrl: "documents/five-year-plan.pdf",
    readMoreText: "Download Strategic Plan (PDF)"
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
        <img src="${item.image}" alt="${item.titleEnglish}" loading="lazy" />
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
