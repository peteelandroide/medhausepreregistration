import pdf from 'pdf-parse/lib/pdf-parse.js';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataBuffer = readFileSync(join(__dirname, 'MedHause_Prestigio_Libertad_Seguridad.pdf'));

pdf(dataBuffer).then(function (data) {
    console.log('=== PDF TEXT CONTENT ===');
    console.log(data.text);
    writeFileSync(join(__dirname, 'pdf-content.txt'), data.text);
    console.log('\n=== Saved to pdf-content.txt ===');
});
