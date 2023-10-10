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
      :name="name || radioGroup?.name"
      @focus="focus = true"
      @blur="focus = false"
    />
    <span
      :class="ns.be('button', 'inner')"
      :style="modelValue === label ? activeStyle : {}"
      @keydown.stop>
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>
<script lang="ts" setup>
  import { computed, type CSSProperties } from 'vue'
  import { useRadio } from './use-radio'
  import { useNamespace } from '@wy-component/hooks';
  import { radioButtonProps } from './radio-button'
  const ns = useNamespace('radio')
  const props = defineProps(radioButtonProps)
  const { modelValue, size, disabled, radioRef, focus, radioGroup } = useRadio(props)

  const activeStyle = computed<CSSProperties>(() => ({
    backgroundColor: radioGroup?.fill || '',
    borderColor: radioGroup?.fill || '',
    boxShadow: radioGroup?.fill ? `-1px 0 0 0 ${radioGroup.fill}` : '',
    color: radioGroup?.textColor
  }))
</script>