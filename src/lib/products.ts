import type { CategorySlug, Product } from "./types";

// Mock data — replace these functions with Supabase queries later.
const products: Product[] = [
  { id: "1", name: "Αυτομελανούμενη σφραγίδα", description: "Σφραγίδα με ενσωματωμένο μελάνι, ιδανική για καθημερινή χρήση.", category: "sfragides", price: 1800, salePrice: 1400 },
  { id: "2", name: "Ξύλινη σφραγίδα", description: "Κλασική ξύλινη σφραγίδα με χαραγμένο σχέδιο της επιλογής σας.", category: "sfragides", price: 1200 },
  { id: "3", name: "Αυτοκόλλητα logo (100 τεμ.)", description: "Αυτοκόλλητα με το λογότυπό σας σε υψηλή ανάλυση.", category: "aftokollita", price: 2500, salePrice: 1900 },
  { id: "4", name: "Ετικέτες διευθύνσεων", description: "Ετικέτες αποστολής με τα στοιχεία σας.", category: "aftokollita", price: 900 },
  { id: "5", name: "Ταμπελάκι πόρτας plexiglass", description: "Κομψό ταμπελάκι πόρτας από plexiglass.", category: "tampelakia", price: 2200 },
  { id: "6", name: "Ταμπελάκι γραφείου", description: "Ταμπελάκι ονόματος για το γραφείο σας.", category: "tampelakia", price: 1600, salePrice: 1200 },
  { id: "7", name: "Πλακέτα βράβευσης", description: "Ξύλινη πλακέτα με μεταλλική επιγραφή.", category: "vraveia", price: 3500 },
  { id: "8", name: "Κρυστάλλινο βραβείο", description: "Κρυστάλλινο βραβείο με χάραξη laser.", category: "vraveia", price: 5900, salePrice: 4900 },
  { id: "9", name: "Μπλουζάκι με στάμπα", description: "Βαμβακερό t-shirt με το δικό σας σχέδιο ή λογότυπο.", category: "rouxa", price: 1500 },
  { id: "10", name: "Φούτερ με κέντημα", description: "Ζεστό φούτερ με κεντημένο λογότυπο.", category: "rouxa", price: 3500 },
  { id: "11", name: "Καπέλο jockey με κέντημα", description: "Ρυθμιζόμενο καπέλο με κέντημα της επιλογής σας.", category: "rouxa", price: 1200 },
];

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(id: string): Promise<Product | null> {
  return products.find((p) => p.id === id) ?? null;
}

export async function getProductsByCategory(category: CategorySlug): Promise<Product[]> {
  return products.filter((p) => p.category === category);
}

export async function getSaleProducts(): Promise<Product[]> {
  return products.filter((p) => p.salePrice !== undefined);
}
