import { buildProps } from "@wy-component/utils";
import { useSizeProp } from "@wy-component/hooks";
export const radioPropsBase = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  label: {
    type: [String, Number, Boolean],
    default: '',
  },
} as const)

export const radioProps = buildProps({
  ...radioPropsBase,
  label: {
    type: [String, Number, Boolean],
    default: ''
  }
})