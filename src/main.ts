import { setupGlobalDirectives } from '@/directives'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
import '@/composables/use-websocket'

const app = createApp(App)

setupStore(app)

setupGlobalDirectives(app)

setupRouter(app)

app.mount('#app')
