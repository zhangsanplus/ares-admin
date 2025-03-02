/**
 * v-copy
 * 文本复制指令
 * @example <div v-copy="some text">复制</div>
 * @example <div v-copy.contextmenu.prevent="some text">右键复制</div>
 */
import type { Directive } from 'vue'
import { copyText } from '@/utils'

interface CopyDirectivesElement extends HTMLElement {
  _opts?: {
    event: string
    text: string
    handler: (evt: Event) => void
  }
}

const copy: Directive<CopyDirectivesElement> = {
  mounted(el, binding) {
    const { prevent, contextmenu } = binding.modifiers
    const text = binding.value

    if (!text) return

    const handler = (evt: Event) => {
      if (prevent) evt.preventDefault()
      copyText(text)
    }

    const event = contextmenu ? 'contextmenu' : 'click'
    el.addEventListener(event, handler)

    el._opts = {
      handler,
      text,
      event,
    }
  },

  // vnode变化后重新获取value
  updated(el, binding) {
    const text = binding.value
    if (el._opts) {
      el._opts.text = text
    }
  },

  beforeUnmount(el) {
    const ctx = el._opts
    if (ctx) {
      el.removeEventListener(ctx.event, ctx.handler)
      delete el._opts
    }
  },
}

export default copy
