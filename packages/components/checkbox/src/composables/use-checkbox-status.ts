import { type CheckboxProps } from '../checkbox'
import { type ComponentInternalInstance, computed, inject, ref, toRaw } from 'vue'
import { checkboxGroupContextKey } from '../constant'
import {type CheckboxModel} from '.'
import { isBoolean, isObject } from '@wy-component/utils'
import { isEqual } from 'lodash'
import { useFormSize } from '@wy-component/components/form'

export const useCheckboxStatus = (
    props: CheckboxProps,
    slots: ComponentInternalInstance['slots'],
    {model}: Pick<CheckboxModel, 'model'>
  ) => {
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)
  const isFocused = ref(false)
  // 是否选中
  const isChecked = computed<boolean>(() => {
    const value = model.value
    if (isBoolean(value)) {
      return value
    } else if (Array.isArray(value)) {
      // 如果label是对象
      if (isObject(props.label)) {
        return value.map(toRaw).some(o => isEqual(props.label, o))
      } else {
        return value.map(toRaw).includes(props.label)
      }
    } else if (value !== null && value !== undefined) {
      return value === props.trueLabel
    } else {
      return !!value
    }
  })

  // 是否有自定义label
  const hasOwnLabel = computed(() => {
    return !!(slots.default || props.label)
  })
  const checkboxButtonSize = useFormSize(
    computed(() => checkboxGroup?.size?.value),
      {
        prop: true
      }
    )
  const checkboxSize = useFormSize(computed(() => checkboxGroup?.size?.value))
  return {
    hasOwnLabel,
    isChecked,
    isFocused,
    checkboxSize,
    checkboxButtonSize
  }
}

export type CheckboxStatus = ReturnType<typeof useCheckboxStatus>