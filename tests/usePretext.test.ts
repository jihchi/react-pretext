import { describe, it, expect, vi } from 'vite-plus/test';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { usePretext } from '../src/usePretext.js';

vi.mock('@chenglou/pretext', () => ({
  prepare: vi.fn((text: string) => ({ text, cached: true })),
  layout: vi.fn(() => ({ height: 100, lineCount: 5 })),
}));

describe('usePretext', () => {
  it('should calculate height when ref is attached', async () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      const metrics = usePretext({
        text: 'Hello world',
        ref,
        font: '16px Arial',
        lineHeight: 24,
      });
      return { ref, metrics };
    });

    expect(result.current.metrics.isReady).toBe(false);
    expect(result.current.metrics.height).toBe(0);
  });
});
