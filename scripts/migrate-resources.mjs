
import fs from 'node:fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('resources.html', 'utf8');
const $ = cheerio.load(html);

const categories = {
    'prizeBook.pdf': 'Publications',
    'five-year-plan.pdf': 'Development Plans',
    'prize day report 2026.pdf': 'Prize Day Reports',
    'schoolPlan2024.pdf': 'Development Plans',
    'prizeReport.pdf': 'Prize Day Reports',
    'schoolHistory.pdf': 'School History',
    'teachers.pdf': 'Staff Directory',
    'activityCommittee.pdf': 'Student Activities',
    'socialAssistant.pdf': 'Student Welfare',
    'schoolNeeds.pdf': 'Infrastructure'
};

const resources = [];

$('#downloads .doc-card').each((index, element) => {

    const card = $(element);

    const title = card.find('.doc-title').text().trim();

    const description = card.find('.doc-meta').text().trim();

    const file = card.find('.doc-btn a').attr('href');

    if (!title || !file) {
        throw new Error(`Invalid document at index ${index}`);
    }

    const localPath = decodeURIComponent(file)
        .replace(/^\/+/, '');

    if (!fs.existsSync(localPath)) {
        throw new Error(`Missing PDF document: ${localPath}`);
    }

    const filename = localPath.split('/').pop();

    resources.push({
        title,
        category: categories[filename] || 'Other',
        description,
        file: '/' + localPath
    });
});

if (resources.length !== 10) {
    throw new Error(
        `Expected 10 documents, found ${resources.length}`
    );
}

const output = 'public/content/resources.json';

if (fs.existsSync(output)) {
    throw new Error(
        'Resources JSON already exists. Migration stopped.'
    );
}

fs.mkdirSync('public/content', { recursive: true });

fs.writeFileSync(
    output,
    JSON.stringify(resources, null, 2) + '\n',
    'utf8'
);

console.log('\nResource migration completed!\n');

resources.forEach(item => {
    console.log(`${item.title}: ${item.category}`);
});

console.log(`\nTotal documents: ${resources.length}`);
