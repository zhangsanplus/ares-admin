import * as userApi from '@/api/user'
import { RouteNameEnum } from '@/enums/route'
import defaultSetting from '@/settings'

const { storagePrefix } = defaultSetting
const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const token = useStorage(`${storagePrefix}-token`, '')
  const userinfo = useStorage<UserType.UserInfo>(`${storagePrefix}-user`, {} as any)

  /**
   * 权限验证
   */
  const hasAuth = (data: string[]) => {
    const userAuthList = userinfo.value.authList ?? []
    return data.every(item => userAuthList.includes(item))
  }

  /**
   * 角色验证
   */
  const hasRole = (data: number[] | undefined) => {
    if (!data) return true
    const userRole = userinfo.value?.role
    return data.includes(userRole)
  }

  /**
   * 登录
   */
  const login = async (params: UserType.LoginParams) => {
    const { data } = await userApi.login(params)
    token.value = data.token
    userinfo.value = {
      username: params.username,
      role: data.role,
      authList: data.auth,
    }
  }

  /**
   * 退出
   */
  const logout = () => {
    token.value = ''
    userinfo.value = {} as any
    router.replace({ name: RouteNameEnum.LOGIN })
  }

  return {
    token,
    userinfo,
    hasAuth,
    hasRole,
    login,
    logout,
  }
})

export default useUserStore
