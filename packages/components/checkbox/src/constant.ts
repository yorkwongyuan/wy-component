import { type InjectionKey, type WritableComputedRef, type ToRefs } from 'vue'
import { type CheckboxGroupProps } from './checkbox-group'

type CheckboxGroupContext = {
  modelValue: WritableComputedRef<any>
  changeEvent?: (...args: any) => any
} & ToRefs<Pick<CheckboxGroupProps, 'min' | 'max' | 'disabled' | 'size' | 'fill' | 'textColor'>>

export const checkboxGroupContextKey:InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroupContextKey')