import { createRouter, createWebHashHistory } from 'vue-router'
import createPermissionGuard from './guard'
import { routes } from './routes'
import type { App } from 'vue'

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

function setupRouter(app: App) {
  app.use(router)
  createPermissionGuard(router)
}

export { router, setupRouter }
