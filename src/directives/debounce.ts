/**
 * v-debounce="handleClick"
 * 事件防抖指令
 * 点击停止 0.5s 后才执行
 */

import type { Directive, DirectiveBinding } from 'vue'

interface ElType extends HTMLElement {
  __handleClick__: () => void
}

type BindingType = DirectiveBinding<(...arg: any[]) => void>

const debounce: Directive = {
  mounted(el: ElType, binding: BindingType) {
    if (typeof binding.value !== 'function') {
      throw new TypeError('callback must be a function')
    }

    let timer: NodeJS.Timeout | null = null

    el.__handleClick__ = function () {
      if (timer) {
        clearInterval(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 500)
    }
    el.addEventListener('click', el.__handleClick__)
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.__handleClick__)
  },
}

export default debounce