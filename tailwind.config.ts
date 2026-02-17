import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#029058', dark: '#016e43', light: '#03b96f' },
        accent: '#FFD700',
        dark: '#1a1a2e',
        surface: '#f5f7fa',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        pill: '50px',
      },
    },
  },
  plugins: [],
}
export default config
