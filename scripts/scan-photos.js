import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const photosDir = path.resolve(__dirname, '../public/photos');
const manifestPath = path.resolve(__dirname, '../public/photos/manifest.json');

if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir, { recursive: true });
}

const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

const files = fs.readdirSync(photosDir).filter(f => {
  const ext = path.extname(f).toLowerCase();
  return supportedExtensions.includes(ext) && !f.startsWith('.');
});

const manifest = {
  scannedAt: new Date().toISOString(),
  count: files.length,
  photos: files.map((filename, index) => {
    const cleanName = path.basename(filename, path.extname(filename))
      .replace(/[-_]+/g, ' ')
      .trim();

    return {
      id: `photo-${index + 1}`,
      url: `/photos/${filename}`,
      filename: filename,
      caption: cleanName || `Our Beautiful Memory ${index + 1}`,
      isHero: index === 0,
      aspectRatio: 'standard'
    };
  })
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
console.log(`[Photo Scanner] Scanned ${files.length} photos into ${manifestPath}`);
