// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'ReChip',
      link: [{ rel: 'icon', type: 'image/ico', href: '/favicon.ico' }],
      htmlAttrs: {
        lang: 'ru'
      }
    }
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL
    }
  },
  css: ['~/src/assets/main.css', 'primeicons/primeicons.css', 'primevue/resources/themes/aura-light-blue/theme.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  dir: {
    assets: 'src/assets',
    public: 'public',
    plugins: 'src/plugins',
    pages: 'src/pages',
    layouts: 'src/layouts',
    middleware: 'src/middleware'
  },
  components: ['src/components'],
  modules: [
    '@pinia/nuxt',
    'nuxt-primevue',
    '@nuxt/image',
    'nuxt-swiper',
    '@nuxt/content'
  ],
  image: {
    format: ['webp', 'png', 'jpeg', 'jpg']
  },
  primevue: {
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    options: {
      ripple: true,
      inputStyle: 'filled'
    }
  }
})
