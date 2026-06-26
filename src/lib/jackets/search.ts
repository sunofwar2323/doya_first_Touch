import { JacketFilters, JacketProduct, PriceRangeFilter } from "@/types/jacket";
import { fuzzyIncludes } from "./utils";

function matchesPriceRange(price: number, range: PriceRangeFilter): boolean {
  switch (range) {
    case "below-7000":
      return price < 7000;
    case "7000-8000":
      return price >= 7000 && price <= 8000;
    case "above-8000":
      return price > 8000;
  }
}

export function buildSearchIndex(product: JacketProduct): string {
  return [
    product.productNumber,
    product.name,
    product.jacketType,
    product.specifications.leatherType,
    product.size,
    product.colors.join(" "),
    product.specifications.finishType,
    product.description,
    product.features.join(" "),
    product.style.join(" "),
  ].join(" ");
}

export function searchJackets(products: JacketProduct[], query: string): JacketProduct[] {
  if (!query.trim()) return products;
  return products.filter((p) => fuzzyIncludes(buildSearchIndex(p), query));
}

export function filterJackets(
  products: JacketProduct[],
  filters: JacketFilters
): JacketProduct[] {
  return products.filter((p) => {
    if (filters.sizes.length > 0 && !filters.sizes.includes(p.size)) return false;
    if (
      filters.priceRanges.length > 0 &&
      !filters.priceRanges.some((r) => matchesPriceRange(p.price, r))
    )
      return false;
    if (filters.styles.length > 0 && !filters.styles.some((s) => {
      if (s === "Vintage") {
        return (
          p.name.toLowerCase().includes("1930") ||
          p.name.toLowerCase().includes("vintage")
        );
      }
      return p.style.includes(s);
    }))
      return false;
    if (filters.finishes.length > 0 && !filters.finishes.some((f) => p.finish.includes(f)))
      return false;
    if (
      filters.materials.length > 0 &&
      !filters.materials.some((m) => p.material.includes(m))
    )
      return false;
    return true;
  });
}
