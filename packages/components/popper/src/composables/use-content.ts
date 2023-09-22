import {POPPER_INJECT_KEY} from '../constant'
import { type PopperInjectKeyContext } from '../constant'
import {inject, computed, unref} from 'vue'
import { usePopper, type PartialOptions } from '@wy-component/hooks'
import { type PopperContentProps } from '../content'
import { buildPopperOptions } from '../utils'
export const usePopperContent = (props: PopperContentProps) => {
  // 获取popper.vue中定义好的contentRef, triggerRef
  const { contentRef, triggerRef } = inject<PopperInjectKeyContext | undefined>(POPPER_INJECT_KEY, undefined)!
  // 触发器
  const referenceElement = computed(() => {
    return unref(triggerRef)
  })

  const options = computed<PartialOptions>(() => {
    return {
      ...buildPopperOptions(props)
    }
  })
  usePopper(referenceElement, contentRef, options)
  return {
    contentRef
  }
}