import type { AxiosRequestConfig } from 'axios'
import request from '@/utils/request'

export function getArticleList(
  params: PagingRequest & ArticleType.ListParams,
  config?: AxiosRequestConfig,
) {
  return request.get<PagingResult<ArticleType.ListItem[]>>(
    'https://api.hsmy.fun/mock/list',
    params,
    config,
  )
}
