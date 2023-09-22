<template>
  <teleport :to="appendTo">
    <wy-popper-content ref="contentRef" v-if="shouldRender" v-show="shouldShow" :placement="placement">
      <slot />
    </wy-popper-content>
  </teleport>
</template>
<script lang="ts" setup>
import {TOOLTIP_INJECTION_KEY} from './constant'
import {computed, inject, unref, ref} from 'vue'
import {usePopperContainerId} from '@wy-component/hooks'
import { WyPopperContent, type PopperContent } from '@wy-component/components/popper';
import {useTooltipContentProps} from './content'
defineOptions({
  name:'WyTooltipContent',
  inheritAttrs: false
})
defineProps(useTooltipContentProps)
const { open } = inject(TOOLTIP_INJECTION_KEY, undefined)!
const shouldShow = computed(() => {
  return unref(open)
})

const shouldRender = computed(() => {
  return unref(open)
})

// 获取appendTo的信息
const { selector } = usePopperContainerId()
const appendTo = computed(() => {
  return selector.value
})

const contentRef = ref<PopperContent>()

defineExpose({
  contentRef
})

</script>