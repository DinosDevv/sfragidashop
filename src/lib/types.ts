export type CategorySlug = "sfragides" | "aftokollita" | "tampelakia" | "vraveia" | "rouxa";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: CategorySlug;
  price: number; // in cents
  salePrice?: number; // in cents
  imageUrl?: string;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};
