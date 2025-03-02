import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import createPermissionGuard from './guard'
import { routes } from './routes'

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
