<template>
  <div 
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :class="containerKls"
    v-bind="containerAttrs"
    >
    <template v-if="props.type !== 'textarea'">
      <div v-if="$slots.prepend" :class="inputNs.be('group', 'prepend')">
        <slot name="prepend" />
      </div>
      <div :class="wrapperKls">
        <input
          :class="inputNs.e('inner')"
          ref="input"
          v-bind="attrs"
          :type="showPassword ? passwordVisible ? 'text' : 'password' : type"
          @focus="handleFocus"
          @blur="handleBlur"
          :disabled="inputDisabled"
          @input="handleInput"
          :formatter="formatter"
          :parser="parser"
          :autocomplete="autocomplete"
          :tabindex="tabindex"
          :placeholder="placeholder"
          :aria-label="label"
          :style="inputStyle"
          @compositionstart="handleCompositionStart"
          @compositionupdate="handleCompositionUpdate"
          @compositionend="handleCompositionEnd"
          @change="handleChange"
          @keydown="handleKeydown"
        >
        <!-- suffix部分 -->
        <span v-if="suffixVisible" :class="inputNs.e('suffix')">
          <span :class="inputNs.e('suffix-inner')" @click="focus">
            <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
              <slot name="suffix" />
            </template>
            <!-- 清空按钮 -->
            <i 
              v-if="showClear"
              :class="[inputNs.e('icon'), inputNs.e('clear')]"
              @mousedown.prevent="NOOP"
              @click="clear"
            >
            clear
            </i>
            <i v-if="showPwdVisible"
              :class="[inputNs.e('icon'), inputNs.e('password')]"
              @click="handlePasswordVisible"
            >
            password
            </i>
            <span v-if="isWordLimitVisible" :class="inputNs.e('count')">
              <span :class="inputNs.e('count-inner')">
                {{textLength}}
              </span>
            </span>
          </span>
        </span>
      </div>
      <div v-if="$slots.append" :class="inputNs.be('group', 'append')">
        <slot name="append" />
      </div>
    </template>
    <template v-else>
      <textarea
        :class="textareaNs.e('inner')"
        ref="textarea"
        v-bind="attrs"
        :type="showPassword ? passwordVisible ? 'text' : 'password' : type"
        @focus="handleFocus"
        @blur="handleBlur"
        :disabled="inputDisabled"
        @input="handleInput"
        :formatter="formatter"
        :parser="parser"
        :autocomplete="autocomplete"
        :tabindex="tabindex"
        :placeholder="placeholder"
        :aria-label="label"
        :style="textareaStyle"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @change="handleChange"
        @keydown="handleKeydown"
      ></textarea>
      <span
        v-if="isWordLimitVisible"
        :class="inputNs.e('count')"
      >
        {{ textLength }} / {{ attrs.maxlength }}
      </span>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, shallowRef, onMounted, nextTick, watch, useSlots, useAttrs as useRawAttrs, type StyleValue } from 'vue'
import { inputProps, inputEmits } from './input';
import { useNamespace, useAttrs } from '@wy-component/hooks';
import { useFormDisabled, useFormSize } from '@wy-component/components/form';
import { UPDATE_MODEL_EVENT, INPUT_EVENT } from '@wy-component/constants';
import {NOOP, isObject, isKorean} from '@wy-component/utils';
import { calcTextareaHeight } from './utils'
import { isNil } from 'lodash'

defineOptions({
  name: 'WyInput',
  inheritAttrs: false,
})
type TargetElement = HTMLInputElement | HTMLTextAreaElement
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const inputNs = useNamespace('input')
// 是否disabled还要考虑form的配置
const inputDisabled = useFormDisabled()
// 获取input节点
const input = shallowRef<HTMLInputElement>()
// 节点的值,无论是input还是textarea
const _ref = computed(() => input.value || textarea.value)
// 属性modelValue的值
const nativeInputValue = computed(() => isNil(props.modelValue) ? '' : String(props.modelValue))

function setNativeInputValue () {
  // 节点
  const input = _ref.value
  const formatterValue = props.formatter ? props.formatter(nativeInputValue.value) : nativeInputValue.value
  if (!input || input.value === formatterValue) return
  input.value = formatterValue
}

// 监听modelValue的值
watch(nativeInputValue, () => setNativeInputValue())
// 输入事件
const handleInput = async (event: Event) => {
  let { value } = event.target as TargetElement
  if (props.formatter) {
    value = props.parser ? props.parser(value) : value
  }

  if (isComposing.value) return

  if (value === nativeInputValue.value) {
    setNativeInputValue()
    return
  }
  emit(UPDATE_MODEL_EVENT, value)
  emit(INPUT_EVENT, value)
  await nextTick()
  setNativeInputValue()
}

// focus blur事件
const focused = ref(false)
const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)
}
const handleBlur = (event: FocusEvent) => {
  focused.value = false
  emit('blur', event)
  // todo
  // if (props.validateEvent) {
  //   formItem?.validate?.('blur').catch((err) => debugWarn(err))
  // }
}
// input标签父级盒子的类
const wrapperKls = computed(() => {
  return [
    inputNs.e('wrapper'),
    inputNs.is('focus', focused.value)
  ]
})

