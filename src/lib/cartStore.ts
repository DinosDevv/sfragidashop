import type { CartItem } from "./types";

const STORAGE_KEY = "cart";
const EMPTY: CartItem[] = [];

let items: CartItem[] | null = null;
const listeners = new Set<() => void>();

function load(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function getSnapshot(): CartItem[] {
  if (items === null) items = load();
  return items;
}

export function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setItems(update: (prev: CartItem[]) => CartItem[]) {
  items = update(getSnapshot());
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
  listeners.forEach((l) => l());
}
