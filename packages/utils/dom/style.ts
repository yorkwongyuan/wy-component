import { isNumber, isStringNumber, isString } from "../types"

// 增加单位, 给形如: '12', 12的字符串/数字, 增加单位
export const addUnit = (value: string | number, defaultUnit = 'px') => {
  if (!value) return ''
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`
  } else if (isString(value)) {
    return value
  }
}