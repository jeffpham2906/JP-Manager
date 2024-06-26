// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  pages: true,
  ssr: false,
  css: ['~/assets/css/main.css', '~/assets/css/animation.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    app: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      base_url: 'http://localhost:3000/',
    },
  },
  i18n: {
    langDir: 'lang/',
    locales: [
      {
        code: 'en',
        name: 'english',
        file: 'en.ts',
      },
      {
        code: 'vi',
        name: 'vietnamese',
        file: 'vi.ts',
      },
    ],
    strategy: 'no_prefix',
    defaultLocale: 'vi',
    vueI18n: './i18n.config.ts',
  },
  modules: ['nuxt-icon', '@pinia/nuxt', '@nuxtjs/i18n'],
  pinia: {
    storesDirs: ['./stores/**'],
  },

  components: [
    { path: '~/components/Common', pathPrefix: false },
    '~/components',
  ],
  build: {
    transpile: ['@nuxt/typescript-build', '@vuepic/vue-datepicker'],
  },
})
