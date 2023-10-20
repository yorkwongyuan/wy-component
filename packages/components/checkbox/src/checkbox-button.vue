<template>
  <label :class="labelKls">
    <input
        v-if="trueLabel || falseLabel"
        v-model="model"
        :class="ns.be('button', 'original')"
        type="checkbox"
        :true-value="trueLabel"
        :false-value="falseLabel"
        @change="handleChange"
        :disabled="isDisabled"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    <input v-else
      v-model="model"
      :class="ns.be('button', 'original')"
      type="checkbox"
      :value="label"
      @change="handleChange"
      :disabled="isDisabled"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <span
      v-if="$slots.default || label"
      :class="ns.be('button', 'inner')"
      :style="isChecked ? activeStyle : undefined"
    >
      <slot>{{label}}</slot>
    </span>
  </label>
</template>
<script setup lang="ts">
import { useCheckbox } from './composables/use-checkbox'
import { checkboxProps } from './checkbox'
import { useSlots, computed, inject } from 'vue'
import { useNamespace } from '@wy-component/hooks'
import { checkboxGroupContextKey } from './constant'

defineOptions({
  name: 'WyCheckboxButton'
})
const props = defineProps(checkboxProps)
const slots = useSlots()
const ns = useNamespace('checkbox')
const checkboxGroup = inject(checkboxGroupContextKey, undefined)
const activeStyle = computed(() => {
  const fillValue = checkboxGroup?.fill?.value ?? ''
  return {
    backgroundColor: fillValue,
    borderColor: fillValue,
    color: checkboxGroup?.textColor?.value ?? '',
    boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : undefined,
  }
})
const { model, handleChange, isChecked, isFocused, isDisabled, checkboxButtonSize } = useCheckbox(props, slots)
const labelKls = computed(() => {
  return [
    ns.b('button'),
    ns.bm('button', checkboxButtonSize.value),
    ns.is('disabled', isDisabled.value),
    ns.is('checked', isChecked.value),
    ns.is('focus', isFocused.value),
  ]
})
</script>