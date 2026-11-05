# ஆசிரியர் பராமரிப்பு வழிகாட்டி • TEACHER MAINTENANCE GUIDE
## கோண்டாவில் இராமகிருஷ்ண மகா வித்தியாலயம் உத்தியோகபூர்வ இணையத்தளம்
### Kondavil Ramakrishna Maha Vidyalayam Official Website

வணக்கம்! This guide has been prepared specifically for teachers and staff at **Kondavil Ramakrishna Maha Vidyalayam** who are responsible for maintaining and updating the school website.

The website has been deliberately built using standard, clean **HTML5, CSS3, and straightforward JavaScript**. There are **no complex databases, no build commands required, no node/npm requirements just to edit text, and no complicated frameworks**.

---

## கோப்பு மற்றும் அடைவு கட்டமைப்பு • Project Directory Structure

```text
kramakrishna-website/
│
├── index.html                  <- முகப்புப் பக்கம் (Homepage)
├── about.html                  <- எம்மவர் பாடசாலை அறிமுகம் (About Us)
├── academics.html              <- கல்விப் பிரிவுகள் & பாடத்திட்டம் (Academics)
├── school-life.html            <- மாணவர் வாழ்வு, விளையாட்டுகள், கீதம் (School Life)
├── news.html                   <- செய்திகள் மற்றும் பத்திரிகை பிரசுரங்கள் (News)
├── events.html                 <- பாடசாலை நாட்காட்டி நிகழ்வுகள் (Events)
├── gallery.html                <- புகைப்படங்கள் மற்றும் ஆடியோ தொகுப்பு (Gallery)
├── resources.html              <- அனைத்து ஆவணப் பதிவிறக்கங்கள் (Resources & Downloads)
├── contact.html                <- பாடசாலை அமைவிடம் & தொடர்புகள் (Contact Us)
│
├── pages/                      <- மேலதிக விபரப் பக்கங்கள் (Subpages)
│   ├── history.html            <- பாடசாலை வரலாறு (School History)
│   ├── principal-message.html  <- அதிபர் உரை (Principal's Message)
│   ├── school-profile.html     <- பாடசாலை விபரம் & வகைப்பாடு (School Profile)
│   ├── past-principals.html    <- 17 முன்னாள் அதிபர்கள் (Past Principals)
│   └── founder.html            <- பாடசாலை நிறுவனர் (Founder Tribute)
│
├── css/
│   └── style.css               <- பிரதான வடிவமைப்பு & நிறங்கள் (Theme & Colors)
│
├── js/
│   ├── main.js                 <- மெனு & Lightbox செயல்பாடுகள் (Core Interactions)
│   ├── news.js                 <- செய்திகள் பட்டியல் (Editable News Data)
│   └── events.js               <- நிகழ்வுகள் பட்டியல் (Editable Events Data)
│
├── images/                     <- புகைப்படங்கள் (Photos & Graphics)
│   ├── school-logo.png         <- பாடசாலை இலச்சினை (School Crest)
│   ├── school-hero.jpg         <- முகப்புப் படத் தலைப்பு (Hero image)
│   ├── school-banner.png       <- பாடசாலை வளாகக் காட்சி (Campus Banner)
│   ├── current-principal.jpg   <- தற்போதைய அதிபர் படம் (Current Principal)
│   ├── founder.jpg             <- பாடசாலை நிறுவனர் படம் (Founder)
│   ├── principals/             <- முன்னாள் அதிபர்கள் படங்கள் (1.jpg to 17.jpg)
│   ├── prize-giving/           <- பரிசளிப்பு விழாப் படங்கள் (1.jpg to 7.jpg)
│   ├── newspaper/              <- செய்தித்தாள் படங்கள் (1.jpeg to 4.jpeg)
│   └── school-assets/          <- மகுட வாசகம், நோக்கு, பணி பலகைகள் (p1, p2, p3)
│
├── documents/                  <- உத்தியோகபூர்வ PDF ஆவணங்கள் (Official PDFs)
│   ├── schoolPlan2024.pdf      <- பாடசாலை திட்டம் 2024
│   ├── five-year-plan.pdf      <- ஐந்தாண்டு திட்டம் (2025-2029)
│   ├── prizeBook.pdf           <- வைரவிழா மலர் நூல்
│   ├── prizeReport.pdf         <- பரிசளிப்பு விழா அறிக்கை 2024
│   ├── prize.pdf               <- பரிசளிப்பு விழா நிகழ்ச்சி நிரல்
│   ├── teachers.pdf            <- ஆசிரியர் குழாம் விபரம்
│   ├── schoolHistory.pdf       <- பாடசாலை வரலாற்று ஆவணம்
│   ├── activityCommittee.pdf   <- செயற்பாட்டுக் குழு விபரம்
│   ├── socialAssistant.pdf     <- மாணவர் நலன்புரி உதவிகள்
│   └── schoolNeeds.pdf         <- பாடசாலை பௌதிகத் தேவைகள்
│
├── audio/
│   └── school-song.mp3         <- பாடசாலை கீதம் (School Anthem MP3)
│
└── TEACHER-GUIDE.md            <- இந்த பராமரிப்பு வழிகாட்டி ஆவணம்
```

