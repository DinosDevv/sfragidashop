"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import type { CartItem, Product } from "@/lib/types";
import * as cart from "@/lib/cart";
import * as store from "@/lib/cartStore";
import { showToast } from "@/lib/toastStore";
import { formatPrice } from "@/lib/format";
import { finalPrice } from "@/lib/pricing";

function notifyAdded(product: Product) {
  const quantity = store.getSnapshot().find((i) => i.productId === product.id)?.quantity ?? 1;
  showToast({
    title: "Προστέθηκε στο καλάθι",
    description: `${product.name} · ${formatPrice(finalPrice(product))}${quantity > 1 ? ` (×${quantity} στο καλάθι)` : ""}`,
    action: { href: "/cart", label: "Δείτε το καλάθι" },
    dismissLabel: "Συνέχεια αγορών",
  });
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  add: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

  const value: CartContextValue = {
    items,
    count: cart.cartCount(items),
    total: cart.cartTotal(items),
    add: (product, quantity) => {
      store.setItems((prev) => cart.addItem(prev, product, quantity));
      notifyAdded(product);
    },
    setQuantity: (id, qty) => store.setItems((prev) => cart.updateQuantity(prev, id, qty)),
    remove: (id) => store.setItems((prev) => cart.removeItem(prev, id)),
    clear: () => store.setItems(() => []),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
