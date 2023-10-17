import { type CheckboxProps } from '../checkbox'
import { type ComponentInternalInstance, computed, inject } from 'vue'
import { checkboxGroupContextKey } from '../constant'
import {type CheckboxModel} from '.'
import { isBoolean, isObject } from '@wy-component/utils'
import { isEqual } from 'lodash'

export const useCheckboxStatus = (
    props: CheckboxProps,
    slots: ComponentInternalInstance['slots'],
    {model}: Pick<CheckboxModel, 'model'>
  ) => {
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)

  // 是否选中
  const isChecked = computed<boolean>(() => {
    const value = model.value
    if (isBoolean(value)) {
      return value
    } else if (Array.isArray(value)) {
      // 如果label是对象
      if (isObject(props.label)) {
        return value.some(o => isEqual(props.label, o))
      } else {
        return value.includes(props.label)
      }
    } else {
      return !!value
    }
  })

  // 是否有自定义label
  const hasOwnLabel = computed(() => {
    return !!(slots.default || slots.label)
  })
  return {
    hasOwnLabel,
    isChecked
  }
}

export type CheckboxStatus = ReturnType<typeof useCheckboxStatus>