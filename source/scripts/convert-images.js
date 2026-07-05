const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Helper to ensure target directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Recursive function to crawl and convert assets
async function convertFolder(srcDir, destDir) {
  ensureDir(destDir);
  const files = fs.readdirSync(srcDir);
  
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      await convertFolder(srcPath, path.join(destDir, file));
      continue;
    }
    
    const ext = path.extname(file).toLowerCase();
    const name = path.basename(file, ext);
    
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const destPath = path.join(destDir, `${name}.webp`);
      console.log(`Converting: ${srcPath.replace(path.join(__dirname, '..'), '')} -> ${destPath.replace(path.join(__dirname, '..'), '')}`);
      try {
        await sharp(srcPath)
          .webp({ quality: 80 })
          .toFile(destPath);
      } catch (err) {
        console.error(`Error converting ${srcPath}:`, err);
      }
    } else if (ext === '.svg') {
      const destPath = path.join(destDir, file);
      console.log(`Copying SVG: ${srcPath.replace(path.join(__dirname, '..'), '')} -> ${destPath.replace(path.join(__dirname, '..'), '')}`);
      try {
        fs.copyFileSync(srcPath, destPath);
      } catch (err) {
        console.error(`Error copying SVG ${srcPath}:`, err);
      }
    }
  }
}

async function main() {
  const rootSrc = path.join(__dirname, '../assets/img');
  const rootDest = path.join(__dirname, '../public/images');
  
  console.log('Starting image conversion pipeline...');
  await convertFolder(rootSrc, rootDest);
  console.log('Image conversion completed successfully!');
}

main().catch(console.error);
