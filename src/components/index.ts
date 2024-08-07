import XCard from './x-card/index.vue'
import XQueryForm from './x-query-form/index.vue'
import XSpace from './x-space/index.vue'
import XTable from './x-table'
import type { App, Component } from 'vue'

const components: Record<string, Component> = {
  XSpace,
  XTable,
  XCard,
  XQueryForm,
}

export function setupGlobalComponents(app: App) {
  Object.keys(components).forEach((key) => {
    app.component(key, components[key])
  })
}
