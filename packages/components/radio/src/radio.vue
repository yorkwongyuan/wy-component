<template>
  <label :class="[ns.b(), ns.is('checked', modelValue === label), ns.m(size), ns.is('disabled', disabled)]">
    <div :class="[ns.e('input'), ns.is('checked', modelValue === label), ns.is('disabled', disabled)]">
      <input ref="radioRef" :disabled="disabled" @change="handleChange" :value="label" type="radio" v-model="modelValue" :class="ns.e('original')">
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
import { nextTick } from 'vue'
import { useNamespace } from '@wy-component/hooks';
import { radioProps, radioEmits } from './radio'
import { useRadio } from './use-radio'
import { CHANGE_EVENT } from '@wy-component/constants'

const ns = useNamespace('radio')
const props = defineProps(radioProps)
const emits = defineEmits(radioEmits)
defineOptions({
  name: 'WyRadio'
})

const { modelValue, radioRef, size, disabled } = useRadio(props, emits)

function handleChange () {
  nextTick(() => {
    emits(CHANGE_EVENT, modelValue.value)
  })
}

</script>