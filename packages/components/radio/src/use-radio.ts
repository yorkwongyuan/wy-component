import { type RadioProps, type RadioEmits } from './radio'
import { computed, ref, type SetupContext, inject } from 'vue'
import { UPDATE_MODEL_EVENT } from '@wy-component/constants'
import { useFormSize, useFormDisabled } from '@wy-component/components/form'
import { radioGroupKey } from './constant'

export const useRadio = (props: {label: RadioProps['label']; modelValue?: RadioProps['modelValue']}, emit?: SetupContext<RadioEmits>['emit']) => {
  const radioRef = ref<HTMLInputElement>()
  const focus = ref(false)
  // radio-group组件通过provide传入的值
  const radioGroup = inject(radioGroupKey, undefined)
  const size = useFormSize(computed(() => radioGroup?.size))
  const disabled = useFormDisabled<boolean>(computed(() => radioGroup?.disabled))
  // 是否存在group组件
  const isGroup = computed(() => !!radioGroup)
  const modelValue = computed<RadioProps['modelValue']>({
    get () {
      console.log(isGroup.value, 'isGroup.value')
      return isGroup.value ? radioGroup!.modelValue : props.modelValue!
    },
    set (val) {
      if (isGroup.value) {
        radioGroup?.changeEvent(val)
      } else {
        emit && emit(UPDATE_MODEL_EVENT, val)
      }
      radioRef.value!.checked = props.modelValue === props.label
    }
  })

  return {
    radioGroup,
    isGroup,
    modelValue,
    radioRef,
    size,
    disabled,
    focus
  }
}