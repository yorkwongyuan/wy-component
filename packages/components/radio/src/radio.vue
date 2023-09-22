<template>
  <label :class="[ns.b()]">
    <div :class="[ns.e('input')]">
      <input type="text" :class="ns.e('original')">
      <div :class="ns.e('inner')"></div>
    </div>
    <span :class="ns.e('label')" @keydown.stop>
      <slot>
        {{label}}
      </slot>
    </span>
  </label>
</template>
<script lang="ts" setup>
import { useNamespace } from '@wy-component/hooks';
import { radioProps } from './radio'
const ns = useNamespace('radio')
defineProps(radioProps)
defineOptions({
  name: 'WyRadio'
})
</script>