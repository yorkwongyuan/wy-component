import { type Ref, type InjectionKey } from 'vue';
import { provide, ObjectDirective } from 'vue'

type ForwardRefSetter<T = any> = (el:T) => void

export type ForwardRefInjectionContext<T> = {
  setForwardRef: ForwardRefSetter<T>
}

export const FORWARD_REF_INJECTION_KEY:InjectionKey<ForwardRefInjectionContext<any>> = Symbol('forwardRef') 

export const useForwardRef = <T>(forwardRef: Ref<T | null>) => {
  // 将设置全组件的forwardRef的方法传下去
  const setForwardRef = (el: T) => {
    forwardRef.value = el
  }
  provide(FORWARD_REF_INJECTION_KEY, {
    setForwardRef
  } as ForwardRefInjectionContext<T>)
}

// 执行赋值的方法
export const useForwardRefDirective = (setForwardRef: ForwardRefSetter):ObjectDirective => {
  return {
    mounted (el) {
      console.log('🚀 ~ file: index.ts:26 ~ mounted ~ el:', el)
      setForwardRef(el)
    },
    updated (el) {
      setForwardRef(el)
    },
    unmounted () {
      setForwardRef(null)
    }
  }
}