---

## 1. திட்டக் கோப்புறையைத் திறத்தல் • Opening the Project

1. கணனியில் இணையத்தளக் கோப்புறையை (folder) திறக்கவும்.
2. கோப்புகளைத் திருத்துவதற்கு **Visual Studio Code**, **Notepad++**, அல்லது எளிய **Notepad** போன்ற எடிட்டரைப் பயன்படுத்தவும்.
3. திருத்தங்களைச் செய்வதற்கு முன், முழு கோப்புறையையும் ஒரு பாதுகாப்பான இடத்தில் பிரதியெடுத்து (backup copy) வைத்துக்கொள்ளவும்.

---

## 2. பொருத்தமான பக்கத்தைக் கண்டறிதல் • Finding the Correct Page

* முகப்புப் பக்கத்தின் உரையை மாற்ற: `index.html`
* பாடசாலை வரலாறு, நோக்கு, பணியை மாற்ற: `about.html` அல்லது `pages/history.html`
* அதிபரின் உரையை மாற்ற: `pages/principal-message.html`
* தரம் 1 - 13 பாடத்திட்டம் மற்றும் வகுப்புகளை மாற்ற: `academics.html`
* விளையாட்டு மற்றும் பாடசாலைக் கீதப் பக்கத்தை மாற்ற: `school-life.html`
* புதிய செய்திகளைச் சேர்க்க: `js/news.js`
* புதிய நிகழ்வுகளைச் சேர்க்க: `js/events.js`
* புதிய ஆவணங்களை இணைக்க: `resources.html`
* முகவரி அல்லது தொலைபேசி இலக்கத்தை மாற்ற: `contact.html`

---

## 3. உரைகள் மற்றும் தலைப்புகளைத் திருத்துதல் • Editing Text and Headings

1. திருத்த வேண்டிய HTML கோப்பை Notepad அல்லது VS Code இல் திறக்கவும்.
2. மாற்ற வேண்டிய சொற்களை `Ctrl + F` அழுத்தித் தேடவும்.
3. HTML குறிச்சொற்களை (`<h1>`, `<p>`, `<div>`) அழிக்காமல், அவற்றுக்கு நடுவில் உள்ள உரையை மட்டும் மாற்றவும்.
4. **உதாரணம்:**
   ```html
   <!-- இதற்கு முன் (Before) -->
   <h2 class="section-title">அறிவும் ஒழுக்கமும் தொண்டும்</h2>

   <!-- மாற்றிய பின் (After) -->
   <h2 class="section-title">உங்கள் புதிய தலைப்பு இங்கே</h2>
   ```
5. கோப்பைச் சேமிக்கவும் (`Ctrl + S`).

---

## 4. புதிய செய்தி ஒன்றைச் சேர்த்தல் • Adding a News Article

செய்திகள் `js/news.js` கோப்பில் எளிய முறையில் ஒழுங்கமைக்கப்பட்டுள்ளன.

