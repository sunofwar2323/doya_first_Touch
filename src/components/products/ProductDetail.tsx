"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Heart, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { Product } from "@/types";
import { getRelatedProducts, getProductReviews } from "@/data/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductCard } from "@/components/products/ProductCard";
import { StarRating, formatPrice } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const inWishlist = isInWishlist(product.id);
  const relatedProducts = getRelatedProducts(product);
  const productReviews = getProductReviews(product.id);

  return (
    <div className="pt-24">
      <div className="container-luxury px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-xs text-muted mb-8 tracking-wider">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-gold transition-colors">
            Shop
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#111111]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProductGallery images={product.images} name={product.name} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:py-8"
          >
            {product.isBestSeller && (
              <Badge variant="default" className="mb-4">
                Best Seller
              </Badge>
            )}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#111111] mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <StarRating rating={product.rating} size="md" showValue />
              <span className="text-muted text-sm">
                {product.reviewCount} reviews
              </span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-light text-[#111111]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-muted leading-relaxed mb-8">
              {product.longDescription}
            </p>

            <div className="space-y-6 mb-8 pb-8 border-b border-border">
              <div>
                <span className="text-xs tracking-wider uppercase text-muted mb-3 block">
                  Color — {selectedColor}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "px-5 py-2.5 text-xs border transition-all",
                        selectedColor === color
                          ? "border-gold bg-gold/5 text-[#111111]"
                          : "border-border text-muted hover:border-gold/50"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs tracking-wider uppercase text-muted mb-3 block">
                  Quantity
                </span>
                <div className="flex items-center border border-border w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-ivory transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-ivory transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button
                variant="default"
                size="lg"
                className="flex-1"
                onClick={() => addToCart(product, selectedColor, quantity)}
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="default" size="lg" className="flex-1" asChild>
                <Link href="/checkout">Buy Now</Link>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-auto aspect-square"
                onClick={() => toggleWishlist(product)}
                aria-label="Add to wishlist"
              >
                <Heart
                  className={cn("h-5 w-5", inWishlist && "fill-gold text-gold")}
                />
              </Button>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted">
              <Truck className="h-4 w-4 text-gold" />
              Free worldwide shipping on orders over $500
            </div>

            <div className="mt-10 space-y-4">
              <details className="group border-b border-border pb-4">
                <summary className="flex justify-between items-center cursor-pointer text-sm tracking-wider uppercase">
                  Leather Details
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-muted text-sm leading-relaxed">
                  {product.leatherType}. Hand-selected for its natural grain,
                  suppleness, and ability to develop a rich patina over time.
                </p>
              </details>
              <details className="group border-b border-border pb-4">
                <summary className="flex justify-between items-center cursor-pointer text-sm tracking-wider uppercase">
                  Size & Specifications
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                </summary>
                <div className="mt-4 text-muted text-sm space-y-2">
                  <p>Dimensions: {product.dimensions}</p>
                  <p>Weight: {product.weight}</p>
                </div>
              </details>
            </div>
          </motion.div>
        </div>

        {productReviews.length > 0 && (
          <section className="mt-20 pt-16 border-t border-border">
            <h2 className="font-serif text-3xl mb-10">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {productReviews.map((review) => (
                <div key={review.id} className="border border-border p-6">
                  <StarRating rating={review.rating} className="mb-4" />
                  <p className="text-muted leading-relaxed mb-4 italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                  <p className="text-sm font-medium">{review.author}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-border">
            <h2 className="font-serif text-3xl mb-10">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
