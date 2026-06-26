import { JacketProduct } from "@/types/jacket";
import { getJacketCatalog } from "./catalog";

export interface StyleCollection {
  slug: string;
  name: string;
  description: string;
  styleFilter: string;
  image: string;
}

const COLLECTION_DEFS: Omit<StyleCollection, "image">[] = [
  {
    slug: "biker",
    name: "Biker Jackets",
    description: "Iconic silhouettes built for the road",
    styleFilter: "Biker Jacket",
  },
  {
    slug: "cafe-racer",
    name: "Cafe Racers",
    description: "Minimalist racing heritage",
    styleFilter: "Cafe Racer",
  },
  {
    slug: "flight",
    name: "Flight Jackets",
    description: "Aviation-inspired luxury outerwear",
    styleFilter: "Flight Jacket",
  },
  {
    slug: "hooded",
    name: "Hooded Leather",
    description: "Urban edge meets premium leather",
    styleFilter: "Hoodie",
  },
  {
    slug: "motorcycle",
    name: "Motorcycle Jackets",
    description: "Engineered for riders and style",
    styleFilter: "Motorcycle Jacket",
  },
  {
    slug: "vintage",
    name: "Vintage Collection",
    description: "Timeless character and heritage",
    styleFilter: "Vintage",
  },
];

const HERO_COLLECTION_SLUGS = ["biker", "cafe-racer", "flight", "vintage"];

function findCollectionImage(jackets: JacketProduct[], styleFilter: string): string {
  const match = jackets.find((j) => {
    if (styleFilter === "Vintage") {
      return (
        j.name.toLowerCase().includes("1930") ||
        j.name.toLowerCase().includes("vintage") ||
        j.style.some((s) => s.toLowerCase().includes("1930"))
      );
    }
    return j.style.includes(styleFilter) || j.jacketType === styleFilter;
  });
  return match?.images[0] ?? jackets.find((j) => j.images.length)?.images[0] ?? "/heromain.png";
}

export function getStyleCollections(): StyleCollection[] {
  const jackets = getJacketCatalog();
  return COLLECTION_DEFS.map((def) => ({
    ...def,
    image: findCollectionImage(jackets, def.styleFilter),
  }));
}

export function getHeroFeaturedCollections(): StyleCollection[] {
  return getStyleCollections().filter((c) => HERO_COLLECTION_SLUGS.includes(c.slug));
}

export function getJacketsByStyle(styleFilter: string): JacketProduct[] {
  const jackets = getJacketCatalog();
  if (styleFilter === "Vintage") {
    return jackets.filter(
      (j) =>
        j.name.toLowerCase().includes("1930") ||
        j.name.toLowerCase().includes("vintage") ||
        j.style.some((s) => s.toLowerCase().includes("1930"))
    );
  }
  return jackets.filter(
    (j) => j.style.includes(styleFilter) || j.jacketType === styleFilter
  );
}

export function getFeaturedJackets(limit = 8): JacketProduct[] {
  return getJacketCatalog().slice(0, limit);
}
