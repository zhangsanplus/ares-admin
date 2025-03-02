import useClipboard from 'vue-clipboard3'

/**
 * 空函数
 */
export const noop: Fn = () => {}

/**
 * 延迟函数
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 文本复制
 */
export function copyText(text: string | number, showToast = true) {
  const { toClipboard } = useClipboard()
  toClipboard(`${text}`)
    .then(() => {
      if (showToast) {
        ElMessage.success('复制成功')
      }
    })
    .catch((error: Error) => {
      console.error('copy', error)
    })
}

/**
 * 生成唯一uuid，可以指定长度和基数
 * @param len 长度，默认8
 * @param radix 基数，如2，8，10，16等
 */
export function guid(len = 8, radix?: number) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid: string[] = []
  const rad = radix || chars.length
  for (let i = 0; i < len; i++) {
    uuid[i] = chars[0 | (Math.random() * rad)]
  }
  return uuid.join('')
}
