import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export default function Price({ product, className = "" }: { product: Product; className?: string }) {
  if (product.salePrice !== undefined) {
    return (
      <p className={`flex flex-wrap items-baseline gap-x-2 ${className}`}>
        <span className="font-bold text-red-600">{formatPrice(product.salePrice)}</span>
        <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
      </p>
    );
  }
  return <p className={`font-semibold ${className}`}>{formatPrice(product.price)}</p>;
}
