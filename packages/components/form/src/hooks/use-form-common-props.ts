import type { ComponentSize } from "@wy-component/constants"
import {ref, unref ,computed, inject, type ComputedRef} from 'vue'
import { useProp } from "@wy-component/hooks/use-prop"
import { formContextKey } from "../constants"

// 表单元素size
export const useFormSize = (fallback?: any, ignored: Partial<Record<'prop', boolean>> = {}) => {
  const emptyRef = ref(undefined)
  const size = ignored.prop ? emptyRef : useProp<ComponentSize>('size')
  return computed(():ComponentSize => size.value || unref(fallback))
}

// 给表单元素传递disabled属性
export const useFormDisabled = <T>(fallback?:any):ComputedRef<boolean | undefined> => {
  const disabled = useProp<boolean>('disabled')
  const form = inject(formContextKey, undefined)
  return computed(() => disabled.value || unref(fallback) || form?.disabled)
}
