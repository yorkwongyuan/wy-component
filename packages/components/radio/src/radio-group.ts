import { buildProps } from "@wy-component/utils";
import { useSizeProp } from '@wy-component/hooks'
import { type ExtractPropTypes } from 'vue'
import { radioEmits } from './radio'

export const radioGroupProps = buildProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  disabled: Boolean,
  size: useSizeProp,
  name: {
    type: String,
    default: undefined,
  },
  fill: {
    type: String,
    default: undefined,
  },
  textColor: {
    type: String,
    default: undefined,
  },
} as const)

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioGroupEmits = radioEmits
export type RadioGroupEmits = typeof radioGroupEmits