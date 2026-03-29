import { useRef } from 'react';
import type { ReactNode } from 'react';
import { usePretext } from './usePretext.js';
import type { PretextProps, PretextRenderProps } from './types.js';

export function Pretext({
  text,
  font,
  lineHeight,
  whiteSpace,
  className,
  style,
  children,
}: PretextProps): ReactNode {
  const ref = useRef<HTMLDivElement>(null);

  const metrics = usePretext({
    text,
    ref,
    font,
    lineHeight,
    whiteSpace,
  });

  // Render prop mode
  if (children) {
    const renderProps: PretextRenderProps = {
      ref,
      ...metrics,
    };
    return children(renderProps) as ReactNode;
  }

  // Simple mode - wrap in div with calculated height
  return (
    <div
      ref={ref}
      className={className}
      style={{
        minHeight: metrics.height,
        ...style,
      }}
    >
      {text}
    </div>
  );
}
