<template>
  <div class='box'>
    {{arr}}
    <wy-checkbox-group v-model="arr">
      <wy-checkbox-button label="a" name="haha" @change="handleChange"></wy-checkbox-button>
      <wy-checkbox-button label="b" name="haha" @change="handleChange"></wy-checkbox-button>
    </wy-checkbox-group>
  </div>
</template>
<script lang="ts" setup>
  import { WyCheckbox, WyCheckboxGroup, WyCheckboxButton } from '@wy-component/components';
  import '@wy-component/components/checkbox-button/style'
  import { ref } from 'vue'
  const arr = ref(['a'])
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
