import { describe, it, expect, vi } from 'vite-plus/test';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pretext } from '../src/Pretext.js';

vi.mock('../src/usePretext.js', () => ({
  usePretext: vi.fn(() => ({
    height: 100,
    lineCount: 5,
    width: 200,
    isReady: true,
  })),
}));

describe('Pretext', () => {
  it('renders text in simple mode', () => {
    render(<Pretext text="Hello world" />);
    expect(screen.getByText('Hello world')).toBeVisible();
  });

  it('renders with render prop', () => {
    render(
      <Pretext text="Hello world">
        {({ height, isReady }) => (
          <div data-testid="custom" data-height={height} data-ready={isReady}>
            Hello world
          </div>
        )}
      </Pretext>,
    );

    const custom = screen.getByTestId('custom');
    expect(custom).toHaveAttribute('data-height', '100');
    expect(custom).toHaveAttribute('data-ready', 'true');
  });
});
