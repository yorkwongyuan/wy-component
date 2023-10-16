import { isString } from '@vue/shared'
export {isObject, isString} from '@vue/shared'

export const isNumber = (val: any): val is number => typeof val === 'number'
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

// 是否是可以转为number的string类型
export const isStringNumber = (value: string):boolean => {
  if (!isString(value)){
    return false
  }
  return !Number.isNaN(Number(value))
}

export const isUndefined = (val: any): val is undefined => val === undefined