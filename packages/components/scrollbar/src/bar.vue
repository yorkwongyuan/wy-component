<template>
  <thumb :move="moveY" vertical :size="height" :ratio="ratioY"></thumb>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { GAP } from './util'
  import { barProps } from './bar'
  import thumb from './thumb.vue'
  const moveX = ref(0)
  const moveY = ref(0)
  const props = defineProps(barProps)
  const handleScroll = (wrap: HTMLDivElement) => {
    const offsetHeight = wrap.offsetHeight - GAP
    const offsetWidth = wrap.offsetWidth - GAP
    moveY.value = ((wrap.scrollTop * 100) / offsetHeight) * props.ratioY
    moveX.value = ((wrap.scrollLeft * 100) / offsetWidth) * props.ratioX
  }

  defineExpose({
    handleScroll
  })
</script>

<style>
html,body {
  margin: 0;
}
</style>