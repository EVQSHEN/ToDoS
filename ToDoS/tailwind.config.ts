import { nextui } from '@nextui-org/theme';
/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        custom: {
          green: '#C4D3D1',
          white: '#E9E9E9',
          pink: '#C8A1D6',
          black: '#181818',
          gray: '#444444',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
      prefix: 'nextui',
      defaultTheme: 'light',
      defaultExtendTheme: 'light',
      layout: {},
      themes: {
        light: {
          layout: {},
          colors: {
            background: '#FFFFFF',
            content2: '#FBFBFB',
            content3: '#FFFFFF',
            content4: '#181818',
            ...(true ? { selectTriggerBackground: '#E9E9E9' } : {}),
          },
        },
        dark: {
          layout: {},
          colors: {
            background: '#181818',
            content2: '#181818',
            content3: '#262629',
            content4: '#E9E9E9',
            ...(true ? { selectTriggerBackground: '#262629' } : {}),
          },
        },
      },
    }),
  ],
};
export default config;
