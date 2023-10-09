import { radioPropsBase } from './radio'
import { buildProps } from "@wy-component/utils";

export const radioButtonProps = buildProps({
  ...radioPropsBase,
  name: {
    type: String,
    default: ''
  }
} as const)