// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Counter Bat',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-icon',
    'nuxt-lodash',
  ],
  css: ['~/assets/css/index.scss'],
  ssr: false,
  plugins: [
    '~/plugins/animxyz.ts',
    { src: '~/plugins/notifications.client.ts', mode: 'client' },
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
})
