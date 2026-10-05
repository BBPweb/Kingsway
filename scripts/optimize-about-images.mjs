import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const folder = 'public/images/about';
await mkdir(folder, { recursive: true });
const source = 'public/images/Aboutbannernew.jpeg';
const metadata = await sharp(source).metadata();
for (const width of [960, 1440, 1980]) {
  const destination = width === 1980
    ? 'public/images/aboutbannernew.webp'
    : `${folder}/aboutbannernew-${width}.webp`;
  await sharp(source).resize({ width }).webp({ quality: 84, effort: 5 }).toFile(destination);
}
await sharp(source).resize({ width: 1200, height: 630, fit: 'cover', position: 'right' }).jpeg({ quality: 86 }).toFile(`${folder}/social.jpg`);
console.log(`About hero: ${metadata.width} x ${metadata.height}; generated responsive family WebP and social image.`);
