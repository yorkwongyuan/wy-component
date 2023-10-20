import { type CheckboxProps } from '../checkbox'
import { computed, inject, ref, getCurrentInstance } from 'vue'
import { checkboxGroupContextKey } from '../constant'
import { UPDATE_MODEL_EVENT } from '@wy-component/constants'
import { isUndefined } from '@wy-component/utils'

export const useCheckboxModel = (props: CheckboxProps) => {
  const selfModel = ref<unknown>(false)
  const isLimitExceeded = ref(false)
  const { emit } = getCurrentInstance()!
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)
  const isGroup = computed(() => isUndefined(checkboxGroup) === false)
  const model = computed({
    get() {
      return isGroup.value
        ? checkboxGroup?.modelValue?.value
        : props.modelValue ?? selfModel.value
    },

    set(val: unknown) {
      if (isGroup.value && Array.isArray(val)) {
        isLimitExceeded.value =
          checkboxGroup?.max?.value !== undefined &&
          val.length > checkboxGroup?.max.value
        isLimitExceeded.value === false && checkboxGroup?.changeEvent?.(val)
      } else {
        emit(UPDATE_MODEL_EVENT, val)
        selfModel.value = val
      }
    },
  })
  return {
    model
  }
}

export type CheckboxModel = ReturnType<typeof useCheckboxModel>