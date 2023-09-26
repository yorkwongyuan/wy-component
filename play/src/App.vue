<template>
  <div class='box'>
    {{data}}
    <wy-radio label="a" v-model="data">1</wy-radio>
    <wy-radio label="b" v-model="data">2</wy-radio>
  </div>
</template>
<script lang="ts" setup>
  import { WyRadio } from '@wy-component/components';
  import '@wy-component/components/radio/style'
  import { ref } from 'vue'
  const data = ref<string>('')
</script>
<style lang="scss">
html, body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
