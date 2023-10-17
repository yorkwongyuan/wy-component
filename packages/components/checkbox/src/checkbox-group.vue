<template>
  <component :is="tag">
    <slot />
  </component>
</template>
<script setup lang="ts">
  import { checkboxGroupProps, type CheckboxGroupValueType, checkboxEmits } from './checkbox-group'
  import { provide, computed, toRefs } from 'vue'
  import { UPDATE_MODEL_EVENT } from '@wy-component/constants'
  import { checkboxGroupContextKey,  } from './constant'
  import { pick } from 'lodash'

  const emits = defineEmits(checkboxEmits)
  const changeEvent = (val: CheckboxGroupValueType) => {
    emits(UPDATE_MODEL_EVENT, val)
  }
  const props = defineProps(checkboxGroupProps)
  const modelValue = computed(() => {
    return {
      get () {
        return props.modelValue
      },
      set (val: CheckboxGroupValueType) {
        changeEvent(val)
      }
    }
  })
  provide(checkboxGroupContextKey, {
    ...pick(
      toRefs(props), [
      'max',
      'min',
      'disabled'
    ]),
    modelValue,
    changeEvent
  })
</script>