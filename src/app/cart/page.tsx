"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    coupon,
    discount,
    applyCoupon,
    removeCoupon,
  } = useShop();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState(false);

  const discountAmount = cartTotal * discount;
  const total = cartTotal - discountAmount;

  const handleApplyCoupon = () => {
    const success = applyCoupon(couponCode);
    if (success) {
      setCouponError(false);
      setCouponCode("");
    } else {
      setCouponError(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-24 min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="h-16 w-16 text-border mx-auto mb-6" />
          <h1 className="font-serif text-3xl mb-4">Your Cart is Empty</h1>
          <p className="text-muted mb-8">
            Discover our collection of premium leather goods
          </p>
          <Button variant="default" asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="container-luxury px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl font-light mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div
                key={`${item.product.id}-${item.color}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-6 border border-border p-4"
              >
                <Link
                  href={`/products/${item.product.slug}`}
                  className="relative w-28 h-36 shrink-0 bg-ivory overflow-hidden"
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </Link>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="font-serif text-lg hover:text-gold transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-muted text-sm mt-1">Color: {item.color}</p>
                    <p className="text-[#111111] font-medium mt-2">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-ivory transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-4 text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-ivory transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted hover:text-red-500 transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="border border-border p-8 sticky top-28">
              <h2 className="font-serif text-2xl mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-gold">
                    <span>
                      Discount ({coupon})
                      <button
                        onClick={removeCoupon}
                        className="ml-2 text-muted hover:text-red-500 text-xs"
                      >
                        Remove
                      </button>
                    </span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span>{cartTotal >= 500 ? "Free" : formatPrice(25)}</span>
                </div>
              </div>

              {!coupon && (
                <div className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError(false);
                      }}
                      className="text-sm"
                    />
                    <Button variant="outline" size="sm" onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  </div>
                  {couponError && (
                    <p className="text-red-500 text-xs mt-2">Invalid coupon code</p>
                  )}
                  <p className="text-muted text-xs mt-2">
                    Try: LUXURY10, CRAFT15, DOYA20
                  </p>
                </div>
              )}

              <div className="flex justify-between text-lg font-medium mb-8">
                <span>Total</span>
                <span>
                  {formatPrice(total + (cartTotal >= 500 ? 0 : 25))}
                </span>
              </div>

              <Button variant="default" size="lg" className="w-full mb-3" asChild>
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
