import XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const workbook = XLSX.readFile(join(__dirname, 'Leads MedHause.xlsx'));
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

let output = '';

output += '=== COLUMNS ===\n';
output += JSON.stringify(Object.keys(data[0] || {}), null, 2) + '\n';

output += '\n=== FIRST 30 ROWS ===\n';
data.slice(0, 30).forEach((row, i) => {
    output += `Row ${i + 1}: ${JSON.stringify(row)}\n`;
});

output += '\n=== SPECIALTY ANALYSIS ===\n';
const specialties = {};
data.forEach(row => {
    // Try different column names
    const s = row.specialty || row.Specialty || row.especialidad || row.Especialidad || row.Especiality || 'Unknown';
    specialties[s] = (specialties[s] || 0) + 1;
});
Object.entries(specialties).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
    output += `${k}: ${v}\n`;
});

output += '\n=== INTEREST/BUDGET ANALYSIS ===\n';
const interests = {};
data.forEach(row => {
    const i = row.interest || row.Interest || row.interes || row.Interes || 'Unknown';
    interests[i] = (interests[i] || 0) + 1;
});
Object.entries(interests).sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([k, v]) => {
    output += `${k}: ${v}\n`;
});

output += '\n=== TOTAL LEADS ===\n';
output += data.length + '\n';

writeFileSync(join(__dirname, 'leads-analysis.txt'), output);
console.log('Analysis written to leads-analysis.txt');
