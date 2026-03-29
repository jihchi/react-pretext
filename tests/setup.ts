import { GlobalRegistrator } from '@happy-dom/global-registrator';
import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vite-plus/test';

GlobalRegistrator.register({
  url: 'http://localhost/',
});

globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

afterEach(() => {
  vi.clearAllMocks();
});
