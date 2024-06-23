/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'presets/**/*.{js,vue,ts}',
    './src/components/**/*.{js,vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        dark: 'var(--dark)',
        'gray-1': 'var(--gray-1)',
        'gray-2': 'var(--gray-2)',
        'gray-3': 'var(--gray-3)'
      },
      fontSize: {
        '7xl': '42px'
      }
    },
    screens: {
      xxs: '410px',
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1200px'
    }
  },
  plugins: [
    // require('@tailwindcss/forms')
  ]
}
