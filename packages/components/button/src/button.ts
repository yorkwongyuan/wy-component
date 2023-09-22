import {
  buildProps,
  defineProptype
} from '@wy-component/utils'
import { useSizeProp } from '@wy-component/hooks'
import type { ExtractPropTypes, Component } from 'vue'

// 按钮的类型
export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  'text',
  ''
] as const

// 按钮的原生类型
export const buttonNativeTypes = ['button', 'submit', 'reset'] as const

// 将values和validator合并
// 加上
export const buttonProps = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  type: {
    type: String,
    values: buttonTypes,
    default: ''
  },
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: 'button'
  },
  plain: Boolean,
  autofocus: Boolean,
  autoInsertSpace: {
    type: Boolean,
    default: undefined
  },
  tag: {
    type: defineProptype<string | Component>([String, Object]),
    default: 'button'
  },
  dark: Boolean,
  color: String,
  round: Boolean,
  text: Boolean,
  bg: Boolean,
  link: Boolean,
  circle: Boolean
} as const)

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

// button属性类型, ExtractPropTypes取出prop配置中的type值
export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits
export type ButtonType = ButtonProps['type']
export type ButtonNativeType = ButtonProps['nativeType']

// button全局
export interface ButtonConfigContext {
  autoInsertSpace?: boolean
}
