import { buildProps, defineProptype, Awaitable, NOOP } from "@wy-component/utils";
import { UPDATE_MODEL_EVENT, INPUT_EVENT } from '@wy-component/constants';
import { isString, isObject } from '@vue/shared'

// 输入建议列表
export type AutocompleteData = Record<string, any>[]

// 输入建议方法中的cb入參
export type AutocompleteFetchCallback = (suggestLists: AutocompleteData) => void

// 输入建议方法
export type fetchSuggestion = ((queryString: string, cb: AutocompleteFetchCallback) => Awaitable<AutocompleteData> | void) | AutocompleteData

export const autocompleteProps = buildProps({
  fetchSuggestions: {
    type: defineProptype<fetchSuggestion>([Array, Function]),
    default: NOOP
  },
  triggerOnFocus: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  valueKey: {
    type: String,
    default: 'value'
  },
  clearable: {
    type: Boolean,
    default: false,
  },
})

export const autocompleteEmits = {
  [UPDATE_MODEL_EVENT]: (str:string) => isString(str),
  [INPUT_EVENT]: (str:string) => isString(str),
  select: (item: Record<string, any>) => isObject(item),
  blur: (evt: FocusEvent) => evt instanceof FocusEvent
}