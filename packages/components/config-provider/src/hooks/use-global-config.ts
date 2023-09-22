import { computed, getCurrentInstance, inject, ref, type Ref } from 'vue'
import {
  type ConfigProviderContext,
  configProviderContextKey
} from '../constant'
const globalConfig = ref<ConfigProviderContext>()

// useGlobalConfig函数重载
export function useGlobalConfig<
  K extends keyof ConfigProviderContext,
  D extends ConfigProviderContext[K]
>(
  key: K,
  defaultValue?: D
): Ref<Exclude<ConfigProviderContext[K], undefined> | D>

export function useGlobalConfig(): Ref<ConfigProviderContext>

// 获取全局配置
export function useGlobalConfig(
  key?: keyof ConfigProviderContext,
  defaultValue = undefined
) {
  const config = getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig)
    : globalConfig
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue)
  } else {
    return config
  }
}
