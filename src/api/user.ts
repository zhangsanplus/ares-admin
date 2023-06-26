import { getLoginData, getUserData } from './mock'

export function login(params: UserType.LoginParams) {
  // return request.post<UserType.LoginResponse>('/user/login', params)
  return getLoginData(params)
}

export function getUserList(params: UserType.ListParams) {
  // return request.get<PagingInfo<UserType.ListItem[]>>('/article/list', params)
  return getUserData(params)
}