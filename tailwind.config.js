/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#64ffda', // Cyan green accent (developer terminal color)
        },
        text: {
          DEFAULT: '#e6edf3', // Light gray text
          muted: '#8b949e', // Muted gray text
        },
        bg: {
          DEFAULT: '#0d1117', // Very dark background (GitHub dark theme)
        },
      },
    },
  },
  plugins: [],
}
