import { type InjectionKey, type Ref } from 'vue'

export type Measurable = {
  getBoundingClientRect: () => DOMRect
}

export type PopperInjectKeyContext = {
  triggerRef: Ref<Measurable | undefined>,
  contentRef: Ref<HTMLElement | undefined>
}
export const POPPER_INJECT_KEY:InjectionKey<PopperInjectKeyContext> = Symbol('popper-inject-key')