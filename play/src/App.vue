<template>
  <div class='box'>{{bool}}
    <wy-checkbox v-model="bool" @change="handleChange"></wy-checkbox>
  </div>
</template>
<script lang="ts" setup>
  import { WyCheckbox } from '@wy-component/components';
  import '@wy-component/components/scrollbar/style'
  import { ref } from 'vue'
  const bool = ref('')
  const handleChange = (value) => {
    console.log('🚀 ~ file: App.vue:12 ~ handleChange ~ value:', value)
  }
</script>
<style lang="scss">
html, body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
