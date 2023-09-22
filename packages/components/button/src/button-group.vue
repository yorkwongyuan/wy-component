<template>
  <div :class="ns.b('group')">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { useNamespace } from '@wy-component/hooks'
import { buttonGroupProps } from './button-group';
import { buttonGroupContextKey } from './constant';
import { reactive, toRef, provide } from 'vue'

defineOptions({
  name: 'WyButtonGroup'
})

const ns = useNamespace('button')
const props = defineProps(buttonGroupProps)
provide(buttonGroupContextKey, reactive({
  size: toRef(props, 'size'),
  type: toRef(props, 'type')
}))
</script>