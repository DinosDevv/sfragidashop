"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import FormField from "@/components/FormField";

const paymentMethods = [
  { value: "cod", label: "Αντικαταβολή" },
  { value: "card", label: "Πιστωτική / χρεωστική κάρτα" },
  { value: "store", label: "Πληρωμή κατά την παραλαβή από το κατάστημα" },
];

export default function CheckoutPage() {
  const { items, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
        <p className="mb-4">Το καλάθι σας είναι άδειο.</p>
        <Link href="/shop" className="underline">Συνέχεια αγορών</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Checkout</h1>
      <form className="grid gap-8 lg:grid-cols-[1fr_360px]" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-8">
          <fieldset>
            <legend className="mb-4 text-lg font-semibold">Στοιχεία αποστολής</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Ονοματεπώνυμο" name="name" autoComplete="name" required className="sm:col-span-2" />
              <FormField label="Email" name="email" type="email" autoComplete="email" required />
              <FormField label="Τηλέφωνο" name="phone" type="tel" autoComplete="tel" required />
              <FormField label="Διεύθυνση" name="address" autoComplete="street-address" required className="sm:col-span-2" />
              <FormField label="Πόλη" name="city" autoComplete="address-level2" required />
              <FormField label="Τ.Κ." name="postalCode" autoComplete="postal-code" required />
              <FormField label="Σημειώσεις παραγγελίας" name="notes" multiline className="sm:col-span-2" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-4 text-lg font-semibold">Τρόπος πληρωμής</legend>
            <div className="space-y-2">
              {paymentMethods.map((m, i) => (
                <label key={m.value} className="flex cursor-pointer items-center gap-3 rounded border p-3 has-checked:border-black">
                  <input type="radio" name="payment" value={m.value} defaultChecked={i === 0} className="accent-black" />
                  {m.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="h-fit rounded-lg border bg-gray-50 p-4 sm:p-6 lg:sticky lg:top-24">
          <h2 className="mb-4 text-lg font-semibold">Η παραγγελία σας</h2>
          <ul className="divide-y text-sm">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-4 py-2">
                <span>
                  {item.name} <span className="text-gray-500">× {item.quantity}</span>
                </span>
                <span className="shrink-0 font-medium">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between border-t pt-4 text-lg font-semibold">
            <span>Σύνολο</span>
            <span>{formatPrice(total)}</span>
          </p>
          <button type="submit" disabled className="mt-4 w-full rounded bg-black px-6 py-3 font-medium text-white disabled:opacity-60">
            Ολοκλήρωση παραγγελίας (σύντομα)
          </button>
          <Link href="/cart" className="mt-3 block text-center text-sm underline">Επιστροφή στο καλάθι</Link>
        </aside>
      </form>
    </div>
  );
}
