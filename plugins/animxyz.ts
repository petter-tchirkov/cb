import VueAnimXyz from '@animxyz/vue3'
import '@animxyz/core'

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.use(VueAnimXyz)
})
