import {type ComputedRef, computed, getCurrentInstance} from 'vue'
import { fromPairs } from 'lodash';

// 参数类型
type Params = {
  excludeKeys?: ComputedRef<string[]>,
  excludeListeners?: boolean
}

// 默认需要排除的键
const DEFAULT_EXCLUDE_KEYS = ['class', 'style']
// dom二级事件匹配正则
const LISTENER_PREFIX = /^on[A-Z]/

export const useAttrs = (params: Params = {}):ComputedRef<Record<string, unknown>> => {
  const { excludeKeys, excludeListeners = false } = params
  // 所有需要被排除的键
  const allExcludeKeys = computed<string[]>(() => {
    return (excludeKeys?.value || []).concat(DEFAULT_EXCLUDE_KEYS)
  })
  const vm = getCurrentInstance()
  if (!vm) {
    return computed(() => ({}))
  }
  return computed(
    () =>
      fromPairs(
        Object.entries(vm.proxy?.$attrs!).filter(([key]) => {
          return !(allExcludeKeys.value.includes(key)) && !(excludeListeners && LISTENER_PREFIX.test(key))
        })
      )
  )
}
