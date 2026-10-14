import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="text-gray-600">Δεν βρέθηκαν προϊόντα.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
