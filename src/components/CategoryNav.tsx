import Link from "next/link";
import { categories } from "@/lib/categories";

export default function CategoryNav({ active }: { active?: string }) {
  const pill = (isActive: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm ${isActive ? "border-black bg-black text-white" : "hover:bg-gray-100"}`;

  return (
    <nav className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2">
      <Link href="/shop" className={pill(!active)}>Όλα</Link>
      {categories.map((c) => (
        <Link key={c.slug} href={`/shop/${c.slug}`} className={pill(active === c.slug)}>{c.name}</Link>
      ))}
    </nav>
  );
}
