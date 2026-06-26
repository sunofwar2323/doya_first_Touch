import { JacketProduct } from "@/types/jacket";
import { readProductMarkdown } from "./parse-product-md";
import {
  buildImageUrls,
  getImagesInFolder,
  listProductFolders,
  matchFolderToProduct,
} from "./images";
import { deriveSpecifications } from "./specifications";

let cachedCatalog: JacketProduct[] | null = null;

export function getJacketCatalog(): JacketProduct[] {
  if (cachedCatalog) return cachedCatalog;

  const parsed = readProductMarkdown();
  const folders = listProductFolders();
  const usedFolders = new Set<string>();

  cachedCatalog = parsed.map((item) => {
    const availableFolders = folders.filter((f) => !usedFolders.has(f));
    const matchedFolder = matchFolderToProduct(item.name, item.productNumber, availableFolders);
    if (matchedFolder) usedFolders.add(matchedFolder);

    const imageFiles = matchedFolder ? getImagesInFolder(matchedFolder) : [];
    const images = matchedFolder ? buildImageUrls(matchedFolder, imageFiles) : [];

    const meta = deriveSpecifications(item.name, item.description, item.features, item.size);

    const seoTitle = `${item.name}${item.productNumber ? ` #${item.productNumber}` : ""} | Leather Jackets | DOYA FIRST TOUCH`;
    const seoDescription =
      item.description.length > 160
        ? item.description.slice(0, 157) + "..."
        : item.description;

    return {
      productNumber: item.productNumber,
      name: item.name,
      slug: item.slug,
      price: item.price,
      size: item.size,
      description: item.description,
      features: item.features,
      images,
      imageFolder: matchedFolder ?? "",
      specifications: meta.specifications,
      style: meta.style,
      finish: meta.finish,
      material: meta.material,
      colors: meta.colors,
      jacketType: meta.jacketType,
      inStock: true,
      seoTitle,
      seoDescription,
    };
  });

  return cachedCatalog;
}

export function getJacketBySlug(slug: string): JacketProduct | undefined {
  return getJacketCatalog().find((j) => j.slug === slug);
}

export function getAllJacketSlugs(): string[] {
  return getJacketCatalog().map((j) => j.slug);
}

export function getJacketsByStyleFilter(style: string): JacketProduct[] {
  const jackets = getJacketCatalog();
  if (style === "Vintage") {
    return jackets.filter(
      (j) =>
        j.name.toLowerCase().includes("1930") ||
        j.name.toLowerCase().includes("vintage")
    );
  }
  return jackets.filter(
    (j) => j.style.includes(style) || j.jacketType === style
  );
}

export function getRelatedJackets(product: JacketProduct, limit = 4): JacketProduct[] {
  return getJacketCatalog()
    .filter(
      (j) =>
        j.slug !== product.slug &&
        (j.jacketType === product.jacketType ||
          j.style.some((s) => product.style.includes(s)) ||
          j.finish.some((f) => product.finish.includes(f)))
    )
    .slice(0, limit);
}
