const PDFParser = require("pdf2json");
const fs = require("fs");
const path = require("path");

const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    const text = pdfParser.getRawTextContent();
    console.log("=== PDF TEXT CONTENT ===");
    console.log(text);
    fs.writeFileSync(path.join(__dirname, "pdf-content.txt"), text);
    console.log("\n=== Saved to pdf-content.txt ===");
});

pdfParser.loadPDF(path.join(__dirname, "MedHause_Prestigio_Libertad_Seguridad.pdf"));
