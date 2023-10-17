<template>
  <component :is="!hasOwnLabel ? 'span' : 'label'">
    <span>
      <!-- 如果定义了选中/非选中的值 -->
      <input 
        v-if="trueLabel || falseLabel"
        :true-value="trueLabel"
        :false-value="falseLabel"
        :class="ns.e('original')"
        type="checkbox"
        v-model="model"
        :disabled="isDisabled"
      />
      <input
        v-else
        type="checkbox"
        :name="name"
        :value="label"
        v-model="model"
        :disabled="isDisabled"
      />
      <span :class="ns.e('inner')" />
    </span>
    <span v-if="hasOwnLabel">
      <slot/>
      <template v-if="!$slots.default">
        {{label}}
      </template>
    </span>
  </component>
</template>
<script setup lang="ts">
import { useSlots } from 'vue'
import { useNamespace } from '@wy-component/hooks'
import { useCheckbox } from './composables'
import { checkboxProps } from './checkbox'
const ns = useNamespace('checkbox')
defineOptions({
  name: 'WyCheckbox'
})
const slots = useSlots()
const props = defineProps(checkboxProps)
const { hasOwnLabel, model, isDisabled } = useCheckbox(props, slots)
</script>