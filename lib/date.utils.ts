/**
 * Formats a date string for display (e.g., "Jan 30, 2026").
 */
export function formatDate(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
