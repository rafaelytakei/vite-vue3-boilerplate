import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import '@unocss/reset/tailwind.css'
import 'uno.css'

// @ts-ignore: globEager is a Vite-only feature
const plugins = import.meta.globEager('./plugins/*.js')
export const app = createApp(App)

// Router setup (vue-router)
app.use(router)

// Store setup (pinia)
const pinia = createPinia()

// Set here which stores should be persisted
const storesToPersist = ['auth']

// Handling recovery of persisted data
if (localStorage.getItem('piniaState')) {
  const dataFromLocalStorage = JSON.parse(
    localStorage.getItem('piniaState') || '{}'
  )
  console.log(dataFromLocalStorage)
  for (const store of storesToPersist) {
    if (dataFromLocalStorage[store]) {
      pinia.state.value = {
        ...pinia.state.value,
        [store]: {
          ...dataFromLocalStorage[store],
        },
      }
    }
  }
}
app.use(pinia)
watch(
  pinia.state,
  (state: any) => {
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
// Apply plugin
for (const plugin in plugins) {
  app.use(plugins[plugin].default)
}
// Mounting the app
app.mount('#app')
