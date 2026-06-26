"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { formatPrice } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CheckoutPage() {
  const { cart, cartTotal, discount, clearCart } = useShop();
  const [step, setStep] = useState<"form" | "success">("form");
  const [isGuest, setIsGuest] = useState(true);

  const discountAmount = cartTotal * discount;
  const shipping = cartTotal >= 500 ? 0 : 25;
  const total = cartTotal - discountAmount + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
    clearCart();
  };

  if (cart.length === 0 && step === "form") {
    return (
      <div className="pt-24 min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Nothing to Checkout</h1>
          <p className="text-muted mb-8">Your cart is empty</p>
          <Button variant="default" asChild>
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="pt-24 min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="h-16 w-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-gold" />
          </div>
          <h1 className="font-serif text-3xl mb-4">Order Confirmed</h1>
          <p className="text-muted mb-2">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <p className="text-muted text-sm mb-8">
            Order #DOYA-{Math.random().toString(36).substring(2, 8).toUpperCase()}
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
      <div className="container-luxury px-6 lg:px-8 py-12 max-w-6xl">
        <div className="flex items-center gap-2 mb-2">
          <Lock className="h-4 w-4 text-gold" />
          <span className="text-xs tracking-wider uppercase text-muted">
            Secure Checkout
          </span>
        </div>
        <h1 className="font-serif text-4xl font-light mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setIsGuest(true)}
                className={`text-xs tracking-wider uppercase px-4 py-2 border transition-colors ${
                  isGuest
                    ? "border-gold bg-gold/5 text-[#111111]"
                    : "border-border text-muted"
                }`}
              >
                Guest Checkout
              </button>
              <button
                type="button"
                onClick={() => setIsGuest(false)}
                className={`text-xs tracking-wider uppercase px-4 py-2 border transition-colors ${
                  !isGuest
                    ? "border-gold bg-gold/5 text-[#111111]"
                    : "border-border text-muted"
                }`}
              >
                Sign In
              </button>
            </div>

            <fieldset className="space-y-4">
              <legend className="font-serif text-xl mb-4">Contact Information</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="First Name" required />
                <Input placeholder="Last Name" required />
              </div>
              <Input type="email" placeholder="Email Address" required />
              <Input type="tel" placeholder="Phone Number" />
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="font-serif text-xl mb-4">Shipping Address</legend>
              <Input placeholder="Street Address" required />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input placeholder="City" required />
                <Input placeholder="State / Province" required />
                <Input placeholder="ZIP / Postal Code" required />
              </div>
              <Input placeholder="Country" required defaultValue="United States" />
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="font-serif text-xl mb-4">Payment</legend>
              <Input placeholder="Card Number" required />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="MM / YY" required />
                <Input placeholder="CVC" required />
              </div>
              <Input placeholder="Name on Card" required />
            </fieldset>

            <Button variant="default" size="lg" type="submit" className="w-full">
              Place Order — {formatPrice(total)}
            </Button>
          </form>

          <div>
            <div className="border border-border p-8 sticky top-28">
              <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.color}`}
                    className="flex gap-4"
                  >
                    <div className="relative w-16 h-20 bg-ivory shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      <span className="absolute -top-2 -right-2 h-5 w-5 bg-[#111111] text-white text-[10px] rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-muted">{item.color}</p>
                    </div>
                    <p className="text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-border text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-gold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-4 border-t border-border">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
