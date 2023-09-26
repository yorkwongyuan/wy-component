import { type RadioProps, type RadioEmits } from './radio'
import { computed, ref, type SetupContext } from 'vue'
import { UPDATE_MODEL_EVENT } from '@wy-component/constants'

export const useRadio = (props: {label: RadioProps['label']; modelValue?: RadioProps['modelValue']}, emit?: SetupContext<RadioEmits>['emit']) => {
  const radioRef = ref<HTMLInputElement>()
  const modelValue = computed<RadioProps['modelValue']>({
    get () {
      return props.modelValue!
    },
    set (val) {
      console.log('🚀 ~ file: use-radio.ts:12 ~ set ~ val:', val)
      emit && emit(UPDATE_MODEL_EVENT, val)
      console.log(props.modelValue === props.label, 'bool')
      radioRef.value!.checked = props.modelValue === props.label
    }
  })

  return {
    modelValue: modelValue,
    label: props.label,
    radioRef
  }
}