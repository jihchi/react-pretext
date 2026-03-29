import type { ReactNode, RefObject, CSSProperties } from 'react';

export interface PretextRenderProps {
  /** Ref to attach to your text container element */
  ref: RefObject<HTMLElement | null>;

  /** Calculated total height in pixels */
  height: number;

  /** Number of text lines */
  lineCount: number;

  /** Width used for calculation (container width) */
  width: number;

  /** True after first measurement completes */
  isReady: boolean;
}

export interface PretextProps {
  /** The text content to measure and display */
  text: string;

  /** Font specification (CSS font shorthand). Defaults to inherited font */
  font?: string;

  /** Line height in pixels. Defaults to inherited line-height */
  lineHeight?: number;

  /** Whitespace handling mode */
  whiteSpace?: 'normal' | 'pre-wrap';

  /** CSS class for simple mode wrapper */
  className?: string;

  /** Inline styles for simple mode wrapper */
  style?: CSSProperties;

  /** Render prop for custom rendering with full control */
  children?: (renderProps: PretextRenderProps) => ReactNode;
}
