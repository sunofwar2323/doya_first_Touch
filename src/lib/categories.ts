import { Category } from "@/types";
import { getJacketCatalog } from "@/lib/jackets/catalog";

export function getJacketsCategory(): Category {
  const jackets = getJacketCatalog();
  const heroImage =
    jackets.find((j) => j.images.length > 0)?.images[0] ??
    "/hero.png";

  return {
    slug: "jackets",
    name: "Leather Jackets",
    description:
      "Premium handcrafted leather outerwear — biker, flight, cafe racer and more",
    image: heroImage,
  };
}

export function getAllCategories(): Category[] {
  return [getJacketsCategory()];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  if (slug !== "jackets") return undefined;
  return getJacketsCategory();
}