// suffix部分
const passwordVisible = ref(false)
const slots = useSlots()
// 是否显示清空按钮
const showClear = computed(
  () => 
    props.clearable &&
    !inputDisabled.value &&
    !props.readonly &&
    !!nativeInputValue.value &&
    (focused.value || hovering.value)
)

// 是否显示密码切换按钮
const showPwdVisible = computed(
  () =>
    props.showPassword &&
    !inputDisabled.value &&
    !props.readonly &&
    !!nativeInputValue.value &&
    (!!nativeInputValue.value || focused.value)
)

const isWordLimitVisible = computed(
  () =>
  props.showWordLimit &&
  !!attrs.value.maxlength &&
  (props.type === 'text' || props.type === 'textarea') &&
  !props.readonly &&
  !props.showPassword
)

const suffixVisible = computed(
  () =>
  !!slots.suffix ||
  showClear.value ||
  props.showPassword ||
  isWordLimitVisible
)
// 清空
const clear = () => {
  emit(UPDATE_MODEL_EVENT, '')
  emit(INPUT_EVENT, '')
  emit('change', '')
  emit('clear')
}

const focus = async () => {
  await nextTick()
  _ref.value?.focus()
}

// 切换密码显示/隐藏
const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
  focus()
}
// 获取属性
const attrs = useAttrs({
  excludeKeys: computed<string[]>(() => {
    return Object.keys(containerAttrs.value)
  }),
})
const rawAttrs = useRawAttrs()
const containerStyle = computed<StyleValue>(() =>[rawAttrs.style as StyleValue, props.inputStyle])
// 计算textarea样式
const textareaCalcStyle = shallowRef(props.inputStyle)
const textareaStyle = computed<StyleValue>(() => [
    props.inputStyle,
    textareaCalcStyle.value,
    {resize: props.resize} as StyleValue
  ])
// textarea
const textarea = shallowRef<HTMLTextAreaElement>()
const resizeTextarea = () => {
  const { type, autosize } = props
  if (!textarea.value || type !== 'textarea') return
  if (autosize) {
    const minRows = isObject(autosize) ? autosize.minRows : undefined
    const maxRows = isObject(autosize) ? autosize.maxRows : undefined
    const textareaStyle = calcTextareaHeight(textarea.value, minRows, maxRows)
    textareaCalcStyle.value = {
      overflowY: 'hidden',
      ...textareaStyle
    }
  } else {
    textareaCalcStyle.value = {
      minHeight: calcTextareaHeight(textarea.value).minHeight
    }
  }
}

onMounted(() => {
  if (!props.formatter && props.parser) {
    console.log(
      'ElInput',
      'If you set the parser, you also need to set the formatter.'
    )
  }
  setNativeInputValue()
  nextTick(resizeTextarea)
})

// composition事件
const isComposing = ref<boolean>(false)
const handleCompositionStart = (event: CompositionEvent) => {
  console.log('compositionstart')
  emit('compositionstart', event)
  isComposing.value = true
}

const handleCompositionUpdate = (event: CompositionEvent) => {
  emit('compositionupdate', event)
  console.log('compositionupdate')
  const text = (event.target as HTMLInputElement)?.value
  const lastCharacter = text[text.length - 1] || ''
  isComposing.value = !isKorean(lastCharacter)
}

const handleCompositionEnd = (event: CompositionEvent) => {
  emit('compositionend', event)
  console.log('compositionend')
  if (isComposing.value) {
    isComposing.value = false
    handleInput(event)
  }
}

// hovering
const hovering = ref(false)

const handleMouseLeave = (evt: MouseEvent) => {
  hovering.value = false
  emit('mouseleave', evt)
}

const handleMouseEnter = (evt: MouseEvent) => {
  hovering.value = true
  emit('mouseenter', evt)
}

// change事件
const handleChange = (event: Event) => {
  emit('change', (event.target as TargetElement).value)
}

const handleKeydown = (evt: KeyboardEvent) => {
  emit('keydown', evt)
}

// containerAttrs
const containerAttrs = computed(() => {
  const comboBoxAttrs: Record<string, unknown> = {}
  if (props.containerRole === 'combobox') {
    comboBoxAttrs['aria-haspopup'] = rawAttrs['aria-haspopup']
    comboBoxAttrs['aria-owns'] = rawAttrs['aria-owns']
    comboBoxAttrs['aria-expanded'] = rawAttrs['aria-expanded']
  }
  return comboBoxAttrs
})

const blur = () => _ref.value?.blur()

// 文字长度
const textLength = computed(() => nativeInputValue.value.length)

// 样式
const textareaNs = useNamespace('textarea')
const containerKls = computed(() => [
  props.type === 'textarea' ? textareaNs.b() : inputNs.b(),
  inputNs.m(inputSize.value)
])

const inputSize = useFormSize()
watch(() => props.modelValue, () => {
  nextTick(() => resizeTextarea())
})
defineExpose({
  input,
  textareaStyle,
  focus,
  blur
})
</script>