import type { Config } from 'tailwindcss';

import { skeleton } from '@skeletonlabs/tw-plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    skeleton({
      themes: {
        preset: [{ name: 'sahara', enhancements: true }],
      },
    }),
  ],
};
export default config;
