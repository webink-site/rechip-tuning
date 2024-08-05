import Vue3Toastify, { toast } from 'vue3-toastify'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, { autoClose: 2000, theme: 'colored' })
  return {
    provide: { toast }
  }
})
