import request from '@/utils/request'
import type { AxiosRequestConfig } from 'axios'

export function getArticleList(params: PagingRequest & ArticleType.ListParams, config?: AxiosRequestConfig) {
  return request.get<PagingResult<ArticleType.ListItem[]>>('https://api.hsmy.fun/mock/list', params, config)
}
