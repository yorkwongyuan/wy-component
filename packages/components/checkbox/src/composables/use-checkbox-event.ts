import { type CheckboxProps } from '../checkbox'
import { type CheckboxStatus } from './use-checkbox-status'
import { type CheckboxModel } from './use-checkbox-model'
import { getCurrentInstance } from 'vue'
export const useCheckboxEvent = (
  props: CheckboxProps,
  {
    model,
    hasOwnLabel
  }: Pick<CheckboxStatus, 'hasOwnLabel'> & Pick<CheckboxModel, 'model'>
  ) => {
    const { emit } = getCurrentInstance()!
    const getLabeledValue = (val: string | number | boolean) => {
      return val === props.trueLabel || val === true ?
        props.trueLabel ?? true :
        props.falseLabel ?? false
    }

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      emit('change', getLabeledValue(target.checked), e)
    }

    return {
      handleChange  
    }
}