"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface JacketGalleryProps {
  images: string[];
  name: string;
}

export function JacketGallery({ images, name }: JacketGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const displayImages = images.length > 0 ? images : ["/placeholder-jacket.svg"];

  const selectImage = (index: number) => {
    setActiveIndex(index);
    setZoomed(false);
  };

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % displayImages.length);
    setZoomed(false);
  }, [displayImages.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + displayImages.length) % displayImages.length);
    setZoomed(false);
  }, [displayImages.length]);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, next, prev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const mainImage = (
    <div
      className="relative flex-1 min-w-0 aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] bg-[#f7f7f7] rounded-2xl overflow-hidden group"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "relative w-full h-full",
            zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          )}
          onClick={() => setZoomed(!zoomed)}
          onMouseMove={(e) => {
            if (!zoomed) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
          }}
          style={zoomed ? { transform: "scale(2)" } : undefined}
        >
          <Image
            src={displayImages[activeIndex]}
            alt={`${name} — image ${activeIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={activeIndex === 0}
            loading={activeIndex === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setLightbox(true);
        }}
        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/95 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        aria-label="Zoom image"
      >
        <Search className="h-4 w-4 text-black" />
      </button>
    </div>
  );

  const thumbnails = (
    <div
      className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden lg:max-h-[640px] pb-1 lg:pb-0 lg:shrink-0"
      role="tablist"
      aria-label="Product image thumbnails"
    >
      {displayImages.map((image, i) => (
        <button
          key={image}
          type="button"
          role="tab"
          aria-selected={activeIndex === i}
          onClick={() => selectImage(i)}
          className={cn(
            "relative shrink-0 w-[72px] h-[88px] sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all bg-[#f7f7f7]",
            activeIndex === i
              ? "border-black ring-1 ring-black/10"
              : "border-transparent hover:border-border opacity-75 hover:opacity-100"
          )}
        >
          <Image
            src={image}
            alt={`${name} thumbnail ${i + 1}`}
            fill
            className="object-cover"
            sizes="80px"
            loading="lazy"
          />
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-5">
        {displayImages.length > 1 && thumbnails}
        {mainImage}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 text-white">
              <span className="text-sm tracking-wide">{name}</span>
              <button
                type="button"
                onClick={() => {
                  setLightbox(false);
                  setZoomed(false);
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 relative mx-4 mb-4 rounded-xl overflow-hidden">
              <Image
                src={displayImages[activeIndex]}
                alt={name}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            {displayImages.length > 1 && (
              <div className="p-4 flex gap-2 overflow-x-auto justify-center">
                {displayImages.map((image, i) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "relative shrink-0 w-14 h-16 rounded-lg border-2 overflow-hidden",
                      activeIndex === i ? "border-white" : "border-white/25"
                    )}
                  >
                    <Image src={image} alt="" fill className="object-cover" sizes="56px" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
