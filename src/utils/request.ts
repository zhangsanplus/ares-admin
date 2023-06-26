import axios from 'axios'
import { ResponseEnum } from '@/enums/http'
import useUserStore from '@/store/modules/user'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

const URL = import.meta.env.VITE_APP_API_BASE_URL
const config = {
  // 默认地址
  baseURL: URL,
  // 设置超时时间
  timeout: 10000,
  // 跨域时候允许携带凭证
  // withCredentials: true,
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    /**
     * 请求拦截器
     */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = useUserStore().token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    /**
     * 响应拦截器
     */
    this.service.interceptors.response.use(
      (response) => {
        const res = response.data
        // 响应数据为二进制流
        if (res instanceof ArrayBuffer) return res
        // 响应错误
        if (res.code !== ResponseEnum.SUCCESS) {
          // token 过期,重新登录
          if (res.code === ResponseEnum.LOGIN_EXPIRED) {
            const userStore = useUserStore()
            userStore.logout()
          }
          return Promise.reject(new Error(res.msg || 'Request Error'))
        }
        return res
      },
      (error: AxiosError) => {
        if (error?.message) {
          ElMessage.error(error.message)
        }
        return Promise.reject(error)
      },
    )
  }

  get<T = any>(url: string, params?: object): Promise<HttpResponse<T>> {
    return this.service.get(url, { params }) as any
  }

  post<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
    return this.service.post(url, params, config) as any
  }
}

export default new RequestHttp(config)
