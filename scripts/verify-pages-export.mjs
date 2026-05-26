import { access, readFile } from "node:fs/promises";
import path from "node:path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const outDir = path.join(process.cwd(), "out");

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

const indexPath = path.join(outDir, "index.html");
const builderPath = (await exists(path.join(outDir, "builder", "index.html")))
  ? path.join(outDir, "builder", "index.html")
  : path.join(outDir, "builder.html");
const bouquetPath = (await exists(path.join(outDir, "bouquet", "index.html")))
  ? path.join(outDir, "bouquet", "index.html")
  : path.join(outDir, "bouquet.html");

for (const file of [indexPath, builderPath, bouquetPath]) {
  await access(file);
}

await access(path.join(outDir, "_next"));
if (!(await exists(path.join(outDir, ".nojekyll")))) {
  throw new Error("Missing out/.nojekyll (required for _next on GitHub Pages)");
}

const index = await readFile(indexPath, "utf8");
if (basePath && !index.includes(basePath)) {
  throw new Error(`index.html missing basePath prefix: ${basePath}`);
}

console.log(`Pages export verified (${basePath || "root"})`);
