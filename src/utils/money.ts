export function formatMoney(cents: number): string {
  return (Math.abs(cents) / 100).toFixed(2);
}
