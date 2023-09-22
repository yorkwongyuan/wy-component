<template>
  <div class="content" ref="contentRef" tabindex="-1">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { usePopperContent } from './composables/use-content';
import { popperContentProps } from './content'
  defineOptions({
    name: 'WyPopperContent'
  })
  const props = defineProps(popperContentProps)
  const { contentRef } = usePopperContent(props)
  defineExpose({
    popperContentRef: contentRef
  })
</script>