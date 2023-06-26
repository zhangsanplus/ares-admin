// import auth from './auth'
// import copy from './copy'
// import debounce from './debounce'
// import inputTrim from './input-trim'
// import throttle from './throttle'

// const directives: Record<string, Directive> = {
//   auth,
//   copy,
//   inputTrim,
//   debounce,
//   throttle,
// }

import type { App, Directive } from 'vue'

const modules = import.meta.glob('./*.ts', { import: 'default', eager: true }) as any

export function setupGlobalDirectives(app: App) {
  Object.keys(modules).forEach((key) => {
    const defaultModule = modules[key]
    const name = key.replace(/\.\/(.+)\.ts$/, '$1')
    app.directive(name, defaultModule as Directive)
  })
}
