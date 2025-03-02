import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

function setupStore(app: App) {
  app.use(store)
}

export { setupStore }
