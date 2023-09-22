import { buildProps } from "@wy-component/utils";
import { placements } from '@popperjs/core'
import { ExtractPropTypes } from "vue";
import type Content from './content.vue'



export const popperCoreConfigProps = buildProps({
  placement: {
    type: String,
    values: placements,
    default: () => 'bottom'
  }
} as const)

export const popperContentProps = buildProps({
  ...popperCoreConfigProps
} as const)

export type PopperCoreConfigProps = ExtractPropTypes<typeof popperCoreConfigProps>

export type PopperContentProps = ExtractPropTypes<typeof popperContentProps>

export type PopperContent = InstanceType<typeof Content>