import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";

const source = "assets/ingredient-originals";
const output = "public/images/ingredients";
await mkdir(output, { recursive: true });
for (const file of (await readdir(source)).filter((name) =>
  name.endsWith(".png"),
)) {
  const name = file.replace(".png", "");
  await sharp(`${source}/${file}`)
    .resize(480, 480)
    .png({ compressionLevel: 9 })
    .toFile(`${output}/${file}`);
  for (const width of [160, 320, 480]) {
    const suffix = width === 480 ? "" : `-${width}`;
    await sharp(`${source}/${file}`)
      .resize(width, width)
      .webp({ quality: 78, alphaQuality: 95 })
      .toFile(`${output}/${name}${suffix}.webp`);
  }
}
console.log("Optimized ten transparent ingredients at three delivery sizes.");
