<style>

</style>
<template>
  <component class="button" :is="tag" :style="buttonStyle" @click="handleClick"
    :class="[
      ns.b(),
      ns.m(_type),
      ns.m(_size),
      ns.is('plain', plain),
      ns.is('round', round),
      ns.is('circle', circle),
      ns.is('text', text),
      ns.is('link', link),
      ns.is('has-bg', bg),
      ns.cssVarName('color-white')
    ]">
    <span>
      <slot></slot>
    </span>
  </component>
</template>
<script setup lang="ts">
import {buttonProps, buttonEmits} from './button'
import { useButtonCustomStyle } from './button-custom';
import { useNamespace } from '@wy-component/hooks';
import { useButton } from './use-button';
defineOptions({
  name: 'WyButton'
})
const emits = defineEmits(buttonEmits)
const props = defineProps(buttonProps)
const buttonStyle = useButtonCustomStyle(props)
const ns = useNamespace('button')
const {_size, _props, _ref, _type, shouldAddSpace, handleClick} = useButton(props, emits)

defineExpose({
  _props,
  _ref,
  _type,
  shouldAddSpace,
  handleClick
})
</script>
