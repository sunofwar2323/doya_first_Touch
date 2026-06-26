"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  size = "sm",
  showValue = false,
  className,
}: StarRatingProps) {
  const sizeClass = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }[size];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClass,
            i < Math.floor(rating)
              ? "fill-gold text-gold"
              : i < rating
                ? "fill-gold/50 text-gold"
                : "fill-none text-gray-300"
          )}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-sm text-muted">({rating.toFixed(1)})</span>
      )}
    </div>
  );
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}
