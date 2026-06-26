"use client";

import { SlidersHorizontal, X } from "lucide-react";
import {
  JACKET_FINISHES,
  JACKET_MATERIALS,
  JACKET_SIZES,
  JACKET_STYLES,
  JacketFilters,
  PRICE_RANGE_OPTIONS,
} from "@/types/jacket";
import { cn } from "@/lib/utils";

interface JacketFiltersPanelProps {
  filters: JacketFilters;
  onChange: (filters: JacketFilters) => void;
  resultCount: number;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border pb-6">
      <h3 className="label-caps text-muted mb-4">{title}</h3>
      {children}
    </div>
  );
}

export function JacketFiltersPanel({
  filters,
  onChange,
  resultCount,
  mobileOpen,
  onMobileOpenChange,
}: JacketFiltersPanelProps) {
  const toggleArray = <T extends string>(key: keyof JacketFilters, value: T, checked: boolean) => {
    const current = filters[key] as T[];
    const updated = checked ? [...current, value] : current.filter((v) => v !== value);
    onChange({ ...filters, [key]: updated });
  };

  const activeCount =
    filters.sizes.length +
    filters.priceRanges.length +
    filters.styles.length +
    filters.finishes.length +
    filters.materials.length;

  const clearAll = () => {
    onChange({
      sizes: [],
      priceRanges: [],
      styles: [],
      finishes: [],
      materials: [],
    });
  };

  const panel = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted uppercase tracking-wider">
          {resultCount} products
        </p>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs underline underline-offset-2">
            Clear
          </button>
        )}
      </div>

      <FilterSection title="Size">
        <div className="grid grid-cols-3 gap-1">
          {JACKET_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleArray("sizes", size, !filters.sizes.includes(size))}
              className={cn(
                "py-2.5 text-xs border transition-all",
                filters.sizes.includes(size)
                  ? "border-black bg-black text-white"
                  : "border-border text-muted hover:border-black"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        {PRICE_RANGE_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-3 py-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.priceRanges.includes(opt.value)}
              onChange={(e) => toggleArray("priceRanges", opt.value, e.target.checked)}
              className="accent-black"
            />
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Style">
        {JACKET_STYLES.map((style) => (
          <label key={style} className="flex items-center gap-3 py-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.styles.includes(style)}
              onChange={(e) => toggleArray("styles", style, e.target.checked)}
              className="accent-black"
            />
            <span className="text-sm">{style}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Finish">
        {JACKET_FINISHES.map((finish) => (
          <label key={finish} className="flex items-center gap-3 py-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.finishes.includes(finish)}
              onChange={(e) => toggleArray("finishes", finish, e.target.checked)}
              className="accent-black"
            />
            <span className="text-sm">{finish}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Material">
        {JACKET_MATERIALS.map((material) => (
          <label key={material} className="flex items-center gap-3 py-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.materials.includes(material)}
              onChange={(e) => toggleArray("materials", material, e.target.checked)}
              className="accent-black"
            />
            <span className="text-sm">{material}</span>
          </label>
        ))}
      </FilterSection>
    </div>
  );

  return (
    <>
      <button
        onClick={() => onMobileOpenChange(true)}
        className="lg:hidden flex items-center gap-2 text-xs tracking-[0.15em] uppercase border border-border px-4 py-3 w-full justify-center mb-6"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {activeCount > 0 && (
          <span className="bg-black text-white text-[9px] px-1.5 py-0.5">{activeCount}</span>
        )}
      </button>

      <aside className="hidden lg:block w-56 shrink-0">{panel}</aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => onMobileOpenChange(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-lg font-medium">Filters</h2>
              <button onClick={() => onMobileOpenChange(false)} aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>
            {panel}
          </div>
        </div>
      )}
    </>
  );
}
