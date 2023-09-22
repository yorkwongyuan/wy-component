import type { ButtonProps } from "./button";
import { type InjectionKey } from 'vue';

export interface ButtonGroupContext {
  size?:ButtonProps['size'],
  type?:ButtonProps['type']
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol('buttonGroupContextKey')