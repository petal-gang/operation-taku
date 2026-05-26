/**
 * Generates portrait stem PNGs, bloom PNGs, greenery PNGs, and triangular wrap PNGs.
 * Replace with PNGTree downloads per README when available.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

const FLOWER_IDS = [
  "rose_red",
  "rose_white",
  "tulip",
  "sunflower",
  "lily",
  "lavender",
  "baby_breath",
  "peony",
];

const GREENERY_IDS = [
  "eucalyptus_round",
  "fern_frond",
  "lily_leaf",
  "vine_curl",
  "sage_leaf",
  "olive_branch",
];

const WRAP_TRIANGLE = [
  { id: "pink", file: "triangle_pink" },
  { id: "beige", file: "triangle_beige" },
  { id: "blush", file: "triangle_blush" },
  { id: "sage", file: "triangle_sage" },
];

const STEM_W = 320;
const STEM_H = 520;
const BLOOM_W = 280;
const BLOOM_H = 220;
const LEAF_W = 200;
const LEAF_H = 280;
const WRAP_W = 240;
const WRAP_H = 340;

async function svgToPngBuffer(svgPath, width, height, topBias = 0.12) {
  const svg = fs.readFileSync(svgPath);
  const bloomH = Math.round(height * (1 - topBias - 0.08));
  const resized = await sharp(svg)
    .resize(width, bloomH, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const stemTop = bloomH + 8;
  const stemSvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="transparent"/>
      <line x1="${width / 2}" y1="${stemTop}" x2="${width / 2}" y2="${height - 12}"
        stroke="#3d6b3d" stroke-width="5" stroke-linecap="round"/>
      <line x1="${width / 2}" y1="${height - 12}" x2="${width / 2 - 14}" y2="${height - 4}"
        stroke="#3d6b3d" stroke-width="3" stroke-linecap="round"/>
      <line x1="${width / 2}" y1="${height - 12}" x2="${width / 2 + 14}" y2="${height - 4}"
        stroke="#3d6b3d" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  );

  const stemLayer = await sharp(stemSvg).png().toBuffer();

  return sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: stemLayer, top: 0, left: 0 },
      { input: resized, top: Math.round(height * topBias), left: 0 },
    ])
    .png()
    .toBuffer();
}

async function bloomFromStem(stemPath, outPath) {
  const meta = await sharp(stemPath).metadata();
  const w = meta.width ?? STEM_W;
  const h = meta.height ?? STEM_H;
  const cropH = Math.min(Math.round(h * 0.42), h - 1);

  await sharp(stemPath)
    .extract({ left: 0, top: 0, width: w, height: cropH })
    .resize(BLOOM_W, BLOOM_H, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(outPath);
}

async function greeneryToPng(svgPath, width, height) {
  const svg = fs.readFileSync(svgPath);
  return sharp(svg)
    .resize(width, height, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

async function wrapToPng(svgPath, outPath) {
  const svg = fs.readFileSync(svgPath);
  await sharp(svg)
    .resize(WRAP_W, WRAP_H, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(outPath);
}

async function main() {
  const stemsDir = path.join(publicDir, "flowers", "stems");
  const bloomsDir = path.join(publicDir, "flowers", "blooms");
  const leavesDir = path.join(publicDir, "greenery", "pngtree");
  const wrapsDir = path.join(publicDir, "wraps");
  fs.mkdirSync(stemsDir, { recursive: true });
  fs.mkdirSync(bloomsDir, { recursive: true });
  fs.mkdirSync(leavesDir, { recursive: true });

  for (const id of FLOWER_IDS) {
    const svgPath = path.join(publicDir, "flowers", `${id}.svg`);
    const stemPath = path.join(stemsDir, `${id}.png`);
    const bloomPath = path.join(bloomsDir, `${id}.png`);
    const buf = await svgToPngBuffer(svgPath, STEM_W, STEM_H);
    await sharp(buf).toFile(stemPath);
    console.log("stem:", stemPath);
    await bloomFromStem(stemPath, bloomPath);
    console.log("bloom:", bloomPath);
  }

  for (const id of GREENERY_IDS) {
    const svgPath = path.join(publicDir, "greenery", `${id}.svg`);
    const outPath = path.join(leavesDir, `${id}.png`);
    const buf = await greeneryToPng(svgPath, LEAF_W, LEAF_H);
    await sharp(buf).toFile(outPath);
    console.log("leaf:", outPath);
  }

  for (const { file } of WRAP_TRIANGLE) {
    const svgPath = path.join(wrapsDir, `${file}.svg`);
    const outPath = path.join(wrapsDir, `${file}.png`);
    await wrapToPng(svgPath, outPath);
    console.log("wrap:", outPath);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
