"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { JacketProduct } from "@/types/jacket";
import { formatJacketPrice, getWhatsAppUrl } from "@/lib/jackets/utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface JacketCardProps {
  jacket: JacketProduct;
  index?: number;
  variant?: "default" | "compact";
}

export function JacketCard({ jacket, index = 0, variant = "default" }: JacketCardProps) {
  const [hoverIndex, setHoverIndex] = useState(0);
  const images = jacket.images.length > 0 ? jacket.images : ["/placeholder-jacket.svg"];
  const displayImage = images[hoverIndex] ?? images[0];
  const whatsappUrl = getWhatsAppUrl(jacket.name, jacket.productNumber);
  const isCompact = variant === "compact";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="group"
      onMouseLeave={() => setHoverIndex(0)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-warm-gray mb-4">
        <Link href={`/jackets/${jacket.slug}`} className="block absolute inset-0">
          <Image
            src={displayImage}
            alt={jacket.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading={index < 8 ? "eager" : "lazy"}
          />
        </Link>

        {/* Hover image dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {images.slice(0, 5).map((_, i) => (
              <button
                key={i}
                onMouseEnter={() => setHoverIndex(i)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  hoverIndex === i ? "bg-white" : "bg-white/40"
                )}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}

        <button
          className="absolute top-3 right-3 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
          aria-label="Add to wishlist"
        >
          <Heart className="h-3.5 w-3.5" />
        </button>

        {!isCompact && (
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-white/95 flex gap-2">
            <Button variant="default" size="sm" className="flex-1" asChild>
              <Link href={`/jackets/${jacket.slug}`}>
                <Eye className="h-3.5 w-3.5" />
                Quick View
              </Link>
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <Link href={`/jackets/${jacket.slug}`}>
          <h3
            className={cn(
              "text-black group-hover:underline underline-offset-4 decoration-1",
              isCompact ? "text-sm font-medium" : "font-serif text-lg"
            )}
          >
            {jacket.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{formatJacketPrice(jacket.price)}</span>
          {!isCompact && (
            <span className="text-muted text-xs uppercase tracking-wider">
              Size {jacket.size}
            </span>
          )}
        </div>
        {!isCompact && (
          <>
            <p className="text-muted text-xs leading-relaxed line-clamp-2 pt-1">
              {jacket.description}
            </p>
            <ul className="pt-2 space-y-1">
              {jacket.features.slice(0, 2).map((f) => (
                <li key={f} className="text-[11px] text-muted">
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex gap-2 pt-4">
              <Button variant="default" size="sm" className="flex-1" asChild>
                <Link href={`/jackets/${jacket.slug}`}>View Details</Link>
              </Button>
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </motion.article>
  );
}
