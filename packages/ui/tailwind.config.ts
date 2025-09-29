import type { Config } from 'tailwindcss';
import preset from '@cosmic-ui/tokens/tailwind.preset.cjs';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [preset],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
