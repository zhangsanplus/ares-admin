import type { XTableChangeData } from '@/components/x-table/types'
import type { AxiosRequestConfig } from 'axios'
import { cloneDeep } from 'lodash-es'

type ExtractServiceParams<T> = T extends (
  params: infer P,
  config?: AxiosRequestConfig
) => any
  ? Omit<P, keyof PagingRequest>
  : never

type ExtractServiceData<T> = T extends (
  params: any,
  config?: AxiosRequestConfig
) => Promise<HttpResponse<infer P>>
  ? P extends PagingResult<infer Q>
    ? Q
    : P
  : never

type ExtractServiceDataItem<T> = ExtractServiceData<T> extends Array<infer P> ? P : never

// 请求响应
type TableServiceResponse<TDataItem> = HttpResponse<PagingResult<TDataItem[]> | TDataItem[]>

// 请求函数
type UseTableService<TDataItem, TParams> = (
  params: TParams,
  config?: AxiosRequestConfig
) => Promise<TableServiceResponse<TDataItem>>

// 配置项
interface UseTableOptions<TDataItem, TParams> {
  immediate?: boolean
  pageable?: boolean
  pageSize?: number
  pageNum?: number
  onBeforeRequest?: (params: TParams, paging: PagingRequest) => TParams
  onChange?: (data: XTableChangeData) => void
  onSuccess?: (data: TableServiceResponse<TDataItem>) => void
  onError?: (error: unknown) => void
  onFinally?: () => void
}

// 返回值
interface UseTableReturn<TDataItem, TParams> {
  query: () => Promise<void>
  reset: () => Promise<void>
  abort: () => void
  loading: Ref<boolean>
  form: Ref<TParams>
  data: Ref<TDataItem[]>
  tableProps: ComputedRef<{
    loading: boolean
    dataSource: TDataItem[]
    pageNum: number
    pageSize: number
    total: number
    pageable: boolean
    onChange: (data: XTableChangeData) => void
  }>
}

export default function useTable<
  TService extends UseTableService<any, any>,
  TDataItem extends ExtractServiceDataItem<TService>,
  TParams extends ExtractServiceParams<TService>,
>(
  service: TService,
  defaultParams?: TParams,
  options?: UseTableOptions<TDataItem, ExtractServiceParams<TService>>,
): UseTableReturn<TDataItem, TParams> {
  const {
    immediate = true,
    pageable = true,
    pageSize = 10,
    pageNum = 1,
    onSuccess,
    onError,
    onFinally,
    onBeforeRequest,
    onChange,
  } = options || {}

  // 状态管理
  const data = ref<TDataItem[]>([]) as Ref<TDataItem[]>
  const form = ref<TParams>({} as TParams) as Ref<TParams>
  const pagingData = ref<PagingRequest>({ pageNum, pageSize })
  const total = ref(0)
  const loading = ref(false)
  let abortController: AbortController | null = null

  // 参数处理
  const getParams = () => {
    if (onBeforeRequest) {
      return onBeforeRequest(form.value, pagingData.value)
    }

    return pageable
      ? { ...form.value, ...pagingData.value }
      : form.value
  }

  // 数据请求
  const fetchData = async () => {
    try {
      abortController?.abort()
      loading.value = true
      abortController = new AbortController()

      const res = await service(getParams(), {
        signal: abortController.signal,
      })

      if (pageable) {
        const ret = res.data as PagingResult<TDataItem[]>
        data.value = ret.list
        total.value = ret.count
      } else {
        const ret = res.data as TDataItem[]
        data.value = ret
        total.value = ret.length
      }

      onSuccess?.(res)
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        onError?.(error)
      }
    } finally {
      loading.value = false
      onFinally?.()
    }
  }

  // 分页/排序变化处理
  const handleChange = (changeData: XTableChangeData) => {
    pagingData.value.pageNum = changeData.pageNum
    pagingData.value.pageSize = changeData.pageSize
    onChange?.(changeData)
    fetchData()
  }

  // 取消请求
  const abort = () => {
    abortController?.abort()
  }

  // 初始化
  const initialize = () => {
    if (defaultParams) {
      form.value = cloneDeep(defaultParams)
    }
    pagingData.value = {
      pageNum,
      pageSize,
    }
    loading.value = false
  }

  // 查询
  const query = async () => {
    pagingData.value.pageNum = 1
    await fetchData()
  }

  // 重置
  const reset = async () => {
    initialize()
    await fetchData()
  }

  // 生命周期
  onMounted(() => {
    initialize()
    if (immediate) {
      fetchData()
    }
  })

  onUnmounted(() => {
    abortController?.abort()
  })

  const tableProps = computed(() => ({
    loading: loading.value,
    dataSource: data.value,
    pageNum: pagingData.value.pageNum,
    pageSize: pagingData.value.pageSize,
    total: total.value,
    pageable,
    onChange: handleChange,
  }))

  return {
    query,
    reset,
    abort,
    loading,
    form,
    data,
    tableProps,
  }
}
