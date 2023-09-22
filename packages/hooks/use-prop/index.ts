import { getCurrentInstance } from 'vue';
import { ComputedRef, computed } from 'vue';
export const useProp = <T>(name:string):ComputedRef<T | undefined> => {
  const vm = getCurrentInstance()
  return computed(() => ((vm?.proxy?.$props as any)?.[name]))
}
