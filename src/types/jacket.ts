export interface JacketSpecifications {
  material: string;
  leatherType: string;
  finishType: string;
  zipperType: string;
  collarStyle: string;
  pocketConfiguration: string;
  specialFeatures: string;
  size: string;
}

export interface JacketProduct {
  productNumber: string;
  name: string;
  slug: string;
  price: number;
  size: string;
  description: string;
  features: string[];
  images: string[];
  imageFolder: string;
  specifications: JacketSpecifications;
  style: string[];
  finish: string[];
  material: string[];
  colors: string[];
  jacketType: string;
  inStock: boolean;
  seoTitle: string;
  seoDescription: string;
}

export type PriceRangeFilter = "below-7000" | "7000-8000" | "above-8000";

export interface JacketFilters {
  sizes: string[];
  priceRanges: PriceRangeFilter[];
  styles: string[];
  finishes: string[];
  materials: string[];
}

export const JACKET_SIZES = ["42", "44", "46", "48", "50", "XL"] as const;

export const JACKET_STYLES = [
  "Biker Jacket",
  "Cafe Racer",
  "Flight Jacket",
  "Safari Jacket",
  "Hoodie",
  "Trucker Jacket",
  "Motorcycle Jacket",
  "Puffer Jacket",
] as const;

export const JACKET_FINISHES = [
  "Matte",
  "Semi-Aniline",
  "Aniline",
  "Waxed",
  "Glossy",
  "Satin",
  "Full Grain",
  "Pigmented",
] as const;

export const JACKET_MATERIALS = [
  "Genuine Leather",
  "Lambskin Leather",
  "Full Grain Leather",
] as const;

export const PRICE_RANGE_OPTIONS: {
  value: PriceRangeFilter;
  label: string;
}[] = [
  { value: "below-7000", label: "Below Nu. 7,000" },
  { value: "7000-8000", label: "Nu. 7,000 – Nu. 8,000" },
  { value: "above-8000", label: "Above Nu. 8,000" },
];