1. `js/news.js` கோப்பைத் திறக்கவும்.
2. `schoolNews` பட்டியலில் முதலாவதாகப் புதிய செய்தியைச் சேர்க்கவும்:
   ```javascript
   {
     id: 5,
     titleTamil: "புதிய ஆய்வுகூடத் திறப்பு விழா 2026",
     titleEnglish: "Inauguration of New Science Lab 2026",
     date: "2026-11-15",
     dateDisplay: "15 November 2026",
     category: "Academic",
     image: "images/newspaper/1.jpeg",
     description: "எமது பாடசாலையில் புதிதாக நிர்மாணிக்கப்பட்ட நவீன விஞ்ஞான ஆய்வுகூடம் திறந்து வைக்கப்பட்டது.",
     detailsUrl: "news.html",
     readMoreText: "முழு விபரம் வாசிக்க"
   },
   ```
3. கோப்பைச் சேமிக்கவும். புதிய செய்தி முகப்புப் பக்கத்திலும், `news.html` பக்கத்திலும் தானாகவே காண்பிக்கப்படும்!

---

## 5. முக்கிய அறிவிப்பை மாற்றுதல் • Updating Top Bar Announcements

ஒவ்வொரு பக்கத்தின் மேற்பகுதியிலும் உள்ள Announcement bar ஐ மாற்ற:
1. `index.html` (மற்றும் ஏனைய பக்கங்களை) திறக்கவும்.
2. மேல் பகுதியில் உள்ள `<aside class="top-bar">` பகுதியைத் தேடவும்:
   ```html
   <div class="top-bar-left">
     <span class="badge-tag">அறிவிப்பு • Notice</span>
     <span>பாடசாலை புதிய அறிவிப்பு உரை இங்கே எழுதப்படும்...</span>
   </div>
   ```
3. புதிய அறிவிப்பை எழுதிச் சேமிக்கவும்.

---

## 6. புதிய நிகழ்வைச் சேர்த்தல் • Adding an Event

1. `js/events.js` கோப்பைத் திறக்கவும்.
2. `schoolEvents` பட்டியலில் புதிய நிகழ்வுப் பகுதியைச் சேர்க்கவும்:
   ```javascript
   {
     id: 7,
     day: "10",
     month: "DEC",
     year: "2026",
     titleTamil: "பெற்றோர் ஆசிரியர் சங்க பொதுக்கூட்டம்",
     titleEnglish: "PTA General Assembly Meeting",
     time: "09:30 AM - 12:30 PM",
     venue: "School Main Auditorium",
     category: "Administration",
     status: "upcoming",
     description: "பாடசாலை கல்வி வளர்ச்சி மற்றும் மாணவர் நலன் தொடர்பான பெற்றோர்களுக்கான விசேட பொதுக்கூட்டம்.",
     link: "contact.html",
     linkText: "அலுவலகத் தொடர்புக்கு"
   },
   ```
3. `status` என்பதை `"upcoming"` (வரவிருக்கும் நிகழ்வு) அல்லது `"past"` (முடிவடைந்த நிகழ்வு) எனத் தெரிவுசெய்யலாம்.

---

## 7. புகைப்படங்களை மாற்றுதல் • Replacing a Photograph

1. புதிய புகைப்படத்தை உங்கள் கணனியில் தயார் செய்யவும் (பரிந்துரைக்கப்பட்ட வடிவம்: `.jpg` அல்லது `.png`).
2. கோப்பிற்கு எளிய ஆங்கிலப் பெயரை இடவும் (உதாரணம்: `new-hero.jpg` அல்லது `sports-2026.jpg`).
3. அந்தப் படத்தை `images/` கோப்புறையிலோ அல்லது தொடர்புடைய துணை அடைவிலோ (`images/prize-giving/`, `images/newspaper/`) இட்டு வைக்கவும்.
4. தொடர்புடைய HTML அல்லது JS கோப்பில் பழைய படத்தின் பெயரை மாற்றி புதிய படத்தின் பெயரை இடவும்:
   ```html
   <!-- பழைய படம் -->
   <img src="images/school-hero.jpg" alt="..." />

   <!-- புதிய படம் -->
   <img src="images/new-hero.jpg" alt="..." />
   ```

