import { buildProps } from "@wy-component/utils";
import { useSizeProp } from "@wy-component/hooks";
import Radio from './radio.vue'
import { ExtractPropTypes } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@wy-component/constants'
import { isNumber, isString, isBoolean } from '@wy-component/utils'

export const radioPropsBase = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  label: {
    type: [String, Number, Boolean],
    default: '',
  },
})

export const radioProps = buildProps({
  ...radioPropsBase,
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  border: Boolean
} as const)

export const radioEmits = {
  [CHANGE_EVENT]: (val: string | number | boolean) => isString(val) || isNumber(val) || isBoolean(val),
  [UPDATE_MODEL_EVENT]: (val: string | number | boolean) => isString(val) || isNumber(val) || isBoolean(val),
}

export type RadioInstance = InstanceType<typeof Radio>
export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioEmits = typeof radioEmits