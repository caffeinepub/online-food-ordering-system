/**
 * Formats a price stored as minor units (integer/BigInt, divided by 100) as INR currency
 * @param priceInMinorUnits - Price in minor units (e.g., 25000 for ₹250.00)
 * @returns Formatted currency string with INR symbol (e.g., "₹250.00")
 */
export function formatINR(priceInMinorUnits: number | bigint): string {
  const priceInMajorUnits = Number(priceInMinorUnits) / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceInMajorUnits);
}
