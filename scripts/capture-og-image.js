import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function captureOGImage() {
  console.log('🚀 Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 }
  });

  const htmlPath = join(__dirname, 'generate-og-image.html');
  const outputPath = join(__dirname, '..', 'public', 'og-image.png');

  console.log(`📄 Loading HTML from: ${htmlPath}`);
  await page.goto(`file://${htmlPath}`);

  // Wait for fonts to load
  console.log('⏳ Waiting for fonts to load...');
  await page.waitForTimeout(2000);

  // Find the og-image div and screenshot it
  console.log('📸 Capturing screenshot...');
  const element = await page.locator('#og-image');
  await element.screenshot({
    path: outputPath,
    type: 'png'
  });

  console.log(`✅ OG image saved to: ${outputPath}`);
  await browser.close();
}

captureOGImage().catch(console.error);
