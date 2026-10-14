import Link from "next/link";
import type { Product } from "@/lib/types";
import { discountPercent } from "@/lib/pricing";
import AddToCartButton from "./AddToCartButton";
import Price from "./Price";

export default function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product);
  return (
    <div className="relative flex flex-col rounded-lg border bg-white p-3 sm:p-4">
      {discount > 0 && (
        <span className="absolute left-2 top-2 z-10 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white sm:left-3 sm:top-3">
          -{discount}%
        </span>
      )}
      <Link href={`/products/${product.id}`}>
        <div className="mb-3 aspect-square rounded bg-gray-100" />
        <h3 className="text-sm font-semibold sm:text-base">{product.name}</h3>
      </Link>
      <Price product={product} className="mb-3 mt-1 text-sm sm:text-base" />
      <AddToCartButton product={product} />
    </div>
  );
}
