import { type CheckboxProps } from '../checkbox'
import { type ComponentInternalInstance } from 'vue'
import { useCheckboxStatus } from './use-checkbox-status'
import { useCheckboxModel } from './use-checkbox-model'
import { useCheckboxEvent } from './use-checkbox-event'
import { useCheckboxDisabled } from './use-checkbox-disabled'

export const useCheckbox = (props: CheckboxProps, slots: ComponentInternalInstance['slots']) => {
  const { model } = useCheckboxModel(props)
  const { hasOwnLabel, isChecked, isFocused, checkboxSize, checkboxButtonSize } = useCheckboxStatus(props, slots, {model})
  const { handleChange } = useCheckboxEvent(props, {
    model,
    hasOwnLabel
  })

  const { isDisabled, isLimitDisabled } = useCheckboxDisabled({model, isChecked})
  return {
    hasOwnLabel,
    model,
    handleChange,
    isDisabled,
    isLimitDisabled,
    isFocused,
    isChecked,
    checkboxSize,
    checkboxButtonSize
  }
}