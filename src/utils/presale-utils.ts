/**
 * Utility functions for pre-sale countdown and expiry checks
 */

// Pre-sale end date: September 20, 2025
export const PRESALE_END_DATE = new Date("2025-09-20T23:59:59Z");

/**
 * Check if the pre-sale has expired
 * @returns boolean indicating if the pre-sale has ended
 */
export function isPreSaleExpired(): boolean {
  const now = new Date().getTime();
  const target = PRESALE_END_DATE.getTime();
  return now >= target;
}

/**
 * Get the time remaining until pre-sale ends
 * @returns object with days, hours, minutes, seconds remaining
 */
export function getTimeUntilExpiry() {
  const now = new Date().getTime();
  const target = PRESALE_END_DATE.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
}
