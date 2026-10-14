import type { Category } from "./types";

export const categories: Category[] = [
  { slug: "sfragides", name: "Σφραγίδες", description: "Αυτομελανούμενες και ξύλινες σφραγίδες" },
  { slug: "aftokollita", name: "Αυτοκόλλητα", description: "Ετικέτες και αυτοκόλλητα κάθε σχήματος" },
  { slug: "tampelakia", name: "Ταμπελάκια", description: "Ταμπέλες γραφείου, πόρτας και σήμανσης" },
  { slug: "vraveia", name: "Βραβεία", description: "Πλακέτες, κύπελλα και τιμητικές διακρίσεις" },
  { slug: "rouxa", name: "Ρούχα", description: "Μπλουζάκια, φούτερ και καπέλα με στάμπα ή κέντημα" },
];

export function getCategory(slug: string): Category | null {
  return categories.find((c) => c.slug === slug) ?? null;
}
