import { buildProps, isString, isBoolean, isNumber } from "@wy-component/utils";
import { UPDATE_MODEL_EVENT } from "@wy-component/constants";
import { type ExtractPropTypes } from 'vue'
import { useSizeProp } from "@wy-component/hooks";

export type CheckboxGroupValueType = string | number | boolean

export const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxGroupValueType): val is CheckboxGroupValueType => (isString(val) || isBoolean(val) || isNumber(val))
}

export const checkboxGroupProps = buildProps({
  modelValue: {
    type: [String, Number, Boolean]
  },
  tag: {
    type: String,
    default: 'div'
  },
  max: Number,
  min: Number,
  disabled: Boolean,
  size: useSizeProp
})

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>