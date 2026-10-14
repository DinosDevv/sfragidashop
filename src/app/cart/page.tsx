"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import ConfirmDialog from "@/components/ConfirmDialog";
import Icon from "@/components/Icon";

export default function CartPage() {
  const { items, count, total, setQuantity, remove, clear } = useCart();
  const [confirmClear, setConfirmClear] = useState(false);

  // Close the dialog when Next.js hides this page (e.g. browser back while it's open).
  useLayoutEffect(() => () => setConfirmClear(false), []);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="mb-4">Το καλάθι σας είναι άδειο.</p>
        <Link href="/shop" className="underline">Συνέχεια αγορών</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Καλάθι</h1>
      <ul className="divide-y border-y">
        {items.map((item) => (
          <li key={item.productId} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4">
            <span className="w-full font-medium sm:w-auto sm:flex-1">{item.name}</span>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => setQuantity(item.productId, Number(e.target.value))}
              aria-label={`Ποσότητα για ${item.name}`}
              className="w-16 rounded border px-2 py-1"
            />
            <button onClick={() => remove(item.productId)} className="text-sm text-red-600">
              Αφαίρεση
            </button>
            <span className="ml-auto w-24 text-right font-medium">{formatPrice(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => setConfirmClear(true)}
          className="inline-flex items-center gap-1 self-start text-sm text-gray-600 underline hover:text-red-600"
        >
          <Icon name="trash" className="h-4 w-4" />
          Άδειασμα καλαθιού
        </button>
        <div className="sm:text-right">
          <p className="text-lg font-semibold">Σύνολο: {formatPrice(total)}</p>
          <Link href="/checkout" className="mt-2 block w-full rounded bg-black px-6 py-3 text-center text-white hover:bg-gray-800 sm:inline-block sm:w-auto">
            Ολοκλήρωση αγοράς
          </Link>
        </div>
      </div>

      <ConfirmDialog
        open={confirmClear}
        title="Άδειασμα καλαθιού;"
        message={`Θα αφαιρεθούν όλα τα προϊόντα (${count}) από το καλάθι σας. Η ενέργεια δεν μπορεί να αναιρεθεί.`}
        confirmLabel="Ναι, άδειασμα"
        onConfirm={() => {
          setConfirmClear(false);
          clear();
        }}
        onCancel={() => setConfirmClear(false)}
      />
    </div>
  );
}
