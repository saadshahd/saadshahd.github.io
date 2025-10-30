#!/usr/bin/env node

/**
 * Image Optimization Script for Photo Gallery
 *
 * Converts high-resolution Canon EOS photos (4-5MB, 5184x3456px) to:
 * - WebP format: 1200px wide, quality 85, ~150KB
 * - JPEG fallback: 1200px wide, quality 85, ~220KB
 *
 * Usage: node scripts/optimize-gallery-images.js
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { basename, join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const INPUT_DIR = join(__dirname, '../tmp-images');
const OUTPUT_DIR = join(__dirname, '../public/images/statsbomb');
const TARGET_WIDTH = 1200;
const QUALITY = 85;

async function optimizeImages() {
  console.log('🖼️  Photo Gallery Image Optimization\n');

  // Ensure output directory exists
  try {
    await mkdir(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Created output directory: ${OUTPUT_DIR}\n`);
  } catch (error) {
    // Directory might already exist, ignore error
  }

  // Read input directory
  let files;
  try {
    files = await readdir(INPUT_DIR);
  } catch (error) {
    console.error(`❌ Error reading input directory: ${error.message}`);
    process.exit(1);
  }

  // Filter for image files (JPG, JPEG, PNG)
  const imageFiles = files.filter(file => {
    const ext = extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.error(`❌ No image files found in ${INPUT_DIR}`);
    process.exit(1);
  }

  console.log(`📁 Found ${imageFiles.length} images to process\n`);

  // Process each image
  for (const file of imageFiles) {
    const inputPath = join(INPUT_DIR, file);
    const fileBasename = basename(file, extname(file));

    console.log(`Processing: ${file}`);

    try {
      // Get original dimensions
      const metadata = await sharp(inputPath).metadata();
      console.log(`  Original: ${metadata.width}x${metadata.height} (${(metadata.size / 1024 / 1024).toFixed(2)}MB)`);

      // Convert to WebP
      const webpPath = join(OUTPUT_DIR, `${fileBasename}.webp`);
      await sharp(inputPath)
        .resize(TARGET_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: QUALITY })
        .toFile(webpPath);

      const webpSize = await sharp(webpPath).metadata();
      console.log(`  → WebP: ${webpSize.width}x${webpSize.height} (${(webpSize.size / 1024).toFixed(0)}KB)`);

      // Create JPEG fallback
      const jpegPath = join(OUTPUT_DIR, `${fileBasename}.jpg`);
      await sharp(inputPath)
        .resize(TARGET_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: QUALITY })
        .toFile(jpegPath);

      const jpegSize = await sharp(jpegPath).metadata();
      console.log(`  → JPEG: ${jpegSize.width}x${jpegSize.height} (${(jpegSize.size / 1024).toFixed(0)}KB)`);

      console.log(`  ✅ Saved to ${OUTPUT_DIR}\n`);

    } catch (error) {
      console.error(`  ❌ Error processing ${file}: ${error.message}\n`);
    }
  }

  console.log('🎉 Image optimization complete!');
  console.log(`\nNext steps:`);
  console.log(`1. Review optimized images in ${OUTPUT_DIR}`);
  console.log(`2. Update src/data/statsbomb-photos.json with filenames and dimensions`);
  console.log(`3. Write captions for each photo (1-2 sentences)\n`);
}

optimizeImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
