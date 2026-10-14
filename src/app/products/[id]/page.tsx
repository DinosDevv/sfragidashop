import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";
import Price from "@/components/Price";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: PageProps<"/products/[id]">) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Suspense fallback={<p>Φόρτωση...</p>}>
        <ProductDetails params={params} />
      </Suspense>
    </div>
  );
}

async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-10">
      <div className="aspect-square rounded-lg bg-gray-100" />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold sm:text-3xl">{product.name}</h1>
        <Price product={product} className="text-xl" />
        <p className="text-gray-600">{product.description}</p>
        <div className="sm:w-64">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
