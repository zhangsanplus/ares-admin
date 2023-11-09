import { guid, sleep } from '@/utils'

export async function getLoginData(params: any): Promise<HttpResponse<UserType.LoginResponse>> {
  await sleep(800)
  return {
    msg: '成功',
    code: 0,
    data: {
      token: guid(),
      auth: params.username === 'admin' ? ['ADD', 'DELETE', 'DETAILS'] : ['DETAILS'],
      role: params.username === 'admin' ? 1 : 2,
    },
  }
}

export async function getUserData(params: any): Promise<HttpResponse<PagingResult<UserType.ListItem[]>>> {
  await sleep(500)
  const count = 50
  const start = (params.pageNum - 1) * params.pageSize
  const list = Array.from({ length: Math.min(count - start, params.pageSize) })
    .map((_, index) => {
      const i = start + index
      return {
        id: i,
        name: `公孙${i + 1}`,
        date: `${i + 1}月${i + 1}日`,
        age: Math.floor(Math.random() * 100),
        sex: Math.random() > 0.5 ? '男' : '女',
        role: Math.random() > 0.5 ? 1 : 2,
        city: Math.random() > 0.5 ? '上海市' : '北京市',
        status: Math.random() > 0.5 ? 0 : 1,
        area: `上海市普陀区金沙江路上海市普陀区金沙江路${i + 1}号`,
      }
    })

  return {
    msg: '成功',
    code: 0,
    data: {
      list,
      count,
    },
  }
}
