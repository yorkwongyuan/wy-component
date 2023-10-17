import { useFormDisabled } from "@wy-component/components/form"
import { type CheckboxModel, type CheckboxStatus } from '.'
import { isUndefined } from "@wy-component/utils"
import { computed, inject } from 'vue'
import { checkboxGroupContextKey } from '../constant'

export const useCheckboxDisabled = ({
  model,
  isChecked
}: Pick<CheckboxModel, 'model'> & Pick<CheckboxStatus, 'isChecked'>) => {

  const checkboxGroup = inject(checkboxGroupContextKey, undefined)
  // 是否超出范围
  const isLimitDisabled = computed(() => {
    const max = checkboxGroup?.min?.value
    const min = checkboxGroup?.max?.value
    return (
      (!isUndefined(max) && model.value.length >= max && !isChecked.value) ||
      (!isUndefined(min) && model.value.length <= min && isChecked.value)
    )
  })
  const isDisabled = useFormDisabled(
    computed<boolean>(() => checkboxGroup?.disabled.value || isLimitDisabled.value))
  return {
    isDisabled,
    isLimitDisabled
  }
}