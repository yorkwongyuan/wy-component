<template>
  <component :class="compKls" :is="!hasOwnLabel ? 'span' : 'label'">
    <span :class="spanKls">
      <!-- 如果定义了选中/非选中的值 -->
      <input 
        v-if="trueLabel || falseLabel"
        :true-value="trueLabel"
        :false-value="falseLabel"
        :class="ns.e('original')"
        type="checkbox"
        v-model="model"
        @change="handleChange"
        :disabled="isDisabled"
        @focus="isFocused = true"
      />
      <input
        v-else
        :id="Math.random() + ''"
        v-model="model"
        :class="ns.e('original')"
        type="checkbox"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        :tabindex="tabindex"
        @change="handleChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <span :class="ns.e('inner')" />
    </span>
    <span v-if="hasOwnLabel" :class="ns.e('label')">
      <slot/>
      <template v-if="!$slots.default">
        {{label}}
      </template>
    </span>
  </component>
</template>
<script setup lang="ts">
import { useSlots, computed } from 'vue'
import { useNamespace } from '@wy-component/hooks'
import { useCheckbox } from './composables'
import { checkboxProps } from './checkbox'
const ns = useNamespace('checkbox')
defineOptions({
  name: 'WyCheckbox'
})
const slots = useSlots()
const props = defineProps(checkboxProps)
const { hasOwnLabel, model, isDisabled, handleChange, isFocused, isChecked, checkboxSize } = useCheckbox(props, slots)

const spanKls = computed(() => {
  return [
    ns.e('input'),
    ns.is('disabled', isDisabled.value),
    ns.is('checked', isChecked.value),
    ns.is('indeterminate', props.indeterminate),
    ns.is('focus', isFocused.value),
  ]
})

const compKls = computed(() => {
  return [
    ns.b(),
    ns.m(checkboxSize.value),
    ns.is('disabled', isDisabled.value),
    ns.is('bordered', props.border),
    ns.is('checked', isChecked.value),
  ]
})
</script>