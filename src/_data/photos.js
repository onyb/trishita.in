// Gallery contents: drop image files into src/photos/ and they appear on
// /photos/ in filename order. A leading number or date prefix controls
// ordering and is stripped from the caption; dashes become spaces.
// e.g. "01-marigolds-at-dusk.jpg" → caption "marigolds at dusk".
import fs from "node:fs";
import path from "node:path";

const PHOTO_DIR = "src/photos";
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

export default function () {
  let files = [];
  try {
    files = fs.readdirSync(PHOTO_DIR);
  } catch {
    return [];
  }
  return files
    .filter((f) => EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => ({
      url: `/photos/${f}`,
      caption: path
        .basename(f, path.extname(f))
        .replace(/^[\d-]*\d[-_.\s]*/, "")
        .replace(/[-_]+/g, " ")
        .trim(),
    }));
}
