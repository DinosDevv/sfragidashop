import { getProducts } from "@/lib/products";
import CategoryNav from "@/components/CategoryNav";
import ProductGrid from "@/components/ProductGrid";

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">Όλα τα προϊόντα</h1>
      <CategoryNav />
      <ProductGrid products={products} />
    </div>
  );
}
