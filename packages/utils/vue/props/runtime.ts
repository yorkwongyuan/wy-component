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
const isEpProp = (val: unknown): val is EpProp<any, any, any> => {
  return isObject(val) && !!(val as any)[epPropKey]
}

export const buildProp = <
  Type = never,
  Value = never,
  Validator = never,
  Default extends EpPropMergeType<Type, Value, Validator> = never,
  Required extends boolean = false
>(
  prop: EpPropInput<Type, Value, Validator, Default, Required>,
  key?: string
): EpPropFinalized<Type, Value, Validator, Default, Required> => {
  // filter native prop type and nested prop, e.g `null`, `undefined` (from `buildProps`)
  if (!isObject(prop) || isEpProp(prop)) return prop as any
  const { values, required, default: defaultValue, type, validator } = prop

  const _validator =
    values || validator
      ? (val: unknown) => {
          let valid = false
          let allowedValues: unknown[] = []

          if (values) {
            allowedValues = Array.from(values)
            if (hasOwn(prop, 'default')) {
              allowedValues.push(defaultValue)
            }
            valid ||= allowedValues.includes(val)
          }
          if (validator) valid ||= validator(val)

          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)]
              .map((value) => JSON.stringify(value))
              .join(', ')
            console.log(
              `Invalid prop: validation failed${
                key ? ` for prop "${key}"` : ''
              }. Expected one of [${allowValuesText}], got value ${JSON.stringify(
                val
              )}.`
            )
          }
          return valid
        }
      : undefined

  const epProp: any = {
    type,
    required: !!required,
    validator: _validator,
    [epPropKey]: true,
  }
  if (hasOwn(prop, 'default')) epProp.default = defaultValue
  return epProp
}

export function buildProps<
  Props extends Record<
    string,
    | { [epPropKey]: true }
    | NativePropType
    | EpPropInput<any, any, any, any, any>
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

