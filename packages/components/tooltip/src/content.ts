import { buildProps } from "@wy-component/utils";
import { useDelayedToggleProps } from "@wy-component/hooks";
import { popperContentProps } from "@wy-component/components/popper";
import type Content from './content.vue'

export const useTooltipContentProps = buildProps({
  ...useDelayedToggleProps,
  ...popperContentProps
})

export type ContentInstance = InstanceType<typeof Content>