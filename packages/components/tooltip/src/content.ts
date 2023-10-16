import { buildProps } from "@wy-component/utils";
import { useDelayedToggleProps } from "@wy-component/hooks";
import { popperContentProps } from "@wy-component/components/popper";
import type Content from './content.vue'

export const useTooltipContentProps = buildProps({
  ...useDelayedToggleProps,
  ...popperContentProps,
  content: {
    type: String,
    default: '',
  },
  /**
   * @description whether `content` is treated as HTML string
   */
  rawContent: {
    type: Boolean,
    default: false,
  },
})

export type ContentInstance = InstanceType<typeof Content>