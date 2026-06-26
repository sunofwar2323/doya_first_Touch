"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { JacketProduct } from "@/types/jacket";
import { JacketCard } from "@/components/jackets/JacketCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BestSellersProps {
  jackets: JacketProduct[];
}

function getVisibleCount(width: number): number {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

export function BestSellers({ jackets }: BestSellersProps) {
  const featured = jackets;
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);
  const gap = 24;

  const maxIndex = Math.max(0, featured.length - visibleCount);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const count = getVisibleCount(window.innerWidth);
    const width = (track.offsetWidth - gap * (count - 1)) / count;
    setVisibleCount(count);
    setCardWidth(width);
    setIndex((i) => Math.min(i, Math.max(0, featured.length - count)));
  }, [featured.length, gap]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const goTo = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(next, maxIndex)));
    },
    [maxIndex]
  );

  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (featured.length <= visibleCount) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, featured.length, visibleCount]);

  const offset = index * (cardWidth + gap);

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-luxury px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <p className="label-caps text-muted mb-3">Curated Selection</p>
            <h2 className="editorial-heading text-3xl md:text-4xl lg:text-5xl text-black">
              Best of DOYA
            </h2>
          </div>
          <Button variant="outline" asChild className="shrink-0 group">
            <Link href="/collections/jackets">
              See All
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <div className="relative">
          {featured.length > visibleCount && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-0 top-[38%] -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 h-11 w-11 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
                aria-label="Previous products"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-0 top-[38%] -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 h-11 w-11 rounded-full bg-white border border-border shadow-md flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
                aria-label="Next products"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div ref={trackRef} className="overflow-hidden mx-2 sm:mx-4">
            <motion.div
              className="flex"
              style={{ gap }}
              animate={{ x: cardWidth ? -offset : 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.8 }}
            >
              {featured.map((jacket, i) => (
                <div
                  key={jacket.slug}
                  style={{ width: cardWidth || undefined, minWidth: cardWidth || undefined }}
                  className={cn(!cardWidth && "w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0")}
                >
                  <JacketCard jacket={jacket} index={i} variant="compact" />
                </div>
              ))}
            </motion.div>
          </div>

          {featured.length > visibleCount && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-8 bg-black" : "w-1.5 bg-border hover:bg-muted"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
