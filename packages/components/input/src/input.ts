import { buildProps, defineProptype, mutable } from "@wy-component/utils";
import { UPDATE_MODEL_EVENT } from '@wy-component/constants';
import {isString} from '@vue/shared'
import { type StyleValue } from 'vue'
import { useSizeProp } from "@wy-component/hooks";
import Input from './input.vue'
type InputAutoSize = {minRows?: number, maxRows?: number} | boolean

export const inputProps = buildProps({
  formatter: Function,
  disabled: Boolean,
  parser: Function,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: defineProptype<string|number|null|undefined>([String, Number, Object]),
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  },
  suffix: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  placeholder: {
    type: String
  },
  label: {
    type: String,
    default: undefined
  },
  inputStyle: {
    type: defineProptype<StyleValue>([String, Object, Array]),
    default: () => mutable({} as const)
  },
  resize: {
    type: String,
    values: ['none', 'both', 'horizontal', 'vertical'],
  },
  autosize: {
    type: defineProptype<InputAutoSize>([Boolean, Object])
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  containerRole: {
    type: String,
    default: undefined,
  },
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  size: useSizeProp
})

export type InputProps = typeof inputProps
export type InputInstance = InstanceType<typeof Input>
export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (str:string) => isString(str),
  input: (str:string) => isString(str),
  change: (str:string) => isString(str),
  clear: () => true,
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
}
