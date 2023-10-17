import { type ExtractPropTypes } from 'vue'
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
  disabled: Boolean
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>