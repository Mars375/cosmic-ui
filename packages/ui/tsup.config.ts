import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
    '@radix-ui/react-accordion',
    '@radix-ui/react-avatar',
    '@radix-ui/react-checkbox',
    '@radix-ui/react-dialog',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-popover',
    '@radix-ui/react-radio-group',
    '@radix-ui/react-select',
    '@radix-ui/react-slider',
    '@radix-ui/react-switch',
    '@radix-ui/react-toast',
    '@radix-ui/react-tooltip',
    'class-variance-authority',
    'tailwind-merge',
    'recharts',
    'react-hook-form',
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
    options.platform = 'browser';
    options.target = 'es2020';
  },
});
