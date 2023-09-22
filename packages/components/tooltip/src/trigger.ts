import { buildProps, Arrayable, defineProptype } from "@wy-component/utils"
export type TooltipTriggerType = 'hover' | 'focus' | 'click' | 'contextmenu'

export const useTooltipTriggerProps = buildProps({
  disabled: Boolean,
  trigger: {
    type: defineProptype<Arrayable<TooltipTriggerType>>([String, Array]),
    default: 'hover'
  }
})