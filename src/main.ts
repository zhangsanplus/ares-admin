import '@/styles/index.scss'
import { createApp } from 'vue'
import { setupGlobalComponents } from '@/components'
import { setupGlobalDirectives } from '@/directives'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import App from './App.vue'
import 'virtual:svg-icons-register'

const app = createApp(App)
// 配置 store
setupStore(app)
// 注册全局组件
setupGlobalComponents(app)
// 注册全局指令
setupGlobalDirectives(app)
// 配置路由
setupRouter(app)
// 挂载
app.mount('#app')