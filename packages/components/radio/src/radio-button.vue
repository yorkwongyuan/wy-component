<template>
  <label :class="[
    ns.b('button'),
    ns.is('active', modelValue === label),
    ns.is('disabled', disabled),
    ns.bm('button', size),
  ]">
    <input
      :class="ns.be('button', 'original-radio')"
      ref="radioRef"
      type="radio"
      :disabled="disabled"
      v-model="modelValue"
      :value="label"
      @focus="focus = true"
      @blur="focus = false"
    />
    <span :class="ns.be('button', 'inner')" @keydown.stop>
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>
<script lang="ts" setup>
  import { useRadio } from './use-radio'
  import { useNamespace } from '@wy-component/hooks';
  import { radioButtonProps } from './radio-button'
  const ns = useNamespace('radio')
  const props = defineProps(radioButtonProps)
  const { modelValue, size, disabled, radioRef, focus } = useRadio(props)
</script>