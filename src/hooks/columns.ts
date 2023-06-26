/**
 * 合并历史数据
 * @param storageValue 本地数据
 * @param defaultValue 默认数据
 * @returns
 */
function mergeColumns(storageValue: XTableColumn[], defaultValue: XTableColumn[]) {
  return defaultValue.map((col) => {
    const old = storageValue.find(i => i.prop === col.prop)
    const _col = { ...col }
    _col.hidden = old?.hidden ?? _col.hidden
    return _col
  })
}

/**
 * 自定义列数据本地化
 */
export default function useColumns(key: string, initialValue: XTableColumn[]) {
  // 部分项目比较特殊，存储数据较多，可对存储数据进行删除简化
  // 如果没有这类问题的限制，可以直接使用 useStorage 进行合并
  // const columns = useStorage('key', initialValue, {
  //   mergeDefaults: (storageValue, defaults) => deepMerge(defaults, storageValue),
  // })
  // return columns

  const storageValue = useStorage<XTableColumn[]>(`x-cols-${key}`, [])
  const columns = ref(mergeColumns(storageValue.value, initialValue))

  watch(
    columns,
    () => {
      storageValue.value = columns.value.filter(i => !i.type).map((i) => {
        return {
          prop: i.prop,
          hidden: i.hidden,
        }
      })
    },
    {
      immediate: true,
    },
  )

  return columns
}