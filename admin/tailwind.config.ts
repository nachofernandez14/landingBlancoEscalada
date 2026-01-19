import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C46A4A',
        secondary: '#B87333',
        accent: '#9E553A',
        sand: '#EDE6D8',
        cream: '#FAF8F4',
      },
    },
  },
  plugins: [],
} satisfies Config
