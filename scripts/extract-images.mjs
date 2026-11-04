// Extracts the 2TG Business Services image URLs from the supplied gallery HTML.
// Usage: node scripts/extract-images.mjs "<path to gallery html>"
import { readFileSync, writeFileSync } from "node:fs";

const src = process.argv[2];
if (!src) throw new Error("Pass the gallery HTML path");
const html = readFileSync(src, "utf8");
const start = html.indexOf("<h2>2TG Business Services");
const end = html.indexOf("<h2>", start + 10);
const section = html.slice(start, end === -1 ? undefined : end);
const urls = [...new Set([...section.matchAll(/<a href="([^"]+)"/g)].map((m) => m[1]))];
// Source notes say the set is mostly stock photos, so every image is flagged illustrative.
const images = urls.map((url, i) => ({ id: i + 1, url, kind: "stock-illustrative" }));
writeFileSync(new URL("../src/data/images.json", import.meta.url), JSON.stringify(images, null, 2));
console.log(`Extracted ${images.length} images`);
