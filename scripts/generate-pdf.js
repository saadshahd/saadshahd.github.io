import { chromium } from 'playwright';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePDF() {
  console.log('🚀 Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('📄 Loading resume page...');
  await page.goto('http://localhost:4321/resume', {
    waitUntil: 'networkidle',
  });

  console.log('📝 Generating PDF...');
  const pdfPath = join(__dirname, '..', 'public', 'resume.pdf');

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in',
    },
    printBackground: true,
  });

  console.log(`✅ PDF generated at: ${pdfPath}`);
  await browser.close();
}

generatePDF().catch((error) => {
  console.error('❌ Error generating PDF:', error);
  process.exit(1);
});
