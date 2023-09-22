<template>
  <wy-tooltip
    ref="popperRef"
    trigger="click"
    :visible="suggestionVisible">
    <div ref="listboxRef">
      <wy-input
        ref="inputRef"
        v-bind="attrs"
        :clearable="clearable"
        :model-value="modelValue"
        @input="hanleInput"
        @focus="hanleFocus"
        @blur="handleBlur"
        @mousedown="handleMouseDown"
      >
        <template #suffix>
          <slot name="suffix"></slot>
        </template>
      </wy-input>
    </div>
    <template #content>
      <wy-scrollbar height="100px">
        <li
          v-for="(item, index) in suggestions"
          :key="index"
          @click="handleSelect(item)"
        >
          <slot :item="item">{{ item[valueKey] }}</slot>
        </li>
      </wy-scrollbar>
    </template>
  </wy-tooltip>
</template>
<script setup lang="ts">
import { WyTooltip, WyInput, WyScrollbar } from '@wy-component/components';
import "@wy-component/components/input/style"
import "@wy-component/components/scrollbar/style"
import { autocompleteProps, type AutocompleteData, autocompleteEmits } from './autocomplete'
import { ref, computed, useAttrs } from 'vue'
import { UPDATE_MODEL_EVENT, INPUT_EVENT } from '@wy-component/constants';
import { type InputInstance } from '@wy-component/components/input';
import { type TooltipInstance } from '@wy-component/components/tooltip';
import { onClickOutside } from '@vueuse/core'

defineOptions({
  name: 'WyAutocomplete'
})
const props = defineProps(autocompleteProps)
const emit = defineEmits(autocompleteEmits)
const attrs = useAttrs()
const suggestions = ref<AutocompleteData>([])
const activated = ref<boolean>(false)
const listboxRef = ref<HTMLElement>()
onClickOutside(listboxRef, () => {
  suggestionVisible && close()
})
const getData = async (queryString: string) => {
  const cb = (suggestion: AutocompleteData) => {
    suggestions.value = suggestion
  }
  // 如果是数组, 则直接赋值
  if (Array.isArray(props.fetchSuggestions)) {
    cb(props.fetchSuggestions)
  } else {
    const result = await props.fetchSuggestions(queryString, cb)
    if (Array.isArray(result)) {
      cb(result)
    }
  }
}
// 输入
const hanleInput = (keyword: string) => {
  emit(UPDATE_MODEL_EVENT, keyword)
  emit(INPUT_EVENT, keyword)
  getData(keyword)
}
const hanleFocus = (evt: FocusEvent) => {
  console.log('handleFocus')
  activated.value = true
  if (props.triggerOnFocus) {
    getData(String(props.modelValue))
  }
}
const inputRef = ref<InputInstance>()
const refInput = computed<HTMLInputElement[]>(() => {
  if (inputRef.value) {
    return Array.from<HTMLInputElement>(inputRef.value.$el.querySelector('input'))
  } else {
    return []
  }
})

const handleMouseDown = (event: MouseEvent) => {
  if (props.disabled) return
  if((event.target as HTMLElement)?.tagName !== 'INPUT' || refInput.value.includes(document.activeElement as HTMLInputElement)) {
    activated.value = true
  }
}

// 是否显示联想部分
const suggestionVisible = computed(() => {
  const isValidData = suggestions.value.length > 0
  return isValidData && activated.value
})

const close = () => {
  activated.value = false
}

const handleBlur = (evt: FocusEvent) => {
  setTimeout(() => {
    if (popperRef.value?.isFocusInsideContent()) {
      return
    }
    activated.value && close()
    emit('blur', evt)
  })
}
// tooltip
const popperRef = ref<TooltipInstance>()
// 选中部分
const handleSelect = (item: Record<string, any>) => {
  emit(UPDATE_MODEL_EVENT, item[props.valueKey])
  emit(INPUT_EVENT, item[props.valueKey])
  emit('select', item)
}

defineExpose({

})
</script>