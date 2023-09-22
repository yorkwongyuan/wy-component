import { type InjectionKey } from 'vue'
import { type Arrayable } from '@wy-component/utils'
import { type TooltipTriggerType } from './trigger'
import { Ref } from 'vue'
export type WyTooltipInjectionContext = {
  controlled: Ref<boolean>,
  trigger: Ref<Arrayable<TooltipTriggerType>>
  onOpen: (e?: Event) => void
  onClose: (e?: Event) => void,
  onToggle: (e?: Event) => void,
  open: Ref<boolean>
}

export const TOOLTIP_INJECTION_KEY:InjectionKey<WyTooltipInjectionContext> = Symbol('WyTooltip')