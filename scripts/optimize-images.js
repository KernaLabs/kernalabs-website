const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// Configuration with comprehensive sizes for modern displays
const config = {
  publicDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../public/images'),
  formats: ['webp', 'avif'], // Next-gen formats to generate
  // Sizes are scoped to how each asset is actually displayed on the page.
  // Team avatars render at ~80px, logos at ~100-200px, so we don't generate
  // multi-thousand-pixel variants that would never be requested but still bloat
  // the repo and (via the manifest) the candidate srcset.
  sizes: {
    // Team photos - rendered as ~80px avatars (400/800 covers 2x-3x retina)
    team: [400, 800],

    // Institution/partner logos - rendered at ~100-200px
    logos: [200, 400],

    // Hero/background images
    backgrounds: [1280, 1920],

    // Media/press logos
    media: [200, 400],

    // Default sizes for other images
    default: [320, 640, 1280]
  },

  // Lossy settings tuned for web delivery. At these levels the visual
  // difference is imperceptible for photos/logos but file sizes drop ~10-20x
  // versus the previous lossless/quality-100 settings.
  quality: {
    jpeg: 78,
    webp: 75,
    avif: 50,  // AVIF's quality scale runs lower than JPEG/WebP for similar fidelity
    png: 9     // PNG compressionLevel (0-9); only used for the original-format fallback variant
  }
};

// Helper to get size category from path
function getSizeCategory(filePath) {
  if (filePath.includes('/team/')) return 'team';
  if (filePath.includes('/logos/media/')) return 'media';
  if (filePath.includes('/logos/')) return 'logos';
  if (filePath.includes('/backgrounds/')) return 'backgrounds';
  return 'default';
}

// Process a single image
async function processImage(inputPath) {
  const relativePath = path.relative(config.publicDir, inputPath);
  const ext = path.extname(inputPath).toLowerCase();
  const baseName = path.basename(inputPath, ext);
  const dirName = path.dirname(inputPath);
  
  console.log(`Processing: ${relativePath}`);
  
  // Skip if not an image we want to process
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    console.log(`  Skipping (unsupported format)`);
    return;
  }
  
  // Skip if it's already an optimized version
  if (baseName.includes('-') && baseName.match(/-\d+w$/)) {
    console.log(`  Skipping (already optimized)`);
    return;
  }
  
  // Skip placeholder images
  if (baseName.includes('-placeholder')) {
    console.log(`  Skipping (placeholder)`);
    return;
  }
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const category = getSizeCategory(inputPath);
    const sizes = config.sizes[category];
    
    console.log(`  Category: ${category}, Original size: ${metadata.width}x${metadata.height}`);
    
    // Generate different sizes
    for (const width of sizes) {
      // Skip if the image is smaller than the target width
      if (metadata.width < width) continue;
      
      // Generate original format at different sizes
      const outputName = `${baseName}-${width}w${ext}`;
      const outputPath = path.join(dirName, outputName);
      
      // Skip if file already exists
      if (fs.existsSync(outputPath)) {
        console.log(`  → Skipping ${outputName} (already exists)`);
        continue;
      }
      
      // Configure sharp based on format
      let sharpInstance = image
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });
      
      // Apply format-specific settings
      if (ext === '.jpg' || ext === '.jpeg') {
        sharpInstance = sharpInstance.jpeg({
          quality: config.quality.jpeg,
          mozjpeg: true // Use mozjpeg encoder for better quality
        });
      } else if (ext === '.png') {
        sharpInstance = sharpInstance.png({
          compressionLevel: config.quality.png,
          palette: true // Quantize to a palette where possible for smaller files
        });
      }
      
      await sharpInstance.toFile(outputPath);
      console.log(`  ✓ Created: ${outputName}`);
      
      // Generate next-gen formats
      for (const format of config.formats) {
        const formatOutputName = `${baseName}-${width}w.${format}`;
        const formatOutputPath = path.join(dirName, formatOutputName);
        
        // Skip if file already exists
        if (fs.existsSync(formatOutputPath)) {
          console.log(`  → Skipping ${formatOutputName} (already exists)`);
          continue;
        }
        
        let formatInstance = image
          .resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          });
        
        if (format === 'webp') {
          formatInstance = formatInstance.webp({
            quality: config.quality.webp,
            effort: 5 // Good compression without the runtime cost of effort 6
          });
        } else if (format === 'avif') {
          formatInstance = formatInstance.avif({
            quality: config.quality.avif,
            effort: 4 // effort 9 was ~5x slower for negligible additional savings
          });
        }
        
        await formatInstance.toFile(formatOutputPath);
        console.log(`  ✓ Created: ${formatOutputName}`);
      }
    }
    
    // Generate placeholder (tiny, blurred version for lazy loading)
    const placeholderName = `${baseName}-placeholder.jpg`;
    const placeholderPath = path.join(dirName, placeholderName);
    
    // Only create placeholder if it doesn't exist
    if (!fs.existsSync(placeholderPath)) {
      await image
        .resize(20, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .blur(5)
        .jpeg({ quality: 50 })
        .toFile(placeholderPath);
        
      console.log(`  ✓ Created: ${placeholderName} (placeholder)`);
    }
    
  } catch (error) {
    console.error(`  ✗ Error processing ${inputPath}:`, error.message);
  }
}

