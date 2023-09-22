import { inject, type SetupContext, ref, computed, useSlots, Text } from 'vue'
import type { ButtonEmits, ButtonProps } from './button'
import { buttonGroupContextKey } from './constant'
import { useGlobalConfig } from '@wy-component/components/config-provider'
import { useFormSize } from '@wy-component/components/form'
export const useButton = (
  props: ButtonProps,
  emit: SetupContext<ButtonEmits>['emit']
) => {
  // buttonGroup传递下来的数据
  const buttonGroupContext = inject(buttonGroupContextKey, undefined)
  // 获取全局关于button的配置
  const globalConfig = useGlobalConfig('button')
  // todo
  // const { form } = useFormItem()
  const _size = useFormSize(computed(() => buttonGroupContext?.size))
  console.log('🚀 ~ file: use-button.ts:17 ~ _size:', _size)
  // const _disabled = useFormDisabled()
  const _ref = ref<HTMLButtonElement>()
  const slots = useSlots()

  const _type = computed(() => props.type || buttonGroupContext?.type || '')

  // 读取全局的button配置
  const autoInsertSpace = computed(() => {
    return props.autoInsertSpace ?? globalConfig.value?.autoInsertSpace ?? false
  })

  // 属性
  const _props = computed(() => {
    if (props.tag === 'button') {
      return {
        type: props.nativeType,
        autofocus: props.autofocus
      }
    } else {
      return {}
    }
  })

  // 是否要增加文字间空格
  const shouldAddSpace = computed(() => {
    // 获取slots的内容
    const defaultSlot = slots.default?.()
    // 如果autoInsertSpace:true并且
    if (autoInsertSpace.value && defaultSlot?.length === 1) {
      const slot = defaultSlot[0]
      // 如果slot类型是text
      if (slot?.type === Text) {
        const text = slot.children as string
        return /^\p{Unified_Ideograph}{2}$/u.test(text.trim())
      }
    }
    return false
  })

  const handleClick = (evt: MouseEvent) => {
    emit('click', evt)
  }

  return {
    handleClick,
    _type,
    _ref,
    _props,
    _size,
    shouldAddSpace
  }
}
