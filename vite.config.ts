import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    dts: true,
    exports: true,
    sourcemap: true,
    format: ['esm', 'cjs'],
    deps: {
      neverBundle: ['react', 'react-dom', '@chenglou/pretext'],
    },
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    singleQuote: true,
    semi: true,
    sortPackageJson: true,
  },
  test: {
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
});
