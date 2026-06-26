import fs from "fs";
import path from "path";
import { folderMatchScore, isImageFile, orderProductImages } from "./utils";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

export function getProductRootDir(): string {
  const candidates = [
    path.join(process.cwd(), "product"),
    path.join(process.cwd(), "Products"),
    path.join(process.cwd(), "public", "product"),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
      return dir;
    }
  }
  return candidates[0];
}

export function listProductFolders(): string[] {
  const root = getProductRootDir();
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("."))
    .map((d) => d.name);
}

export function getImagesInFolder(folderName: string): string[] {
  const folderPath = path.join(getProductRootDir(), folderName);
  if (!fs.existsSync(folderPath)) return [];

  const images: string[] = [];
  const walk = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (isImageFile(entry.name)) {
        const relative = path.relative(path.join(getProductRootDir(), folderName), fullPath);
        images.push(relative.split(path.sep).join("/"));
      }
    }
  };
  walk(folderPath);

  return orderProductImages(images);
}

export function matchFolderToProduct(
  productName: string,
  productNumber: string,
  folders: string[]
): string | null {
  let bestFolder: string | null = null;
  let bestScore = 0;

  for (const folder of folders) {
    const score = folderMatchScore(folder, productName, productNumber);
    if (score > bestScore && score >= 50) {
      bestScore = score;
      bestFolder = folder;
    }
  }

  return bestFolder;
}

export function buildImageUrls(folderName: string, filenames: string[]): string[] {
  return filenames.map((file) => {
    const segments = [folderName, ...file.split("/")].map((s) => encodeURIComponent(s));
    return `/product/${segments.join("/")}`;
  });
}

export function getMimeType(filename: string): string {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  };
  return map[ext] ?? "application/octet-stream";
}

export { IMAGE_EXTENSIONS };
