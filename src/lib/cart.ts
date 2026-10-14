import type { CartItem, Product } from "./types";
import { finalPrice } from "./pricing";

export function addItem(items: CartItem[], product: Product, quantity = 1): CartItem[] {
  const existing = items.find((i) => i.productId === product.id);
  if (existing) {
    return items.map((i) =>
      i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i
    );
  }
  return [...items, { productId: product.id, name: product.name, price: finalPrice(product), quantity }];
}

export function updateQuantity(items: CartItem[], productId: string, quantity: number): CartItem[] {
  if (quantity <= 0) return removeItem(items, productId);
  return items.map((i) => (i.productId === productId ? { ...i, quantity } : i));
}

export function removeItem(items: CartItem[], productId: string): CartItem[] {
  return items.filter((i) => i.productId !== productId);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
