import { buildProps } from "@wy-component/utils";
import { type ExtractPropTypes } from 'vue'
import { radioEmits } from './radio'

export const radioGroupProps = buildProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  }
} as const)

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioGroupEmits = radioEmits
export type RadioGroupEmits = typeof radioGroupEmits