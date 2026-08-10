/**
 * Consistent date formatting utility for the APYX platform.
 * Always uses "en-US" locale with "Mon DD, YYYY" format.
 *
 * @example formatDate("2026-07-17T23:06:00Z") → "Jul 17, 2026"
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Formats a date with time.
 *
 * @example formatDateTime("2026-07-17T23:06:00Z") → "Jul 17, 2026 · 11:06 PM"
 */
export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart} · ${timePart}`;
}
