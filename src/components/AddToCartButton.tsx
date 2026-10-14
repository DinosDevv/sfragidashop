"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";
import Icon from "./Icon";

const FEEDBACK_MS = 1500;

export default function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  // Timestamp of the last click (0 = idle), so repeat clicks restart the feedback timer.
  const [addedAt, setAddedAt] = useState(0);
  const added = addedAt > 0;

  useEffect(() => {
    if (!addedAt) return;
    const timer = setTimeout(() => setAddedAt(0), FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [addedAt]);

  // Next.js keeps pages you leave alive in a hidden <Activity>, which cancels the timer above
  // but keeps state. Reset here so the button isn't stuck on "added" when you come back.
  useLayoutEffect(() => () => setAddedAt(0), []);

  const handleClick = () => {
    add(product);
    setAddedAt(Date.now());
  };

  return (
    <button
      onClick={handleClick}
      className={`mt-auto w-full rounded px-4 py-2 text-sm font-medium text-white transition-all active:scale-95 ${
        added ? "bg-green-600" : "bg-black hover:bg-gray-800"
      }`}
    >
      {added ? (
        <span className="inline-flex items-center gap-1">
          <Icon name="check" className="h-4 w-4" />
          Προστέθηκε
        </span>
      ) : (
        "Στο καλάθι"
      )}
    </button>
  );
}
