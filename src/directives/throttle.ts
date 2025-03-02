/**
 * v-throttle
 * 事件节流指令（在一定时间内，只允许函数执行一次）
 * @example <button v-throttle="handleClick">点击</button>
 * @example <button v-throttle:click="handleClick">点击</button>
 * @example <input v-throttle.input="handleInput" />
 * @example <div v-throttle:300.scroll="handleScroll">滚动</div>
 */

import type { Directive } from 'vue'

type EventType = keyof HTMLElementEventMap
type ThrottleHandler = (ev: Event) => void

interface ThrottleElement extends HTMLElement {
  _opts?: {
    handler: ThrottleHandler
    event: EventType
    lastTime: number
    delay: number
    timer?: ReturnType<typeof setTimeout>
  }
}

// 默认配置
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

const throttle: Directive<ThrottleElement> = {
  mounted(el, binding) {
    if (typeof binding.value !== 'function') {
      console.warn('[v-throttle] 的值必须绑定函数')
      return
    }

    const delay = Math.max(Number.parseInt(binding.arg || '', 10) || DEFAULT_DELAY, 100)
    const event = Object.keys(binding.modifiers)
      .find(k => SUPPORTED_EVENTS.includes(k as EventType)) as EventType || 'click'
    const handler = createThrottleHandler(el, binding.value, delay)

    el._opts = {
      handler,
      delay,
      event,
      lastTime: 0,
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

// 创建节流处理函数
function createThrottleHandler(
  el: ThrottleElement,
  fn: ThrottleHandler,
  delay: number,
) {
  return function (this: HTMLElement, event: Event) {
    const ctx = el._opts!
    const execute = () => fn.call(this, event)
    const now = Date.now()
    const timeDiff = now - ctx.lastTime

    // 如果时间差大于等于延迟时间，立即执行
    if (timeDiff >= delay) {
      execute()
      ctx.lastTime = now
    } else {
      // 否则，使用定时器延迟执行
      if (ctx.timer) clearTimeout(ctx.timer)
      ctx.timer = setTimeout(() => {
        execute()
        ctx.lastTime = Date.now()
      }, delay - timeDiff)
    }
  }
}

// 判断是否使用 passive 模式
function isPassiveEvent(event: EventType): boolean {
  return ['scroll', 'touchmove', 'wheel'].includes(event)
}

export default throttle
