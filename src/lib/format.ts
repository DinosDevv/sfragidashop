export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("el-GR", { style: "currency", currency: "EUR" }).format(cents / 100);
}
