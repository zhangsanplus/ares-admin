import type { Directive } from 'vue'

type InputElement = HTMLInputElement | HTMLTextAreaElement

interface NumberDirectiveElement extends HTMLElement {
  _opts?: {
    inputEl: InputElement
    inputHandler: (event: Event) => void
    compositionStartHandler: (event: Event) => void
    compositionEndHandler: (event: Event) => void
  }
}

interface NumberDirectiveOptions {
  allowDecimal?: boolean
  decimalPlaces?: number
  allowNegative?: boolean
}

const inputNumber: Directive<NumberDirectiveElement> = {
  mounted(el, binding) {
    const inputEl = getInputElement(el)
    if (!inputEl) return

    // 配置合并默认值
    const config = {
      allowNegative: false,
      allowDecimal: true,
      decimalPlaces: 3,
      ...binding.value,
    }

    // 输入事件处理
    const handler = () => {
      const value = inputEl.value
      const newValue = formatInitialValue(inputEl, config)

      // 如果有变化，则更新值并触发输入事件
      if (value !== newValue) {
        inputEl.value = newValue
        dispatchInputEvent(inputEl)
      }
    }

    // 处理中文输入
    let isComposing = false

    const compositionStartHandler = () => {
      isComposing = true
    }

    const compositionEndHandler = () => {
      isComposing = false
      handler()
    }

    const inputHandler = () => {
      if (!isComposing) {
        handler()
      }
    }

    inputEl.addEventListener('input', inputHandler)
    inputEl.addEventListener('compositionstart', compositionStartHandler)
    inputEl.addEventListener('compositionend', compositionEndHandler)

    // 保存事件处理函数
    el._opts = {
      inputEl,
      inputHandler,
      compositionStartHandler,
      compositionEndHandler,
    }
  },

  beforeUnmount(el) {
    const ctx = el._opts
    if (ctx) {
      ctx.inputEl.removeEventListener('input', ctx.inputHandler)
      ctx.inputEl.removeEventListener('compositionstart', ctx.compositionStartHandler)
      ctx.inputEl.removeEventListener('compositionend', ctx.compositionEndHandler)
      delete el._opts
    }
  },
}

function formatInitialValue(inputEl: InputElement, options: NumberDirectiveOptions) {
  let value = inputEl.value

  // 移除所有非数字字符（允许一个负号和一个小数点）
  value = value.replace(/[^\d.-]/g, '')

  // 处理前导零, 如 00123 => 123
  if (value.startsWith('-')) {
    value = `-${value.slice(1).replace(/^0+/, '')}`
  } else {
    value = value.replace(/^0+/, '')
  }

  // 处理负号
  if (options.allowNegative) {
    value = value.replace(/^-+/, '-')
  } else {
    value = value.replace(/-/g, '')
  }

  // 处理小数点
  if (options.allowDecimal) {
    const [integer, decimal] = value.split('.')
    value = decimal !== undefined
      ? `${integer}.${decimal.slice(0, options.decimalPlaces)}`
      : integer
  } else {
    value = value.replace(/\./g, '')
  }

  return value
}

function getInputElement(el: HTMLElement): InputElement | null {
  if (isInputElement(el)) return el
  return el.querySelector('input, textarea')
}

function isInputElement(el: HTMLElement): el is InputElement {
  return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'
}

// 派发输入事件
function dispatchInputEvent(el: InputElement) {
  const event = new InputEvent('input', {
    bubbles: true,
    cancelable: true,
  })
  el.dispatchEvent(event)
}

export default inputNumber
