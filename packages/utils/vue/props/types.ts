import { epPropKey } from './runtime'
import type { ExtractPropTypes, PropType } from 'vue'
import type { UnKnownToNever, IfNever, WritableArray } from './util'

export type Value<T> = T[keyof T]
// 是否是epProp
export type IfTypeProp<T, Y, N> = T extends { [epPropKey]: true } ? Y : N
// 原生构造器, 诸如:BooleanConstructor, Null, Undefined等等
export type NativePropType =
  | ((...args: any) => any)
  | { new (...args: any): any }
  | undefined
  | null
export type IfNativePropType<T, Y, N> = [T] extends [NativePropType] ? Y : N

// 提取一个类型对象, 并将其规范化
export type ExtractPropType<T extends object> = Value<
  ExtractPropTypes<{
    key: T
  }>
>

// 接受一个Type, 通过ExtractPropType, 将其规范化
export type ResolvePropType<T> = IfNever<
  T,
  never,
  ExtractPropType<{
    type: WritableArray<T>
    required: true
  }>
>

// 根据Type, Value, Validator来决定类型
export type EpPropMergeType<Type, Value, Validator> =
  | IfNever<UnKnownToNever<Value>, ResolvePropType<Type>, never>
  | UnKnownToNever<Value>
  | UnKnownToNever<Validator>
export type EpPropInputDefault<
  Required extends boolean,
  Default
> = Required extends true
  ? never
  : Default extends Record<string, unknown> | any[]
  ? () => Default
  : (() => Default) | Default

export type EpPropInput<
  Type,
  Value,
  Validator,
  Default extends EpPropMergeType<Type, Value, Validator>,
  Required extends boolean
> = {
  type?: Type
  required?: Required
  values?: readonly Value[]
  validator?: ((val: any) => val is Validator) | ((val: any) => boolean)
  default?: EpPropInputDefault<Required, Default>
}

export type EpProp<Type, Default, Required> = {
  readonly type: PropType<Type>
  readonly required: [Required] extends [true] ? true : false
  readonly validator: ((val: unknown) => boolean) | undefined
  [epPropKey]: true
} & IfNever<Default, unknown, { readonly default: Default }>

export type EpPropFinalized<Type, Value, Validator, Default, Required> = EpProp<
  EpPropMergeType<Type, Value, Validator>,
  UnKnownToNever<Default>,
  Required
>

// 将buildProp输入转为输出
export type EpPropConvert<Input> = Input extends EpPropInput<
  infer Type,
  infer Value,
  infer Validator,
  any,
  infer Required
>
  ? EpPropFinalized<Type, Value, Validator, Input['default'], Required>
  : never

export type IfEpProp<T, Y, N> = T extends { [epPropKey]: true } ? Y : N
