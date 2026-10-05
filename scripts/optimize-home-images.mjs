import sharp from "sharp";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Originals stay untouched: only the homepage consumes these derivatives.
const assets = JSON.parse(await readFile("src/data/home-assets.json", "utf8"));
const output = "public/images/home";
await mkdir(output, { recursive: true });
const manifest = {};
for (const [name, asset] of Object.entries(assets)) {
  const source = path.join("public/images", asset.source);
  const metadata = await sharp(source).metadata();
  const widths = [
    ...new Set(
      (asset.wide ? [640, 960, 1440, 1920] : [400, 800, 1200]).map((w) =>
        Math.min(w, metadata.width),
      ),
    ),
  ];
  const isHero = name.startsWith("hero-");
  const resize = (width) =>
    isHero
      ? {
          width,
          height: Math.round(width / 1.6),
          fit: "cover",
          position: "right",
        }
      : { width };
  for (const width of widths) {
    await sharp(source)
      .rotate()
      .resize(resize(width))
      .webp({ quality: 80, effort: 5 })
      .toFile(`${output}/${name}-${width}.webp`);
    await sharp(source)
      .rotate()
      .resize(resize(width))
      .avif({ quality: 52, effort: 4 })
      .toFile(`${output}/${name}-${width}.avif`);
  }
  const mobileWidths = isHero ? [480, 768] : [];
  const mobileSource = () => {
    const pipeline = sharp(source).rotate();
    if (typeof asset.mobileFocus !== "number") return pipeline;
    const cropWidth = Math.min(metadata.width, Math.round(metadata.height / 1.65));
    return pipeline.extract({
      left: Math.round((metadata.width - cropWidth) * asset.mobileFocus),
      top: 0,
      width: cropWidth,
      height: metadata.height,
    });
  };
  for (const width of mobileWidths) {
    const crop = {
      width,
      height: Math.round(width * 1.65),
      fit: "cover",
      position: "right",
    };
    await mobileSource()
      .resize(crop)
      .webp({ quality: 80, effort: 5 })
      .toFile(`${output}/${name}-mobile-${width}.webp`);
    await mobileSource()
      .resize(crop)
      .avif({ quality: 52, effort: 4 })
      .toFile(`${output}/${name}-mobile-${width}.avif`);
  }
  manifest[name] = {
    width: metadata.width,
    height: metadata.height,
    widths,
    mobileWidths,
  };
}
await sharp("public/images/logo.png")
  .resize({ width: 180 })
  .webp({ quality: 90 })
  .toFile(`${output}/logo.webp`);
await sharp("public/images/Homebanner32.jpeg")
  .resize(1200, 630, { fit: "cover", position: "right" })
  .jpeg({ quality: 85 })
  .toFile(`${output}/social.jpg`);
await writeFile(
  "src/data/home-image-manifest.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `Optimized ${Object.keys(manifest).length} existing images for the homepage.`,
);
