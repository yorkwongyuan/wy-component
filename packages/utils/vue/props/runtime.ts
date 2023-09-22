import type {
  EpPropFinalized,
  EpPropInput,
  EpPropMergeType,
  EpProp,
  NativePropType,
  IfEpProp,
  IfNativePropType,
  EpPropConvert
} from './types'
import { isObject } from '../../types'
import { hasOwn } from '../../object'
import { fromPairs } from 'lodash'
import type {PropType} from 'vue';

// epProp的标识
export const epPropKey = '__epPropKey'

// 是否是Ep的属性
const isEpProp = (val: any): val is EpProp<any, any, any> => {
  return isObject(val) && (val as any)[epPropKey]
}

export const buildProp = <
  Type = never,
  Value = never,
  Validator = never,
  Default extends EpPropMergeType<Type, Value, Validator> = never,
  Required extends boolean = false
>(
  props: EpPropInput<Type, Value, Validator, Default, Required>,
  key?: string
): EpPropFinalized<Type, Value, Validator, Default, Required> => {
  if (!isObject(props) || isEpProp(props)) return props as any
  const { type, default: defaultValue, required, values, validator } = props
  const _validator =
    values || validator
      ? (val: any) => {
          let valid = false
          let allowValues: unknown[] = []
          if (values) {
            allowValues = Array.from(values)
            valid ||= allowValues.includes(val)
          }
          if (validator) {
            valid ||= validator(val)
          }
          if (!valid && allowValues.length > 0) {
            const str = [...new Set(allowValues)]
              .map((value) => JSON.stringify(value))
              .join(',')
            console.log(
              `Invalid prop, ${
                key ? `for the key ${key}` : ''
              }, expect one of ${str}`
            )
          }
          return valid
        }
      : undefined

  const epProp: any = {
    type,
    required: !!required,
    [epPropKey]: true,
    validator: _validator
  }
  if (hasOwn(props, 'default')) {
    epProp.default = defaultValue
  }
  return epProp
}

export function buildProps<
  Props extends Record<
    string,
    EpPropInput<any, any, any, any, any> | NativePropType | null | undefined
  >
>(
  props: Props
): {
  [key in keyof Props]: IfEpProp<
    Props[key],
    Props[key],
    IfNativePropType<Props[key], Props[key], EpPropConvert<Props[key]>>
  >
} {
  return fromPairs(
    Object.entries(props).map(([key, option]) => {
      return [key, buildProp(option as any, key)]
    })
  ) as any
}

// defineProptype<TYPE>(params) 返回params, 并将其类型定义为TYPE类型的构造器类型
export const defineProptype = <T>(val:any):PropType<T> => val

