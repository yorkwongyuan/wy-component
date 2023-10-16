<template>
  <div :class="[ns.e('bar'), ns.is(bar.key)]" ref="instance" @mousedown="clickTrackHandler">
    <div @mousedown="clickThumbHandler" ref="thumb" :class="ns.e('thumb')" :style="thumbStyle">
    </div>
  </div>
</template>
<script setup lang="ts">
import { useNamespace } from '@wy-component/hooks'
import { computed, ref, inject } from 'vue'
import { thumbProps } from './thumb'
import { renderThumbStyle, BAR_MAP } from './util'
import { scrollbarContextKey } from './constant'
const props = defineProps(thumbProps)
const ns = useNamespace('scrollbar')

const scrollbar = inject(scrollbarContextKey)
console.log('🚀 ~ file: thumb.vue:17 ~ scrollbar:', scrollbar)
if (!scrollbar) {
  console.log('缺少scrollbar')
}
// 记录thumb滑动到的位置
const thumbState = ref<Partial<Record<'X'|'Y', number>>>({})
// 滑道
const instance = ref<HTMLDivElement>()
const thumb = ref<HTMLDivElement>()
const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])

const thumbStyle = computed(() => renderThumbStyle({
  size: props.size,
  move: props.move,
  bar: bar.value
}))

const startDrug = (e: MouseEvent) => {
  e.stopImmediatePropagation()
  document.addEventListener('mousemove', mouseMoveDocumentHandler)
  document.addEventListener('mouseup', mouseUpDocumentHandler)
}

// 点击thumb
const clickThumbHandler = (e: MouseEvent) => {
  e.stopPropagation()
  window.getSelection()?.removeAllRanges()
  startDrug(e)
  // 滑块
  const el = e.currentTarget as HTMLDivElement
  if (!el) return
  // 此处记录鼠标点击了thumb的什么位置
  thumbState.value[bar.value.axis] = el[bar.value.offset] - (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction])
}

// (原本的thumb可滚动距离 / minHeight加持后的thumb可滚动距离) >=1
const offsetRatio = computed(() => {
  const instanceOffset = instance.value![bar.value.offset]
  const currentThumb = thumb.value![bar.value.offset]
  const originThumb = currentThumb * props.ratio!
  const result = (instanceOffset - originThumb) / (instanceOffset - currentThumb)
  return result
})

// mousemove事件
const mouseMoveDocumentHandler = (e: MouseEvent) => {
  if (!instance.value || !thumb.value || !scrollbar || !scrollbar.wrapElement) return
  const prevPage = thumbState.value[bar.value.axis]
  if (!prevPage) return

  // 鼠标点击处到instance顶部的距离
  const offset = e[bar.value.client] - instance.value.getBoundingClientRect()[bar.value.direction]
  // 鼠标点击点距离thumb顶部距离
  const thumbClickPosition = thumb.value[bar.value.offset] - prevPage
  const thumbPositionPercentage = ((offset - thumbClickPosition) * offsetRatio.value) / instance.value[bar.value.offset]
  const reuslt = thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize]
  scrollbar.wrapElement[bar.value.scroll] = reuslt
}

const mouseUpDocumentHandler = () => {
  thumbState.value[bar.value.axis] = 0
  document.removeEventListener('mousemove', mouseMoveDocumentHandler)
  document.removeEventListener('mouseup', mouseUpDocumentHandler)
}

const clickTrackHandler = (e: MouseEvent) => {
  if (!thumb.value || !instance.value || !scrollbar || !scrollbar.wrapElement) return
  const el = e.target as HTMLDivElement
  const offset = Math.abs(e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction])
  const thumbHalf = thumb.value[bar.value.offset] / 2
  const thumbPositionPercentage = (offset - thumbHalf) * offsetRatio.value / instance.value[bar.value.offset]
  scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize]
}


</script>