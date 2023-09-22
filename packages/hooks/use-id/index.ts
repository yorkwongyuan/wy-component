import {type InjectionKey, inject, getCurrentInstance} from 'vue'

type WyIdInjectionContext = {
  prefix: number,
  current: number
}
// 默认的节点id
const defaultInjectionId = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0,
}

const ID_INJECT_KEY: InjectionKey<WyIdInjectionContext> = Symbol('id-inject-key')

// 获取根节点下的空节点id
export const useIdInjection = () => {
  const id = inject(ID_INJECT_KEY, defaultInjectionId)
  return getCurrentInstance() ? id : defaultInjectionId
}
