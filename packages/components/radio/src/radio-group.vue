<template>
  <div :class="[ns.b('group')]" ref="radioGroupRef">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
  import { useNamespace } from '@wy-component/hooks';
  import { ref, provide, reactive, toRefs, nextTick } from 'vue'
  import { radioGroupKey } from './constant'
  import { radioGroupProps, radioGroupEmits, type RadioGroupProps } from './radio-group'
  import { UPDATE_MODEL_EVENT } from '@wy-component/constants'

  const props = defineProps(radioGroupProps)
  const emit = defineEmits(radioGroupEmits)
  const ns = useNamespace('radio')
  const radioGroupRef = ref<HTMLDivElement>()
  const changeEvent = (val: RadioGroupProps['modelValue']) => {
    emit(UPDATE_MODEL_EVENT, val)
    nextTick(() => emit('change', val))
  }
  // todo
  provide(radioGroupKey, reactive({
    ...toRefs(props),
    changeEvent
  }))
</script>
