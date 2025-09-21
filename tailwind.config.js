// tailwind.config.cjs
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'], // ✅ Especifica explícitamente
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
      },
    fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        heading: ['Poppins', 'sans-serif'], // ← Aquí defines Poppins
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}