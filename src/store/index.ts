import { createPinia } from 'pinia'
import type { App } from 'vue'

const store = createPinia()

function setupStore(app: App) {
  app.use(store)
}

export { setupStore }
