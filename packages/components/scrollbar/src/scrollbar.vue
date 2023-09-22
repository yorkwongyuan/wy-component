<template>
  <div :class="ns.b()" ref="scrollbarRef">
    <div ref="wrapRef" :style="style" :class="wrapKls" @scroll="handleScroll" >
      <component :is="tag" :class="resizeKls">
        <slot />
      </component>
    </div>
    <template v-if="!native">
      <bar ref="barRef" :height="sizeHeight" :ratio-y="ratioY"/>
    </template>
  </div>
</template>
<script setup lang="ts">
  import { scrollbarProps } from './scrollbar'
  import { scrollbarContextKey } from './constant'
  import Bar from './bar.vue'
  import { ref, computed, onMounted, nextTick, provide, reactive } from 'vue'
  import type { CSSProperties, StyleValue } from 'vue'
  import { type BarInstance } from './bar'
  import { useNamespace } from '@wy-component/hooks'
  import { addUnit } from '@wy-component/utils/dom/style'
  import { GAP } from './util'

  defineOptions({
    name: 'WyScrollBar'
  })
  const scrollbarRef = ref<HTMLDivElement>()
  const wrapRef = ref<HTMLDivElement>()
  const barRef = ref<BarInstance>()
  const props = defineProps(scrollbarProps)
  const sizeHeight = ref('0')
  const ratioY = ref(1)
  const ns = useNamespace('scrollbar')
  const wrapKls = computed(() => {
    return [
      ns.e('wrap'),
      {
        [ns.em('wrap', 'hidden-default')]: !props.native
      }
    ]
  })
  const resizeKls = computed(() => {
    return [
      ns.e('view'),
      props.viewClass
    ]
  })
  const style = computed<StyleValue>(() => {
    const style:CSSProperties = {}
    if (props.height) {
      style.height = addUnit(props.height)
    }
    if (props.maxHeight) {
      style.maxHeight = addUnit(props.maxHeight)
    }
    return style
  })
  const handleScroll = () => {
    if (wrapRef.value) {
      barRef.value?.handleScroll(wrapRef.value)
    }
  }

  // 更新滚动条高度以及滚动速率
  const update = () => {
    if (!wrapRef.value) return
    const offsetHeight = wrapRef.value.offsetHeight - GAP
    const scrollHeight = wrapRef.value.scrollHeight - GAP
    // 滚动条原始高度
    const originHeight = offsetHeight ** 2 / scrollHeight

    // 滚动条最终高度
    const height = Math.max(originHeight, props.minSize)
    sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : ''
    /**
     * 如果滚动条极度短的时候, 会取到最小高度(props.minSize)的值; 此时实际滚动和滚动条滚动比例失调(不再是1:1), 滚动幅度相对暴增
     * 所以需要使用比例将其滚动幅度降下来
     */
    ratioY.value = (originHeight / (offsetHeight - originHeight)) / (height / (offsetHeight - height))
  }
  onMounted(() => {
    if (!props.native) {
      nextTick(() => {
        update()
      })
    }
  })
  provide(scrollbarContextKey, reactive({
    scrollbarElement: scrollbarRef,
    wrapElement: wrapRef
  }))
</script>
