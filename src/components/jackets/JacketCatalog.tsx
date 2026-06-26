"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { JacketProduct, JacketFilters } from "@/types/jacket";
import { searchJackets, filterJackets } from "@/lib/jackets/search";
import { JacketCard } from "@/components/jackets/JacketCard";
import { JacketFiltersPanel } from "@/components/jackets/JacketFilters";

interface JacketCatalogProps {
  jackets: JacketProduct[];
}

const emptyFilters: JacketFilters = {
  sizes: [],
  priceRanges: [],
  styles: [],
  finishes: [],
  materials: [],
};

function JacketCatalogContent({ jackets }: JacketCatalogProps) {
  const searchParams = useSearchParams();
  const styleParam = searchParams.get("style");

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<JacketFilters>(emptyFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (styleParam) {
      setFilters((prev) => ({
        ...prev,
        styles: [styleParam],
      }));
    }
  }, [styleParam]);

  const filtered = useMemo(() => {
    const searched = searchJackets(jackets, search);
    return filterJackets(searched, filters);
  }, [jackets, search, filters]);

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
      <JacketFiltersPanel
        filters={filters}
        onChange={setFilters}
        resultCount={filtered.length}
        mobileOpen={mobileFiltersOpen}
        onMobileOpenChange={setMobileFiltersOpen}
      />

      <div className="flex-1 min-w-0">
        <div className="relative mb-8 border-b border-border pb-4">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
          <input
            placeholder="Search jackets…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 py-2 text-sm bg-transparent outline-none placeholder:text-muted/50"
            aria-label="Search leather jackets"
          />
        </div>

        <p className="text-xs text-muted mb-8 tracking-wider uppercase">
          {filtered.length} {filtered.length === 1 ? "Product" : "Products"}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {filtered.map((jacket, i) => (
              <JacketCard key={jacket.slug} jacket={jacket} index={i} variant="compact" />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="editorial-heading text-2xl text-muted mb-3">No jackets found</p>
            <p className="text-sm text-muted mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearch("");
                setFilters(emptyFilters);
              }}
              className="text-xs tracking-[0.15em] uppercase underline underline-offset-4"
            >
              Reset all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function JacketCatalog({ jackets }: JacketCatalogProps) {
  return (
    <Suspense>
      <JacketCatalogContent jackets={jackets} />
    </Suspense>
  );
}
