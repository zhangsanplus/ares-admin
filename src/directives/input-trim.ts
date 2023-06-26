/**
 * v-input-trim
 * 输入框去两端空格指令
 * <el-input v-model="value" v-input-trim />
*/

import type { Directive } from 'vue'

interface ElType extends HTMLElement {
  inputEl?: HTMLInputElement | HTMLTextAreaElement
  __handle__?: (event: Event) => void
}

const inputTrim: Directive = {
  mounted(el: ElType) {
    const inputEl = getInput(el)
    if (!inputEl) return

    el.inputEl = inputEl
    el.__handle__ = function (event: Event) {
      const value = (event.target as HTMLInputElement).value
      const newValue = value.replace(/^\s+|\s+$/g, '')
      if (value !== newValue) {
        (event.target as HTMLInputElement).value = newValue
        dispatchEvent(inputEl!, 'input')
      }
    }
    el.inputEl.addEventListener('change', el.__handle__, true)
  },
  beforeUnmount(el: ElType) {
    el.inputEl?.removeEventListener('change', el.__handle__ as any, true)
  },
}

function getInput(el: HTMLElement): HTMLInputElement | HTMLTextAreaElement | null {
  if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
    return el as HTMLInputElement | HTMLTextAreaElement
  }
  return el.getElementsByTagName('input')[0] || el.getElementsByTagName('textarea')[0]
}

function dispatchEvent(el: HTMLElement, type: string) {
  const inputEvent = new Event(type, { bubbles: true })
  el.dispatchEvent(inputEvent)
}

export default inputTrim