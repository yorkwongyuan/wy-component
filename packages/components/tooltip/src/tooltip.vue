<template>
  <wy-popper>
    <wy-tooltip-trigger :trigger="trigger">
      <slot v-if="$slots.default" />
    </wy-tooltip-trigger>
    <wy-tooltip-content ref="contentRef" :placement="placement">
      <slot name="content">
        <span v-if="rawContent" v-html="content"></span>
        <span v-else>{{ content }}</span>
      </slot>
    </wy-tooltip-content>
  </wy-popper>
</template>
<script setup lang="ts">
import WyTooltipTrigger from './trigger.vue'
import {TOOLTIP_INJECTION_KEY} from './constant'
import { provide, toRef, ref, readonly, computed } from 'vue'
import {useTooltipProps, useTooltipModelToggle} from './tooltip'
import WyTooltipContent from './content.vue'
import {usePopperContainer} from '@wy-component/hooks'
import { WyPopper } from '@wy-component/components'
import { isBoolean } from '@wy-component/utils'
import { type ContentInstance } from './content'

// 创建根目录下的容器
usePopperContainer()

const props = defineProps(useTooltipProps)
const trigger = toRef(props, 'trigger')

const open = ref(false)
const toggleReason = ref<Event>()
const {show, hide, hasUpdateHandler} = useTooltipModelToggle({
  indicator: open,
  toggleReason
})

// 是否禁用trigger中的事件
const controlled = computed(() => {
  return isBoolean(props.visible) && !hasUpdateHandler.value
})

// tooltipContent
const contentRef = ref<ContentInstance>()
// popperContent内部是否有聚焦节点
// 这里的判断可以用来阻挡点击下拉框时候的blur事件
const isFocusInsideContent = () => {
  const popperContent = contentRef.value?.contentRef?.popperContentRef
  console.log('🚀 ~ file: tooltip.vue:46 ~ isFocusInsideContent ~ popperContent:', popperContent)
  const result = popperContent?.contains(document.activeElement)
  console.log('🚀 ~ file: tooltip.vue:47 ~ isFocusInsideContent ~ result:', result)
  return result
}

provide(TOOLTIP_INJECTION_KEY, {
  controlled,
  open: readonly(open),
  trigger,
  onOpen: (event?:Event) => {
    show(event)
  },
  onClose: (event?:Event) => {
    hide(event)
  },
  onToggle: (event?:Event) => {
    if (open.value) {
      hide(event)
    } else {
      show(event)
    }
  },
})

defineExpose({
  isFocusInsideContent
})

</script>