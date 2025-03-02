import { useLocalStorage } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'

/**
 * 合并历史数据
 * @param storageValue 本地数据
 * @param defaultValue 默认数据
 * @returns Array
 */
function mergeColumn(storageValue: XTableColumn[], defaultValue: XTableColumn[]) {
  return defaultValue.map((col) => {
    const old = storageValue.find((i) => {
      if (col.prop) return i.prop === col.prop
      if (col.type) return i.type === col.type
      return false
    })

    if (old) {
      const { hidden, width } = old
      return { ...col, hidden, width }
    }
    return { ...col }
  })
}

/**
 * 自定义列数据本地化
 */
export default function useLocalColumns(key: string, initialValue: XTableColumn[]) {
  const storageValue = useLocalStorage<XTableColumn[]>(`x-cols-${key}`, [])
  const columns = ref(mergeColumn(storageValue.value, initialValue))

  function reset() {
    columns.value = cloneDeep(initialValue)
  }

  function updateStorageValue() {
    storageValue.value = columns.value.map((i) => {
      return {
        type: i.type,
        prop: i.prop,
        width: i.width,
        hidden: i.hidden,
      }
    })
  }

  watch(
    columns,
    () => updateStorageValue(),
    { deep: true },
  )

  return {
    columns,
    reset,
  }
}
