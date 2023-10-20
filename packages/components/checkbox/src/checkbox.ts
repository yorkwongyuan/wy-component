import { type ExtractPropTypes } from 'vue'
import { useSizeProp } from '@wy-component/hooks'

export type CheckboxValueType = string | number | boolean

export const checkboxProps = {
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined
  },
  trueLabel: {
    type: [String, Number],
  },
  falseLabel: {
    type: [String, Number],
  },
  label: {
    type: [String, Number, Boolean, Object],
  },
  name: {
    type: String,
    default: undefined,
  },
  disabled: Boolean,
  indeterminate: Boolean,
  border: Boolean,
  size: useSizeProp,
  tabindex: [String, Number],
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>