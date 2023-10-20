import { buildProps, isString, isBoolean, isNumber, defineProptype } from "@wy-component/utils";
import { UPDATE_MODEL_EVENT } from "@wy-component/constants";
import { type ExtractPropTypes } from 'vue'
import { useSizeProp } from "@wy-component/hooks";
import { type CheckboxProps, type CheckboxValueType } from './checkbox'
export type CheckboxGroupValueType = Exclude<CheckboxValueType, boolean>[]

export const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxGroupValueType): val is CheckboxGroupValueType => (isString(val) || isBoolean(val) || isNumber(val))
}

export const checkboxGroupProps = buildProps({
  modelValue: {
    type: defineProptype<CheckboxGroupValueType>(Array),
    default: () => []
  },
  tag: {
    type: String,
    default: 'div'
  },
  max: Number,
  min: Number,
  disabled: Boolean,
  size: useSizeProp,
  fill: String,
  textColor: String
})

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>