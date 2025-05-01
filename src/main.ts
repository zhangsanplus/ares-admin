import { createApp } from 'vue'
import { setupGlobalDirectives } from '@/directives'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import App from './App.vue'
import '@/styles/index.scss'

const app = createApp(App)

setupStore(app)
setupGlobalDirectives(app)
setupRouter(app)

app.mount('#app')
