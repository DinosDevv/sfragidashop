import type { Product } from "./types";

export function finalPrice(product: Product): number {
  return product.salePrice ?? product.price;
}

export function discountPercent(product: Product): number {
  if (product.salePrice === undefined) return 0;
  return Math.round((1 - product.salePrice / product.price) * 100);
}
