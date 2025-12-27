/**
 * Format a number as currency (Nigerian Naira)
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount = 0, currency = 'NGN'): string {
  const localeMap: Record<typeof currency, string> = {
    NGN: 'en-NG',
    GBP: 'en-GB',
    USD: 'en-US',
  };

  return new Intl.NumberFormat(localeMap[currency], {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
