<template>
  <wy-only-child>
    <slot />
  </wy-only-child>
</template>
<script setup lang="ts">
import {inject} from 'vue'
import { POPPER_INJECT_KEY } from './constant'
import { useForwardRef } from '@wy-component/hooks'; 
import { WyOnlyChild } from '@wy-component/components/slot';
const { triggerRef } = inject(POPPER_INJECT_KEY, undefined)!
  defineOptions({
    name: 'WyPopperTrigger'
  })
  useForwardRef(triggerRef)
</script>