<template>
  <slot />
</template>
<script setup lang="ts">
import { provide, ref } from 'vue'
import { POPPER_INJECT_KEY } from './constant'
import { type PopperInjectKeyContext } from './constant'

defineOptions({
  name: 'WyPopper'
})
// 定义popper系组件需要的变量
const triggerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const popperProvides = {
  triggerRef,
  contentRef
} as PopperInjectKeyContext

// 将trigger传下去
provide(POPPER_INJECT_KEY, popperProvides)

</script>