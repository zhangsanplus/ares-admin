/**
 * v-input-trim
 * 输入框去两端空格指令（失焦时处理）
 * @example <el-input v-model="value" v-input-trim />
 */

import type { Directive } from 'vue'

type InputElement = HTMLInputElement | HTMLTextAreaElement

interface TrimDirectiveElement extends HTMLElement {
  _opts?: {
    inputEl: InputElement
    handler: (event: Event) => void
  }
}

const inputTrim: Directive<TrimDirectiveElement> = {
  mounted(el) {
    const inputEl = getInputElement(el)
    if (!inputEl) return

    const handler = (event: Event) => {
      const target = event.target as InputElement
      const trimmedValue = target.value.trim()

      // 如果有变化，则更新值并触发输入事件
      if (target.value !== trimmedValue) {
        target.value = trimmedValue
        dispatchInputEvent(target)
      }
    }

    inputEl.addEventListener('change', handler, true)
    // inputEl.addEventListener('blur', handler, true)

    el._opts = {
      inputEl,
      handler,
    }
  },
  beforeUnmount(el) {
    const ctx = el._opts
    if (ctx) {
      ctx.inputEl.removeEventListener('change', ctx.handler, true)
      // ctx.inputEl.removeEventListener('blur', ctx.handler, true)
      delete el._opts
    }
  },
}

function getInputElement(el: HTMLElement): InputElement | null {
  // 优先检查自身是否为输入元素
  if (isInputElement(el)) return el
  // 深度搜索首个输入元素
  return el.querySelector('input, textarea')
}

function isInputElement(el: HTMLElement): el is InputElement {
  return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'
}

// 派发输入事件（兼容Vue响应系统）
function dispatchInputEvent(el: InputElement) {
  const event = new InputEvent('input', {
    bubbles: true,
    cancelable: true,
  })
  el.dispatchEvent(event)
}

export default inputTrim
