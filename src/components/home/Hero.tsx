import Link from "next/link";
import { categories } from "@/lib/categories";

const rotatingWords = ["πούτσες", "μουνάκια", "ντίλντο", "τον μπεκέ"];
const tileTints = ["bg-red-100", "bg-amber-100", "bg-sky-100", "bg-emerald-100", "bg-violet-100"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-red-200/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-3 py-1 text-sm font-medium text-red-700">
            <span className="h-2 w-2 rounded-full bg-red-600" />
            Εξατομικευμένα, για κάθε ανάγκη
          </p>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block">Φτιάχνουμε</span>
            <span className="sr-only">σφραγίδες, αυτοκόλλητα, ταμπελάκια και βραβεία</span>
            {/* Each word box is taller than the visible window so neighbours' descenders stay hidden. */}
            <span aria-hidden="true" className="block h-[1.25em] overflow-hidden text-red-600">
              <span className="block animate-word-cycle motion-reduce:animate-none">
                {[...rotatingWords, rotatingWords[0]].map((word, i) => (
                  <span key={i} className="block h-[1.75em] leading-[1.25]">{word}</span>
                ))}
              </span>
            </span>
            <span className="block">
              με την υπογραφή σας<span className="text-red-600">.</span>
            </span>
          </h1>

          <p className="mt-5 max-w-md text-lg text-gray-600">
            Εξατομικευμένα προϊόντα για την επιχείρηση, το γραφείο και κάθε σας εκδήλωση.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/shop" className="group whitespace-nowrap rounded bg-black px-6 py-3 text-center font-medium text-white hover:bg-gray-800">
              Δείτε τα προϊόντα{" "}
              <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="#offers" className="whitespace-nowrap rounded border border-black bg-white px-6 py-3 text-center font-medium hover:bg-gray-100">
              Προσφορές
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {categories.map((c, i) => {
              // With an odd number of categories, the newest (last) one is featured full-width on top.
              const wide = i === categories.length - 1 && categories.length % 2 === 1;
              return (
                <Link
                  key={c.slug}
                  href={`/shop/${c.slug}`}
                  className={`group overflow-hidden rounded-lg border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md ${wide ? "order-first col-span-2" : ""}`}
                >
                  <div
                    className={`${wide ? "aspect-[3/1] md:aspect-[4/1]" : "aspect-square md:aspect-[16/10]"} ${tileTints[i % tileTints.length]}`}
                  />
                  <div className="p-3">
                    <h2 className="font-semibold">{c.name}</h2>
                    <p className="mt-1 hidden text-sm text-gray-600 sm:line-clamp-1">{c.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Stamp badge */}
          <div
            aria-hidden="true"
            className="absolute -right-2 -top-6 h-24 w-24 rotate-12 rounded-full border-[3px] border-red-600 bg-white p-1 shadow-md sm:-right-5 sm:h-28 sm:w-28"
          >
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-dashed border-red-600 text-center font-extrabold leading-tight text-red-600">
              <span className="text-xl sm:text-2xl">100%</span>
              <span className="text-[10px] sm:text-xs">ΔΙΚΟ ΣΑΣ</span>
              <span className="text-[10px] sm:text-xs">ΣΧΕΔΙΟ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
