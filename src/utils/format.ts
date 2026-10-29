/**
 * Converts English digits to Persian digits
 */
export function toPersianDigits(n: number | string): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n
    .toString()
    .replace(/[0-9]/g, (w) => farsiDigits[+w]);
}

/**
 * Formats a number to Persian currency with 3-digit comma separator and 'تومان'
 */
export function formatToman(amount: number): string {
  const formatted = amount.toLocaleString('en-US');
  return `${toPersianDigits(formatted)} تومان`;
}

/**
 * Format pure number with commas in Persian
 */
export function formatPersianNumber(n: number): string {
  return toPersianDigits(n.toLocaleString('en-US'));
}
