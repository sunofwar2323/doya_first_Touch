"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { Product, CartItem } from "@/types";

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  mounted: boolean;
  addToCart: (product: Product, color?: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
  coupon: string | null;
  discount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const COUPONS: Record<string, number> = {
  LUXURY10: 0.1,
  CRAFT15: 0.15,
  DOYA20: 0.2,
};

function parseStoredArray<T>(value: string | null): T[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedCart = parseStoredArray<CartItem>(localStorage.getItem("doya-cart"));
    const savedWishlist = parseStoredArray<Product>(
      localStorage.getItem("doya-wishlist")
    );
    setCart(savedCart);
    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("doya-cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("doya-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, mounted]);

  const addToCart = useCallback(
    (product: Product, color?: string, quantity = 1) => {
      setCart((prev) => {
        const items = Array.isArray(prev) ? prev : [];
        const selectedColor = color || product.colors[0];
        const existing = items.find(
          (item) => item.product.id === product.id && item.color === selectedColor
        );
        if (existing) {
          return items.map((item) =>
            item.product.id === product.id && item.color === selectedColor
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...items, { product, quantity, color: selectedColor }];
      });
    },
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) =>
      (Array.isArray(prev) ? prev : []).filter((item) => item.product.id !== productId)
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) =>
        (Array.isArray(prev) ? prev : []).filter((item) => item.product.id !== productId)
      );
      return;
    }
    setCart((prev) =>
      (Array.isArray(prev) ? prev : []).map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const items = Array.isArray(prev) ? prev : [];
      const exists = items.find((p) => p.id === product.id);
      if (exists) return items.filter((p) => p.id !== product.id);
      return [...items, product];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) =>
      (Array.isArray(wishlist) ? wishlist : []).some((p) => p.id === productId),
    [wishlist]
  );

  const safeCart = Array.isArray(cart) ? cart : [];

  const cartTotal = safeCart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = safeCart.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = useCallback((code: string) => {
    const upperCode = code.toUpperCase();
    if (COUPONS[upperCode]) {
      setCoupon(upperCode);
      setDiscount(COUPONS[upperCode]);
      return true;
    }
    return false;
  }, []);

  const removeCoupon = useCallback(() => {
    setCoupon(null);
    setDiscount(0);
  }, []);

  return (
    <ShopContext.Provider
      value={{
        cart: safeCart,
        wishlist: Array.isArray(wishlist) ? wishlist : [],
        mounted,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
        coupon,
        discount,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
}
