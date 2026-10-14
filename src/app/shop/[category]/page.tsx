import { Suspense } from "react";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import CategoryNav from "@/components/CategoryNav";
import ProductGrid from "@/components/ProductGrid";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Suspense fallback={<p>Φόρτωση...</p>}>
        <CategoryProducts params={params} />
      </Suspense>
    </div>
  );
}

async function CategoryProducts({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const products = await getProductsByCategory(category.slug);

  return (
    <>
      <h1 className="text-2xl font-bold sm:text-3xl">{category.name}</h1>
      <p className="mb-4 mt-1 text-gray-600">{category.description}</p>
      <CategoryNav active={category.slug} />
      <ProductGrid products={products} />
    </>
  );
}
