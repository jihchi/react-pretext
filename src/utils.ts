/**
 * Get computed font string from an element
 */
export function getComputedFont(element: HTMLElement): string {
  const styles = window.getComputedStyle(element);
  return styles.font;
}

/**
 * Get computed line height in pixels
 */
export function getComputedLineHeight(element: HTMLElement): number {
  const styles = window.getComputedStyle(element);
  const lineHeight = parseFloat(styles.lineHeight);

  // If line-height is 'normal', estimate (usually ~1.2 * fontSize)
  if (isNaN(lineHeight)) {
    const fontSize = parseFloat(styles.fontSize);
    return fontSize * 1.2;
  }

  // lineHeight can be a number (multiplier) or px value
  if (lineHeight < 10) {
    // Assume it's a multiplier
    const fontSize = parseFloat(styles.fontSize);
    return fontSize * lineHeight;
  }

  return lineHeight;
}

/**
 * Simple debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Wait for fonts to be ready
 */
export async function waitForFonts(): Promise<void> {
  if (typeof document !== 'undefined' && 'fonts' in document) {
    await document.fonts.ready;
  }
}
