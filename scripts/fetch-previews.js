import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LINKS_FILE = path.join(__dirname, '../src/data/links.json');
const PREVIEWS_DIR = path.join(__dirname, '../public/previews');

// Ensure previews directory exists
if (!fs.existsSync(PREVIEWS_DIR)) {
  fs.mkdirSync(PREVIEWS_DIR, { recursive: true });
}

async function fetchAndOptimizeImage(url, outputPath) {
  try {
    console.log(`Fetching screenshot for: ${url}`);

    // Use Microlink API to get screenshot
    const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1200&viewport.height=630`;

    const response = await fetch(screenshotUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch screenshot: ${response.statusText}`);
    }

    const buffer = await response.buffer();

    // Optimize and convert to WebP
    await sharp(buffer)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'top'
      })
      .webp({ quality: 80 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`✓ Saved optimized image: ${path.basename(outputPath)} (${sizeMB} MB)`);

  } catch (error) {
    console.error(`✗ Error processing ${url}:`, error.message);
  }
}

async function fetchAllPreviews() {
  console.log('Starting to fetch and optimize preview images...\n');

  // Read links configuration
  const linksData = JSON.parse(fs.readFileSync(LINKS_FILE, 'utf-8'));

  // Process each link
  for (const link of linksData) {
    if (link.url) {
      // Generate filename from URL
      const hostname = new URL(link.url).hostname.replace(/^www\./, '');
      const filename = `${hostname.replace(/\./g, '-')}.webp`;
      const outputPath = path.join(PREVIEWS_DIR, filename);

      await fetchAndOptimizeImage(link.url, outputPath);
    }
  }

  console.log('\n✓ All preview images fetched and optimized!');
}

fetchAllPreviews().catch(console.error);