// Generate manifest of all available images
async function generateManifest() {
  console.log('\nGenerating image manifest...');
  
  const manifest = {};
  const pattern = path.join(config.publicDir, '**/*.{jpg,jpeg,png,webp,avif}');
  const allImages = glob.sync(pattern);
  
  // Group images by base name
  for (const imagePath of allImages) {
    const relativePath = path.relative(config.publicDir, imagePath);
    const dirName = path.dirname(relativePath);
    const fileName = path.basename(imagePath);
    const ext = path.extname(fileName);
    const baseName = fileName.replace(/-\d+w\.(jpg|jpeg|png|webp|avif)$/, '').replace(/-placeholder\.jpg$/, '').replace(ext, '');
    
    // Determine the original extension - for optimized files, we need to find the original format
    let originalExt = ext;
    if (ext === '.webp' || ext === '.avif') {
      // For next-gen formats, try to find the original image to determine its extension
      const possibleExts = ['.png', '.jpg', '.jpeg'];
      for (const testExt of possibleExts) {
        const testPath = path.join(config.publicDir, dirName, baseName + testExt);
        if (fs.existsSync(testPath)) {
          originalExt = testExt;
          break;
        }
      }
    }
    
    const key = path.join(dirName, baseName + originalExt);
    
    if (!manifest[key]) {
      manifest[key] = {
        original: key,
        variants: [],
        placeholder: null
      };
    }
    
    if (fileName.includes('-placeholder')) {
      manifest[key].placeholder = relativePath;
    } else if (fileName.includes('-') && fileName.match(/-\d+w/)) {
      manifest[key].variants.push(relativePath);
    }
  }
  
  // Write manifest
  const manifestPath = path.join(__dirname, '../src/config/imageManifest.json');
  await fs.ensureDir(path.dirname(manifestPath));
  await fs.writeJSON(manifestPath, manifest, { spaces: 2 });
  
  console.log(`✓ Manifest generated with ${Object.keys(manifest).length} images`);
}

// Main optimization function
async function optimizeImages() {
  console.log('Starting image optimization with maximum quality...\n');
  
  // Find all images in public/images
  const pattern = path.join(config.publicDir, '**/*.{jpg,jpeg,png,JPG,JPEG,PNG}');
  const images = glob.sync(pattern);
  
  // Filter out already optimized images
  const imagesToProcess = images.filter(img => {
    const baseName = path.basename(img, path.extname(img));
    return !baseName.includes('-') || !baseName.match(/-\d+w$/);
  });
  
  console.log(`Found ${imagesToProcess.length} images to process\n`);
  
  // Process images in parallel (but not too many at once)
  const batchSize = 3; // Reduced for larger images
  for (let i = 0; i < imagesToProcess.length; i += batchSize) {
    const batch = imagesToProcess.slice(i, i + batchSize);
    await Promise.all(batch.map(processImage));
  }
  
  console.log('\n✓ Optimization complete!');
  
  // Generate manifest
  await generateManifest();
  
  // Generate size report
  const optimizedPattern = path.join(config.publicDir, '**/*.{webp,avif}');
  const optimizedImages = glob.sync(optimizedPattern);
  console.log(`\n✓ Generated ${optimizedImages.length} optimized images`);
}

// Run if called directly
if (require.main === module) {
  optimizeImages().catch(console.error);
}

module.exports = { optimizeImages, processImage };