---

## 7b. முகப்பு நகரும் படத்தொகுதியை மாற்றுதல் • Updating the Moving Photo Carousel

முகப்புப் பக்கத்தில் (`index.html`) தானாக நகரும் புகைப்படங்களை மாற்ற அல்லது புதிய படங்களைச் சேர்க்க:

1. `index.html` கோப்பைத் திறந்து `<div class="hero-carousel-container"` பகுதியைத் தேடவும்.
2. ஒவ்வொரு slide-உம் `<div class="hero-slide ...">` என்ற அமைப்பில் உள்ளது:
   ```html
   <div class="hero-slide active">
     <div class="hero-slide-bg" style="background-image: url('images/school-banner.png');"></div>
     <div class="hero-slide-overlay"></div>
     <div class="hero-slide-content">
       <span class="hero-slide-badge">Type 1C Provincial School • Jaffna</span>
       <h1 class="hero-slide-title">Kondavil Ramakrishna Maha Vidyalayam</h1>
       <p class="hero-slide-subtitle">Nurturing Excellence, Discipline, and Service Since Foundation</p>
       ...
     </div>
   </div>
   ```
3. படத்தின் பாதையை மாற்ற `url('images/உங்கள்-படம்.jpg')` என்ற வரையைத் திருத்தவும்.
4. தலைப்பு, விளக்க உரை மற்றும் பொத்தான்களை உங்கள் விருப்பத்திற்கேற்ப மாற்றலாம். JavaScript தானாகவே அனைத்து slides களையும் கண்டறிந்து அடுத்தடுத்து சுழல வைக்கும்.

---

## 8. புதிய PDF ஆவணத்தைப் பதிவேற்றுதல் • Uploading a PDF Document

1. நீங்கள் பதிவேற்ற விரும்பும் புதிய PDF கோப்பை `documents/` கோப்புறைக்குள் வைக்கவும் (உதாரணம்: `documents/term-test-timetable.pdf`).
2. `resources.html` கோப்பைத் திறக்கவும்.
3. பதிவிறக்கப் பகுதியில் புதிய அட்டையைச் சேர்க்கவும்:
   ```html
   <div class="doc-card">
     <div class="doc-icon">📑</div>
     <div class="doc-info">
       <h4 class="doc-title">மூன்றாம் தவணைப் பரீட்சை அட்டவணை 2026</h4>
       <p class="doc-meta">Term Evaluation Examination Timetable (PDF)</p>
     </div>
     <div class="doc-btn">
       <a href="documents/term-test-timetable.pdf" target="_blank" rel="noopener" download class="btn btn-sm btn-primary">பதிவிறக்கம் (PDF) 📥</a>
     </div>
   </div>
   ```
4. கோப்பைச் சேமிக்கவும்.

---

## 9. பாடசாலை நிறங்களை மாற்றுதல் • Changing School Theme Colours

பாடசாலையின் அனைத்து நிறங்களும் `css/style.css` கோப்பின் ஆரம்பத்தில் ஒரே இடத்தில் வரையறுக்கப்பட்டுள்ளன.

1. `css/style.css` கோப்பைத் திறக்கவும்.
2. ஆரம்பத்தில் உள்ள `:root` பகுதியைக் கவனிக்கவும்:
   ```css
   :root {
     /* பிரதான பாடசாலை மெரூன் நிறம் */
     --school-primary: #7a1643;
     --school-primary-dark: #580c2e;

     /* பாரம்பரிய தங்க மஞ்சள் நிறம் */
     --school-secondary: #e69d00;
     --school-secondary-dark: #c48400;

     /* பின்புல வெளிர் நிறம் */
     --background: #faf7f2;
     --surface: #ffffff;
   }
   ```
3. இந்த நிறக் குறியீடுகளை மாற்றினால், இணையத்தளத்தின் Header, Buttons, Navigation, Footer, Cards அனைத்தும் ஒரே நேரத்தில் அந்தப் புதிய நிறத்திற்கு மாறும்!

---

