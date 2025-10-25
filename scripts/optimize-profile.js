import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '..', 'public', 'valerio-original.jpg');
const outputPath = join(__dirname, '..', 'public', 'valerio.webp');

async function optimizeImage() {
  try {
    await sharp(inputPath)
      .resize(400, 400, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 85 })
      .toFile(outputPath);

    console.log('✓ Profile image optimized successfully: valerio.webp');
  } catch (error) {
    console.error('Error optimizing image:', error);
    process.exit(1);
  }
}

optimizeImage();
