"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const giftFilter = searchParams.get("gift");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (giftFilter) {
      result = result.filter((p) => p.isGift);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [search, selectedCategory, sortBy, giftFilter]);

  return (
    <div className="pt-24">
      <div className="bg-ivory py-16 mb-12">
        <div className="container-luxury px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">
              Our Collection
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-[#111111]">
              Shop All Products
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="container-luxury px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 text-sm tracking-wider uppercase border border-border px-4 py-3"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-border px-4 py-3 text-sm bg-white focus:outline-none focus:border-gold"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="flex gap-12">
          <aside
            className={cn(
              "w-64 shrink-0 space-y-6",
              showFilters ? "block" : "hidden lg:block"
            )}
          >
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase mb-4">Collection</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/collections/jackets"
                    className="text-sm transition-colors w-full text-left py-1 block text-gold font-medium hover:text-gold/80"
                  >
                    Leather Jackets
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          <div className="flex-1">
            <p className="text-muted text-sm mb-8">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-serif text-2xl text-muted mb-4">No products found</p>
                <p className="text-sm text-muted">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShopPageClient() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
