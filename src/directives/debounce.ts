/**
 * v-debounce
 * 事件防抖指令（在一定时间内，多次触发事件后，只执行最后一次事件）
 * @example <button v-debounce="handleClick">点击</button>
 * @example <button v-debounce:1000="handleClick">点击</button>
 * @example <input v-debounce.input="handleInput" />
 * @example <div v-debounce:1000.scroll="handleClick">滚动</div>
 */

import type { Directive } from 'vue'

type EventType = keyof HTMLElementEventMap
type DebounceHandler = (ev: Event) => void

interface DebounceElement extends HTMLElement {
  _opts?: {
    handler: DebounceHandler
    event: EventType
    timer?: ReturnType<typeof setTimeout>
    delay: number
  }
}

const DEFAULT_DELAY = 1000
const SUPPORTED_EVENTS: EventType[] = [
  'click',
  'input',
  'scroll',
  'mousemove',
  'keydown',
  'touchmove',
  'wheel',
  'resize',
]

const debounce: Directive<DebounceElement> = {
  mounted(el, binding) {
    if (typeof binding.value !== 'function') {
      console.warn('[v-debounce] 的值必须绑定函数')
      return
    }

    const delay = Math.max(Number.parseInt(binding.arg || '', 10) || DEFAULT_DELAY, 100)
    const event = SUPPORTED_EVENTS.find(k => binding.modifiers[k]) || 'click'
    const handler = createDebounceHandler(el, binding.value, delay)

    el._opts = {
      handler,
      delay,
      event,
    }

    // 添加事件监听（passive模式优化滚动性能）
    const passive = isPassiveEvent(event)
    el.addEventListener(event, handler, { passive })
  },

  beforeUnmount(el) {
    const ctx = el._opts
    if (ctx) {
      el.removeEventListener(ctx.event, ctx.handler)
      if (ctx.timer) clearTimeout(ctx.timer)
      delete el._opts
    }
  },
}

// 创建防抖处理函数
function createDebounceHandler(
  el: DebounceElement,
  fn: DebounceHandler,
  delay: number,
) {
  return function (this: HTMLElement, event: Event) {
    const ctx = el._opts!
    const execute = () => fn.call(this, event)

    // 清除之前的定时器，重新开始等待
    if (ctx.timer) {
      clearTimeout(ctx.timer)
    }

    // 设置新的定时器，等待延迟时间后执行函数
    ctx.timer = setTimeout(execute, delay)
  }
}

// 判断是否使用 passive 模式
function isPassiveEvent(event: EventType): boolean {
  return ['scroll', 'touchmove', 'wheel'].includes(event)
}

export default debounce
