// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Counter Bat',
        },
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-icon',
        '@vueuse/nuxt',
        '@pinia/nuxt',
        'nuxt-icon',
    ],
    css: ['~/assets/css/index.scss'],
    ssr: false,
    plugins: [
        '~/plugins/animxyz.ts',
        { src: '~/plugins/notifications.client.ts', mode: 'client' },
    ]
})
