import request from '@/utils/request'
import { getLoginData, getUserData } from './__mock__'
import type { AxiosRequestConfig } from 'axios'

export function login(params: UserType.LoginParams) {
  // return request.post<UserType.LoginResponse>('/user/login', params)
  return getLoginData(params)
}

export function getUserList(params: UserType.ListParams) {
  return getUserData(params)
}

export function getArticleList(params: PagingRequest & ArticleType.ListParams, config?: AxiosRequestConfig) {
  return request.get<PagingResult<ArticleType.ListItem[]>>('https://api.yoogle.top/mock/list', params, config)
}