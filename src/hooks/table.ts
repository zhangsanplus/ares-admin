import { cloneDeep } from 'lodash-es'
import type { AxiosRequestConfig } from 'axios'
import type { ShallowRef } from 'vue'

// 表格排序
interface TableSort {
  prop: string
  order: 'ascending' | 'descending'
}

// 表格分页
interface TablePaging {
  pageNum: number
  pageSize: number
}

// 表格 props
interface TableProps<TDataItem> {
  loading: boolean
  dataSource: TDataItem[]
  total: number
  pageNum: number
  pageSize: number
  defaultSort?: TableSort
  onChange: (data: XTableChangeData) => void
}

// 请求参数
type TableServiceParams<TParams> = TParams & TablePaging & TableSort

// 请求方法
type UseTableService<TResult, TParams> = (params: TableServiceParams<TParams>, config?: AxiosRequestConfig) => Promise<HttpResponse<TResult>>

// 配置项
interface UseTableOptions<TResult, TParams> {
  immediate?: boolean
  pageable?: boolean
  defaultParams?: TParams
  defaultSort?: TableSort
  defaultPaging?: Partial<TablePaging>
  onSuccess?: (data: HttpResponse<TResult>, params: Record<string, any>) => void
  onError?: (e: unknown, params: Record<string, any>) => void
  onFinally?: () => void
}

// 返回值
interface UseTableReturn<TDataItem, TParams> {
  loading: Ref<boolean>
  form: Ref<TParams>
  data: ShallowRef<TDataItem[]>
  tableProps: ComputedRef<TableProps<TDataItem>>
  query: () => Promise<void>
  reset: () => Promise<void>
  cancel: () => void
}

export default function useTable<
  TDataItem,
  TParams extends Record<string, any>,
>(
  service: UseTableService<PagingResult<TDataItem[]> | TDataItem[], TParams>,
  options: UseTableOptions<PagingResult<TDataItem[]> | TDataItem[], TParams> = {},
): UseTableReturn<TDataItem, TParams> {
  const {
    defaultParams,
    immediate = true,
    pageable = true,
    onSuccess,
    onError,
    onFinally,
  } = options

  const controller = ref<AbortController>()

  const loading = ref(false)
  const form = ref({}) as Ref<TParams>
  const pagingData = ref({}) as Ref<TablePaging>
  const sortData = ref<Partial<TableSort>>({})
  const data = shallowRef<TDataItem[]>([])
  const total = ref(0)

  const initData = () => {
    const {
      defaultSort = {},
      defaultPaging = {},
    } = options

    loading.value = false
    pagingData.value = { pageNum: 1, pageSize: 10, ...defaultPaging }
    sortData.value = { ...defaultSort }
    form.value = cloneDeep(defaultParams) || ({} as TParams)
  }

  const getParams = () => {
    let params = { ...form.value }

    // 分页参数
    if (pageable) {
      params = { ...params, ...pagingData.value }
    }

    // 排序参数
    const sortable = !!options.defaultSort
    if (sortable) {
      params = { ...params, ...sortData.value }
    }

    return params as TableServiceParams<TParams>
  }

  const fetchData = async () => {
    if (loading.value) return

    loading.value = true
    const params = getParams()
    try {
      controller.value = new AbortController()
      const res = await service(params, {
        signal: controller.value.signal,
      })
      if (pageable) {
        const ret = res.data as PagingResult<TDataItem[]>
        data.value = ret.list
        total.value = ret.count
      } else {
        const ret = res.data as TDataItem[]
        data.value = ret
      }
      onSuccess?.(res, params)
    } catch (error) {
      onError?.(error, params)
    } finally {
      loading.value = false
      onFinally?.()
    }
  }

  const onChange = ({ pageSize, pageNum, prop, order }: XTableChangeData) => {
    pagingData.value.pageNum = pageNum
    pagingData.value.pageSize = pageSize
    sortData.value.prop = prop
    sortData.value.order = order
    fetchData()
  }

  const query = async () => {
    pagingData.value.pageNum = 1
    await fetchData()
  }

  const reset = async () => {
    initData()
    await fetchData()
  }

  const cancel = () => {
    controller.value?.abort()
  }

  onMounted(() => {
    initData()
    if (immediate) {
      query()
    }
  })

  const tableProps = computed<TableProps<TDataItem>>(() => {
    const { defaultSort } = options
    const { pageSize, pageNum } = pagingData.value
    return {
      loading: loading.value,
      dataSource: data.value,
      total: total.value,
      pageable,
      pageSize,
      pageNum,
      defaultSort,
      onChange,
    }
  })

  return {
    loading,
    form,
    data,
    tableProps,
    query,
    reset,
    cancel,
  }
}