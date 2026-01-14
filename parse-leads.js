const XLSX = require('xlsx');
const workbook = XLSX.readFile('./Leads MedHause.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

console.log('=== COLUMNS ===');
console.log(Object.keys(data[0] || {}));

console.log('\n=== FIRST 10 ROWS ===');
data.slice(0, 10).forEach((row, i) => {
    console.log(`Row ${i + 1}:`, JSON.stringify(row));
});

console.log('\n=== SPECIALTY COUNTS ===');
const specialties = {};
data.forEach(row => {
    const s = row.specialty || row.Specialty || row.especialidad || row.Especialidad || 'Unknown';
    specialties[s] = (specialties[s] || 0) + 1;
});
Object.entries(specialties).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
    console.log(`${k}: ${v}`);
});

console.log('\n=== TOTAL LEADS ===');
console.log(data.length);
