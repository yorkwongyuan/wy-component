<template>
  <wy-popper-trigger
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @blur="onBlur"
    @focus="onFocus"
    @click="onClick"
  >
    <slot />
  </wy-popper-trigger>
</template>
<script setup lang="ts">
import { composeEventHandlers } from '@wy-component/utils';
import { whenTrigger } from './utils';
import {useTooltipTriggerProps} from './trigger'
import { toRef, inject, unref } from 'vue'
import { TOOLTIP_INJECTION_KEY } from './constant'
import { WyPopperTrigger } from '@wy-component/components'

  defineOptions({
    name: 'WyTooltipTrigger',
    inheritAttrs: false,
  })
  const {onOpen, onClose, onToggle, controlled} = inject(TOOLTIP_INJECTION_KEY, undefined)!
  const props = defineProps(useTooltipTriggerProps)

  const stopWhenControlledOrDisabled = () => {
    if (props.disabled || unref(controlled)) {
      return true
    }
  }
  
  const trigger = toRef(props, 'trigger')
  const onMouseenter = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, 'hover', onOpen))
  const onMouseleave = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, 'hover', onClose))
  const onClick = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, 'click', onToggle))
  const onBlur = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, 'focus', onClose))
  const onFocus = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, 'focus', onOpen)) 
</script>