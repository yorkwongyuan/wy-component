<template>
  <div class='box'>
    {{data}}12
    <wy-radio-group v-model="data">
      <wy-radio-button label="a" v-model="data">1</wy-radio-button>
      <wy-radio-button label="b" v-model="data">2</wy-radio-button>
    </wy-radio-group>
  </div>
</template>
<script lang="ts" setup>
  import { WyRadioButton, WyRadioGroup } from '@wy-component/components';
  import '@wy-component/components/radio/style'
  import '@wy-component/components/radio-group/style'
  import '@wy-component/components/radio-button/style'
  import { ref } from 'vue'
  const data = ref<string>('a')
</script>
<style lang="scss">
html, body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
