import { buildProps } from '@wy-component/utils'
import { useTooltipTriggerProps } from './trigger'
import {useTooltipContentProps} from './content'
import { createModelToggleComposable } from '@wy-component/hooks'
import type ToolTip from './tooltip.vue'

export const {
  useModelToggle: useTooltipModelToggle,
  useModelToggleProps: useTooltipModelToggleProps
} = createModelToggleComposable('visible' as const)

export const useTooltipProps = buildProps({
  ...useTooltipModelToggleProps,
  ...useTooltipContentProps,
  ...useTooltipTriggerProps
})

export type TooltipInstance = InstanceType<typeof ToolTip>;
