/**
 * v-auth="'add'"
 * v-auth="['add', 'update']"
 * 按钮权限指令
 * 一般情况下不能动态修改权限
 * 异步权限时可通过 updated 钩子更新
 */

import type { Directive, DirectiveBinding } from 'vue'
import useUserStore from '@/store/modules/user'
import { isArray } from '@/utils/is'

type BindingType = DirectiveBinding<string | string[]>

const auth: Directive = {
  mounted(el: HTMLElement, binding: BindingType) {
    checkButtonAuth(el, binding)
  },
  // updated(el: HTMLElement, binding: BindingType) {
  //   checkButtonAuth(el, binding)
  // },
}

function checkButtonAuth(el: HTMLElement, binding: BindingType) {
  const { value } = binding
  const userStore = useUserStore()
  const values = isArray(value) ? value : [value]

  if (values.length) {
    const hasPermission = userStore.hasAuth(values)
    if (!hasPermission) {
      el.parentNode?.removeChild(el)
    }
  }
}

export default auth
