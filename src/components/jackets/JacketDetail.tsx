"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Heart,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { JacketProduct, JACKET_SIZES } from "@/types/jacket";
import { JacketGallery } from "@/components/jackets/JacketGallery";
import { JacketCard } from "@/components/jackets/JacketCard";
import { formatJacketPrice, getWhatsAppUrl } from "@/lib/jackets/utils";
import { cn } from "@/lib/utils";

interface JacketDetailProps {
  jacket: JacketProduct;
  relatedJackets?: JacketProduct[];
}

const COLOR_HEX: Record<string, string> = {
  Black: "#1a1a1a",
  Brown: "#6B4423",
  "Dark Brown": "#4a3728",
  "Camel Brown": "#C19A6B",
  Camel: "#C19A6B",
  White: "#f0f0f0",
};

const TABS = ["Details", "Materials", "Size & Fit", "Shipping & Returns"] as const;
type TabId = (typeof TABS)[number];

const WISHLIST_KEY = "doya-jacket-wishlist";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : i < rating
                ? "fill-amber-400/50 text-amber-400"
                : "fill-transparent text-border"
          )}
        />
      ))}
    </div>
  );
}

function getStableRating(slug: string): { rating: number; count: number } {
  const hash = slug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return {
    rating: 4.7 + (hash % 4) * 0.1,
    count: 12 + (hash % 36),
  };
}

function getColorHex(color: string): string {
  return COLOR_HEX[color] ?? "#888888";
}

function getAvailableColors(jacket: JacketProduct): string[] {
  if (jacket.colors.length > 0) return jacket.colors;
  const text = `${jacket.name} ${jacket.description}`.toLowerCase();
  if (text.includes("black")) return ["Black"];
  if (text.includes("brown")) return ["Brown"];
  if (text.includes("white")) return ["White"];
  return ["Black"];
}

function getAvailableSizes(jacket: JacketProduct): string[] {
  const sizes = [...JACKET_SIZES];
  if (jacket.size && !sizes.includes(jacket.size as (typeof JACKET_SIZES)[number])) {
    return [jacket.size, ...sizes];
  }
  return sizes;
}

