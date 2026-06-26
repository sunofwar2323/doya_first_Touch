"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [rotation, setRotation] = useState(0);

  const next = () => setActiveIndex((i) => (i + 1) % images.length);
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-square bg-ivory overflow-hidden cursor-zoom-in group"
        onClick={() => setZoomed(!zoomed)}
        onMouseMove={(e) => {
          if (!zoomed) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotateY: rotation }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "relative w-full h-full",
              zoomed && "scale-150 transition-transform duration-300"
            )}
          >
            <Image
              src={images[activeIndex]}
              alt={`${name} - Image ${activeIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-white/90 backdrop-blur-sm p-2 flex items-center gap-2 text-xs tracking-wider uppercase">
            <ZoomIn className="h-4 w-4" />
            {zoomed ? "Click to zoom out" : "Click to zoom"}
          </span>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setRotation((r) => r + 90);
          }}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold"
        >
          360° View
        </button>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative w-20 h-20 overflow-hidden border-2 transition-colors",
                activeIndex === i ? "border-gold" : "border-transparent hover:border-border"
              )}
            >
              <Image
                src={image}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
