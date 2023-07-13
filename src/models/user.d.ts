declare namespace UserType {
  interface LoginParams {
    username: string
    password: string
  }

  interface LoginResponse {
    token: string
    auth: string[]
    role: number
  }

  interface ListParams {
    name: string
    phone: string
  }

  interface ListItem {
    id: number
    name: string
    sex: string
    role: number
    date: string
    age: number
    city: string
    area: string
    status: number
  }

  interface UserInfo {
    username: string
    role: number
    authList: string[]
  }
}