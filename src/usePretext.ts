import { useState, useEffect, useRef, useCallback } from 'react';
import type { RefObject } from 'react';
import { prepare, layout } from '@chenglou/pretext';
import { getComputedFont, getComputedLineHeight, debounce, waitForFonts } from './utils.js';

interface UsePretextOptions {
  text: string;
  ref: RefObject<HTMLElement | null>;
  font?: string;
  lineHeight?: number;
  whiteSpace?: 'normal' | 'pre-wrap';
}

interface PretextMetrics {
  height: number;
  lineCount: number;
  width: number;
  isReady: boolean;
}

export function usePretext({
  text,
  ref,
  font,
  lineHeight: lineHeightProp,
  whiteSpace = 'normal',
}: UsePretextOptions): PretextMetrics {
  const [metrics, setMetrics] = useState<PretextMetrics>({
    height: 0,
    lineCount: 0,
    width: 0,
    isReady: false,
  });

  // Cache for prepare results
  const prepareCache = useRef<Map<string, ReturnType<typeof prepare>>>(new Map());

  const calculateMetrics = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    const width = element.offsetWidth;
    if (width === 0) return;

    // Use provided font or get computed
    const fontValue = font || getComputedFont(element);

    // Use provided lineHeight or get computed
    const lineHeightValue = lineHeightProp || getComputedLineHeight(element);

    // Cache key includes text, font, and whiteSpace
    const cacheKey = `${text}::${fontValue}::${whiteSpace}`;

    let prepared = prepareCache.current.get(cacheKey);
    if (!prepared) {
      prepared = prepare(text, fontValue, { whiteSpace });
      prepareCache.current.set(cacheKey, prepared);
    }

    const result = layout(prepared, width, lineHeightValue);

    setMetrics({
      height: result.height,
      lineCount: result.lineCount,
      width,
      isReady: true,
    });
  }, [text, font, lineHeightProp, whiteSpace, ref]);

  // Debounced calculate for resize
  const debouncedCalculate = useRef(debounce(calculateMetrics, 16)).current;

  useEffect(() => {
    // Wait for fonts then calculate
    void waitForFonts().then(() => {
      calculateMetrics();
    });
  }, [calculateMetrics]);

  // Watch for resize
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      debouncedCalculate();
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, debouncedCalculate]);

  return metrics;
}
