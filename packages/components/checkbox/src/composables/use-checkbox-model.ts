import { type CheckboxProps } from '../checkbox'
import { computed, inject, ref, getCurrentInstance } from 'vue'
import { checkboxGroupContextKey } from '../constant'
import { UPDATE_MODEL_EVENT } from '@wy-component/constants'
import { type CheckboxGroupValueType } from '../checkbox-group'

export const useCheckboxModel = (props: CheckboxProps) => {
  const selfModel = ref<unknown>(false)
  const { emit } = getCurrentInstance()!
  const model = computed({
    get() {
      const checkboxGroup = inject(checkboxGroupContextKey, undefined)
      console.log('🚀 ~ file: use-checkbox-model.ts:13 ~ get ~ checkboxGroup:', checkboxGroup)
      const isGroup = computed(() => checkboxGroup)
      if (isGroup.value) {
        return checkboxGroup?.modelValue?.value
      } else {
        return props.modelValue ?? selfModel.value
      }
    },
    set (val: unknown) {
      selfModel.value = val
      emit(UPDATE_MODEL_EVENT, val)
    }
  })
  return {
    model
  }
}

export type CheckboxModel = ReturnType<typeof useCheckboxModel>