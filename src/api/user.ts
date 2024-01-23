import { mockLoginData, mockMenuList, mockUserData } from './__mock__'

export function login(params: UserType.LoginParams) {
  return mockLoginData(params)
}

export function getMenuList(params: string) {
  return mockMenuList(params)
}

export function getUserList(params: UserType.ListParams) {
  return mockUserData(params)
}
