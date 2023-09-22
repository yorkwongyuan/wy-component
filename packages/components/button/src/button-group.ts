import { buttonProps } from "./button";
import { ExtractPropTypes } from 'vue'

export const buttonGroupProps = {
  size: buttonProps.size,
  type: buttonProps.type
} as const

export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>