export function JacketDetail({ jacket, relatedJackets = [] }: JacketDetailProps) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState<TabId>("Details");
  const [wishlisted, setWishlisted] = useState(false);
  const tabsRef = useRef<HTMLElement>(null);

  const colors = useMemo(() => getAvailableColors(jacket), [jacket]);
  const sizes = useMemo(() => getAvailableSizes(jacket), [jacket]);
  const { rating, count } = useMemo(() => getStableRating(jacket.slug), [jacket.slug]);
  const specs = jacket.specifications;

  useEffect(() => {
    setSelectedColor(colors[0] ?? "");
    setSelectedSize(jacket.size || sizes[0] || "");
  }, [jacket.slug, colors, sizes, jacket.size]);

  useEffect(() => {
    try {
      const saved: string[] = JSON.parse(localStorage.getItem(WISHLIST_KEY) ?? "[]");
      setWishlisted(saved.includes(jacket.slug));
    } catch {
      setWishlisted(false);
    }
  }, [jacket.slug]);

  const whatsappUrl = getWhatsAppUrl(jacket.name, jacket.productNumber, {
    size: selectedSize,
    color: selectedColor,
  });

  const lifestyleImage = jacket.images[1] ?? jacket.images[0];

  const toggleWishlist = () => {
    try {
      const saved: string[] = JSON.parse(localStorage.getItem(WISHLIST_KEY) ?? "[]");
      const next = wishlisted
        ? saved.filter((s) => s !== jacket.slug)
        : [...saved, jacket.slug];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      setWishlisted(!wishlisted);
    } catch {
      setWishlisted(!wishlisted);
    }
  };

  const openSizeGuide = () => {
    setActiveTab("Size & Fit");
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container-luxury px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
        <nav className="flex items-center gap-2 text-[11px] text-muted mb-8 tracking-wide flex-wrap">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/collections/jackets" className="hover:text-black transition-colors">
            Jackets
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-black">{jacket.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <JacketGallery images={jacket.images} name={jacket.name} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <span className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase bg-black text-white px-3 py-1.5 rounded-full mb-5">
              New Arrival
            </span>

            <h1 className="text-3xl sm:text-4xl font-semibold text-black leading-tight tracking-tight mb-4">
              {jacket.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={rating} />
              <span className="text-sm text-muted">
                {rating.toFixed(1)} · {count} reviews
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-2xl sm:text-3xl font-semibold text-black">
                {formatJacketPrice(jacket.price)}
              </span>
              {jacket.inStock && (
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                  In Stock
                </span>
              )}
            </div>

            <p className="text-muted text-[15px] leading-relaxed mb-8">
              {jacket.description}
            </p>

            <hr className="border-border mb-8" />

            {colors.length > 0 && (
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-black">Color:</span>
                  <span className="text-sm text-muted">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "h-9 w-9 rounded-full border-2 transition-all",
                        selectedColor === color
                          ? "border-black ring-2 ring-black/10 ring-offset-2"
                          : "border-border hover:border-black/40"
                      )}
                      style={{ backgroundColor: getColorHex(color) }}
                      aria-label={`Select color ${color}`}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-black">Size:</span>
                <button
                  type="button"
                  onClick={openSizeGuide}
                  className="text-sm text-muted underline underline-offset-4 hover:text-black transition-colors"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-[3rem] h-11 px-4 rounded-xl border text-sm font-medium transition-all",
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-border text-black hover:border-black/50"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 h-14 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-base font-semibold transition-colors shadow-sm"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                WhatsApp Message
              </a>
              <button
                type="button"
                onClick={toggleWishlist}
                className={cn(
                  "h-14 w-14 shrink-0 rounded-2xl border flex items-center justify-center transition-all",
                  wishlisted
                    ? "border-black bg-black text-white"
                    : "border-border hover:border-black text-black"
                )}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={cn("h-5 w-5", wishlisted && "fill-current")} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: RotateCcw, label: "Easy Returns" },
                { icon: ShieldCheck, label: "Secure Payment" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2">
                  <Icon className="h-5 w-5 text-black" strokeWidth={1.5} />
                  <span className="text-[11px] text-muted leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <section ref={tabsRef} className="mt-20 md:mt-28">
          <div className="flex gap-6 sm:gap-10 border-b border-border overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px",
                  activeTab === tab
                    ? "border-black text-black"
                    : "border-transparent text-muted hover:text-black"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-10 max-w-3xl">
            {activeTab === "Details" && (
              <div className="space-y-6 text-[15px] leading-relaxed text-muted">
                <p className="text-black">{jacket.description}</p>
                <ul className="space-y-2.5">
                  {jacket.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="text-black mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p>
                  Style: <span className="text-black">{jacket.jacketType}</span>
                  {jacket.style.length > 0 && (
                    <> · {jacket.style.join(", ")}</>
                  )}
                </p>
              </div>
            )}

            {activeTab === "Materials" && (
              <dl className="space-y-4 text-sm">
                {[
                  { label: "Material", value: specs.material },
                  { label: "Leather Type", value: specs.leatherType },
                  { label: "Finish", value: specs.finishType },
                  { label: "Zipper", value: specs.zipperType },
                  { label: "Special Features", value: specs.specialFeatures },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="grid sm:grid-cols-[180px_1fr] gap-2 py-3 border-b border-border last:border-0"
                  >
                    <dt className="text-muted font-medium">{row.label}</dt>
                    <dd className="text-black">{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {activeTab === "Size & Fit" && (
              <div className="space-y-5 text-[15px] text-muted leading-relaxed">
                <p>
                  This piece is available in size{" "}
                  <span className="text-black font-medium">{jacket.size}</span>.
                  Our leather jackets are cut for a refined, tailored fit with room
                  for layering.
                </p>
                <p>
                  Collar: <span className="text-black">{specs.collarStyle}</span>
                  <br />
                  Pockets: <span className="text-black">{specs.pocketConfiguration}</span>
                </p>
                <p>
                  For the best fit, message us on WhatsApp with your measurements
                  and preferred size. Our team will guide you personally.
                </p>
              </div>
            )}

            {activeTab === "Shipping & Returns" && (
              <div className="space-y-5 text-[15px] text-muted leading-relaxed">
                <p>
                  <span className="text-black font-medium">Shipping:</span> Complimentary
                  delivery across Bhutan. International shipping available on request
                  via WhatsApp inquiry.
                </p>
                <p>
                  <span className="text-black font-medium">Returns:</span> Easy returns
                  within 7 days for unworn items in original condition. Contact us
                  on WhatsApp to initiate a return.
                </p>
                <p>
                  <span className="text-black font-medium">Payment:</span> Secure
                  payment options discussed directly with our team for a personalized
                  checkout experience.
                </p>
              </div>
            )}
          </div>
        </section>

        {lifestyleImage && (
          <section className="mt-8 md:mt-12">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-[#f7f7f7]">
              <Image
                src={lifestyleImage}
                alt={`${jacket.name} — detail`}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1400px"
              />
            </div>
          </section>
        )}

        {relatedJackets.length > 0 && (
          <section className="mt-20 md:mt-28 pt-12 border-t border-border">
            <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-10 tracking-tight">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
              {relatedJackets.map((j, i) => (
                <JacketCard key={j.slug} jacket={j} index={i} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
