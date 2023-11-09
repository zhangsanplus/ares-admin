/**
 * v-copy="some text"
 * v-copy.contextmenu.prevent="some text"
 * 文本复制指令
 * 支持右键复制
 */

import { copyText } from '@/utils'
import type { Directive, DirectiveBinding } from 'vue'

interface ElType extends HTMLElement {
  __copyText__?: string
  __handleCopy__?: (evt: Event) => void
}

type BindingType = DirectiveBinding<string>

const copy: Directive = {
  mounted(el: ElType, binding: BindingType) {
    const { prevent, contextmenu } = binding.modifiers

    el.__copyText__ = binding.value
    el.__handleCopy__ = (evt: Event) => {
      if (prevent) {
        evt.preventDefault()
      }
      copyText(el.__copyText__!)
    }

    if (contextmenu) {
      el.addEventListener('contextmenu', el.__handleCopy__)
    } else {
      el.addEventListener('click', el.__handleCopy__)
    }
  },

  // 监听 v node 变化后重新获取value
  updated(el: ElType, { value }: BindingType) {
    el.__copyText__ = value
  },

  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.__handleCopy__ as any)
    el.removeEventListener('contextmenu', el.__handleCopy__ as any)
  },
}

export default copy
