import { WHATSAPP_NUMBER } from "@/lib/contact";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatJacketPrice(price: number): string {
  return `Nu. ${price.toLocaleString("en-US")}`;
}

export function getWhatsAppUrl(
  productName: string,
  productNumber: string = "",
  options?: { size?: string; color?: string }
): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? WHATSAPP_NUMBER;
  let text = `Hello, I'm interested in this product: ${productName}. Please share availability, sizes, and price.`;
  if (options?.size) text += ` Selected size: ${options.size}.`;
  if (options?.color) text += ` Color: ${options.color}.`;
  if (productNumber) text += ` (Ref #${productNumber})`;
  const message = encodeURIComponent(text);
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${message}`;
}

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export function isImageFile(filename: string): boolean {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

export function imageSortKey(filename: string): string {
  return filename.toLowerCase();
}

/** Basename without extension, case-insensitive (handles nested paths). */
export function getImageBaseName(filename: string): string {
  const name = filename.split("/").pop() ?? filename;
  const dot = name.lastIndexOf(".");
  return (dot === -1 ? name : name.slice(0, dot)).toLowerCase();
}

/** True when the file is the designated main/front image (M or M*). */
export function isMainProductImage(filename: string): boolean {
  const base = getImageBaseName(filename);
  return base === "m" || base.startsWith("m");
}

function compareGalleryImages(a: string, b: string): number {
  return imageSortKey(a).localeCompare(imageSortKey(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

/**
 * Orders product images: main image (M) first, then secondary gallery images.
 * Falls back to the first sorted image when no M image exists.
 */
export function orderProductImages(images: string[]): string[] {
  if (images.length === 0) return [];

  const mainCandidates = images.filter(isMainProductImage);
  const galleryImages = images.filter((image) => !isMainProductImage(image));
  galleryImages.sort(compareGalleryImages);

  if (mainCandidates.length === 0) {
    return [...images].sort(compareGalleryImages);
  }

  mainCandidates.sort((a, b) => {
    const aExact = getImageBaseName(a) === "m" ? 0 : 1;
    const bExact = getImageBaseName(b) === "m" ? 0 : 1;
    if (aExact !== bExact) return aExact - bExact;
    return compareGalleryImages(a, b);
  });

  return [mainCandidates[0], ...galleryImages];
}

export function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] =
        b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]) + 1;
    }
  }
  return matrix[b.length][a.length];
}

export function fuzzyIncludes(text: string, query: string): boolean {
  const t = normalizeForMatch(text);
  const q = normalizeForMatch(query);
  if (!q) return true;
  if (t.includes(q)) return true;

  let ti = 0;
  for (const char of q.replace(/\s/g, "")) {
    const idx = t.indexOf(char, ti);
    if (idx === -1) return false;
    ti = idx + 1;
  }

  const words = q.split(" ").filter(Boolean);
  const matchedWords = words.filter((w) => {
    if (t.includes(w)) return true;
    return t.split(" ").some((tw) => levenshtein(tw, w) <= Math.max(1, Math.floor(w.length / 4)));
  });
  return matchedWords.length >= Math.ceil(words.length * 0.6);
}

export function folderMatchScore(folderName: string, productName: string, productNumber: string): number {
  const folderNorm = normalizeForMatch(folderName);
  const nameNorm = normalizeForMatch(productName);
  const numberedName = productNumber ? `${productNumber} ${nameNorm}` : nameNorm;

  if (folderNorm === nameNorm || folderNorm === numberedName) return 100;
  if (folderNorm.endsWith(nameNorm) || folderNorm.includes(nameNorm)) return 90;
  if (productNumber && folderNorm.startsWith(`${productNumber} `)) return 85;

  const folderWords = folderNorm.split(" ");
  const nameWords = nameNorm.split(" ");
  const overlap = nameWords.filter((w) => folderWords.includes(w)).length;
  const overlapScore = (overlap / nameWords.length) * 80;

  const dist = levenshtein(folderNorm, numberedName);
  const distScore = Math.max(0, 70 - dist);

  return Math.max(overlapScore, distScore);
}
