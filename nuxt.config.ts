// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'ReChip',
      link: [{ rel: 'icon', sizes: 'any', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [
        {
          name: 'google-site-verification',
          content: 'O1q7nJ-7mG9rRCYNpu90E94ufHwvL91-IaAuYPfT-zo'
        },

        {
          name: 'yandex-verification',
          content: '1b1183457f6a32d2'
        }
      ],
      htmlAttrs: {
        lang: 'ru'
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      activeCity: process.env.NUXT_PUBLIC_ACTIVE_CITY
    }
  },
  css: ['~/src/assets/main.css', 'primeicons/primeicons.css', 'primevue/resources/themes/aura-light-blue/theme.css', 'vue3-toastify/dist/index.css'],
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
    '@nuxt/content',
    'vue-yandex-maps/nuxt',
    '@zadigetvoltaire/nuxt-gtm',
    'nuxt-yandex-metrika'
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
  },
  yandexMaps: {
    apikey: '8c4059db-3b8d-4535-a15e-569ee80fc827'
  },
  yandexMetrika: {
    id: '99593017',
    options: {
      webvisor: true
    }
  },
  // @ts-ignore
  gtm: {
    id: 'GTM-VW4EWTMR2M'
  }
})
