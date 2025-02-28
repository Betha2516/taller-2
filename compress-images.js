// compress-images.js
const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const ASSETS_PATH = path.join(__dirname, 'dist', 'assets', 'images');
const TEMP_EXTENSION = '.tmp'; // Extensión para archivos temporales

const COMPRESSION_OPTIONS = {
  jpeg: { quality: 80 },
  png: { quality: 80 },
  webp: { quality: 80 },
  avif: { quality: 70 },
};

async function compressImages() {
  try {
    const files = await fs.readdir(ASSETS_PATH);
    
    for (const file of files) {
      const filePath = path.join(ASSETS_PATH, file);
      const tempFilePath = `${filePath}${TEMP_EXTENSION}`;
      const ext = path.extname(file).toLowerCase();

      if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

      try {
        console.log(`Comprimiendo: ${file}`);
        
        // 1. Comprimir a archivo temporal
        await sharp(filePath)
          .toFormat(ext.replace('.', ''), COMPRESSION_OPTIONS[ext.replace('.', '')] || {})
          .toFile(tempFilePath);

        // 2. Reemplazar original con el temporal
        await fs.rm(filePath);
        await fs.rename(tempFilePath, filePath);

      } catch (error) {
        console.error(`❌ Error con ${file}:`, error.message);
        // Limpiar archivo temporal si existe
        if (await fs.access(tempFilePath).then(() => true).catch(() => false)) {
          await fs.rm(tempFilePath);
        }
      }
    }

    console.log('✅ Proceso completado!');
  } catch (error) {
    console.error('❌ Error general:', error);
  }
}

compressImages();