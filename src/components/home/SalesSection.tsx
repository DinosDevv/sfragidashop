import { getSaleProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

export default async function SalesSection() {
  const products = await getSaleProducts();
  if (products.length === 0) return null;

  return (
    <section id="offers" className="scroll-mt-20 bg-red-600 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center text-white">
          <span className="inline-block rounded-full bg-white px-4 py-1 text-sm font-bold text-red-600">
            Για περιορισμένο χρόνο
          </span>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">Προσφορές</h2>
          <p className="mt-2 text-red-100">Επιλεγμένα προϊόντα σε χαμηλότερες τιμές, μέχρι εξαντλήσεως.</p>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
