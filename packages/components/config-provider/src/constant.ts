import type { ConfigProviderProps } from './config-provider-props'
import { type InjectionKey, type Ref } from 'vue'

export type ConfigProviderContext = Partial<ConfigProviderProps>

// 全局provider的key
export const configProviderContextKey: InjectionKey<Ref<ConfigProviderContext>> =
  Symbol()