## 10. இணையத்தளத்தை முன்னோட்டம் பார்த்தல் • Previewing the Website

* **நேரடியாகப் பார்க்க:** எந்தவொரு மென்பொருளும் இன்றி `index.html` கோப்பை இருமுறை கிளிக் (Double Click) செய்தால், Google Chrome, Microsoft Edge, அல்லது Mozilla Firefox உலாவியில் இணையத்தளம் உடனடியாகத் தோன்றும்.
* **அனைத்துப் பக்கங்களையும் சோதிக்கவும்:** முகப்பிலிருந்து About, Academics, News, Gallery, Resources, Contact பக்கங்களை அழுத்தி இணைப்பு சரியாகச் செல்கிறதா எனப் பார்க்கவும்.

---

## 11. இணையத்தில் வெளியிடுதல் • Publishing Updates

இது ஒரு நிலையான (Static) இணையத்தளம் என்பதால், நீங்கள் கணனியில் செய்த திருத்தங்களை இணையத்தில் வெளியிட:
1. பாடசாலையின் இணைய ஹோஸ்டிங் கணக்கில் (cPanel, File Manager, அல்லது FTP/GitHub) நுழையவும்.
2. நீங்கள் மாற்றிய HTML, CSS, JS அல்லது புதிய படங்கள் அடங்கிய கோப்புகளை **public_html** அடைவில் பதிவேற்றவும் (Upload / Replace).
3. உலாவி பக்கத்தை Refresh (`Ctrl + F5`) செய்து மாற்றங்களை உறுதிப்படுத்தவும்.

---

## 12. பொதுவான பிழைகளை சரிசெய்தல் • Troubleshooting

### படம் தெரியவில்லை (Image is not showing / broken icon)?
* கோப்புப் பெயர் சரியாக உள்ளதா எனப் பார்க்கவும். (`school-hero.jpg` மற்றும் `School-Hero.JPG` ஆகியவை வெவ்வேறானவை; சிறிய எழுத்துக்களை மட்டுமே பயன்படுத்தவும்).
* படம் சரியான அடைவில் உள்ளதா எனச் சோதிக்கவும் (`images/` கோப்புறையிலா அல்லது `pages/` கோப்புறையில் உள்ள பக்கங்களுக்கு `../images/` என உள்ளதா என்பதைச் சரிபார்க்கவும்).

### இணைப்பு வேலை செய்யவில்லை (Broken Link)?
* கோப்புப் பெயரையும் அதன் பாதையையும் சரிபார்க்கவும். `about.html`, `pages/history.html` போன்ற பாதைகள் சரியாக எழுதப்பட்டிருக்க வேண்டும்.

---

## 13. ஆசிரியர்கள் திருத்தக்கூடிய கோப்புகள் • Files You Can Safely Edit

| கோப்பு | நோக்கம் | ஆசிரியர்கள் மாற்றலாமா? |
| :--- | :--- | :--- |
| `index.html` | முகப்புப் பக்க தகவல்கள் | ✅ ஆம் |
| `about.html` | பாடசாலை அறிமுகம் | ✅ ஆம் |
| `academics.html` | பாடத்திட்ட விபரங்கள் | ✅ ஆம் |
| `news.html` & `js/news.js` | புதிய செய்திகள் | ✅ ஆம் |
| `events.html` & `js/events.js` | நிகழ்வுகள் நாட்காட்டி | ✅ ஆம் |
| `resources.html` | புதிய PDF இணைப்புகள் | ✅ ஆம் |
| `contact.html` | தொலைபேசி, முகவரி | ✅ ஆம் |
| `css/style.css` | பாடசாலை நிறங்களை மாற்ற | ✅ நிறங்களை மட்டும் மாற்றலாம் |
| `js/main.js` | அனிமேஷன் மற்றும் Lightbox | ⚠️ மாற்றத் தேவையில்லை |

---
**தயாரிப்பு & ஆவணப்படுத்தல்:** கோண்டாவில் இராமகிருஷ்ண மகா வித்தியாலய தகவல் தொழினுட்பப் பிரிவு (ICT Department).
