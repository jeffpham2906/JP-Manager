/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    screens: {
      tablet: { max: '928px' },
      // => @media (min-width: 640px) { ... }
    },
    extend: {
      colors: {
        blossom: {
          50: '#fcf4f5',
          100: '#f9eaec',
          200: '#f4d7dd',
          300: '#e8b0ba',
          400: '#de8e9e',
          500: '#cd667d',
          600: '#b74765',
          700: '#993754',
          800: '#81304a',
          900: '#6f2c45',
          950: '#3d1422',
        },
        primary: '#FF9F43',
        secondary: '#092C4C',
        warning: '#FF9900',
        info: '#17a2b8',
        success: '#28C76F',
        danger: '#FF0000',
        light: '#f8f9fa',
        dark: '#29344a',
      },
    },
  },
  plugins: [],
}
