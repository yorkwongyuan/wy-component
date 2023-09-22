import { useSizeProp } from '../../../hooks/use-size'
import { buildProps, defineProptype } from '../../../utils/vue/props/runtime'
import type { ButtonConfigContext } from '../../button/src/button'
import type { ExtractPropTypes } from 'vue'

export const configProviderProps = buildProps({
  a11y: {
    type: Boolean,
    default: true
  },
  locale: {},
  size: useSizeProp,
  button: {
    type: defineProptype<ButtonConfigContext>(Object)
  }
} as const)

// 取出props所有成员的type属性
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
