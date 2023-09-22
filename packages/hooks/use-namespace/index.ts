import { inject, ref, type InjectionKey, type Ref, computed, unref } from 'vue'

// 默认命名空间前缀
const defaultNamespace = 'wy'

// is-xx类的前缀
const statePrefix = 'is-'

// 获取命名空间的inject的key
export const useGetDrivedNamespace: InjectionKey<Ref<string | undefined>> =
  Symbol('namespaceContextKey')

// 获取命名空间名称
export const useGetDerivedNamespace = (
  namespaceOverrides?: Ref<string | undefined>
) => {
  // 取入參namespaceOverrides或者默认命名空间名defaultNamespace
  const derivedNamespace =
    namespaceOverrides || inject(useGetDrivedNamespace, ref(defaultNamespace))
  const namespace = computed(() => {
    return unref(derivedNamespace) || defaultNamespace
  })
  return namespace
}

// 生成bem样式名通用方法
const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

// 定义样式类方法
export const useNamespace = (
  block: string,
  namespaceOverrides?: Ref<string | undefined>
) => {
  // 这里的namespace有三种由来: 参数传入、inject接收、defaultnamespace
  const namespace = useGetDerivedNamespace(namespaceOverrides)

  // 注意, 即使blockSuffix为空, 仍然会执行_bem
  const b = (blockSuffix: string = '') => _bem(namespace.value, block, blockSuffix, '', '')

  // 其他的,如果对应的值为空, 则直接不执行_bem
  const e = (element: string) =>
    element ? _bem(namespace.value, block, '', element, '') : ''

  const m = (modifier: string) =>
    modifier ? _bem(namespace.value, block, '', '', modifier) : ''

  const be = (blockSuffix: string, element: string) =>
    blockSuffix && element
      ? _bem(namespace.value, block, blockSuffix, element, '')
      : ''

  const em = (element: string, modifier: string) =>
    element && modifier
      ? _bem(namespace.value, block, '', element, modifier)
      : ''

  const bm = (blockSuffix: string, modifier: string) =>
    blockSuffix && modifier
      ? _bem(namespace.value, block, blockSuffix, '', modifier)
      : ''
  const bem = (blockSuffix: string, element: string, modifier: string) =>
    blockSuffix && element && modifier
      ? _bem(namespace.value, block, blockSuffix, element, modifier)
      : ''
  // is-xx, 比如: is-plain、is-round
  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0] : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  // 定义多个css变量类名
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      styles[`--${namespace.value}-${key}`] = object[key]
    }
    return styles
  }

  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      styles[`--${namespace.value}-${block}-${key}`] = object[key]
    }
    return styles
  }

  // 定义单个css变量类名
  const cssVarName = (name: string) => `--${namespace.value}-${name}`
  const cssVarBlockName = (name: string) =>
    `--${namespace.value}-${block}-${name}`

  return {
    namespace,
    b,
    e,
    m,
    bm,
    be,
    em,
    bem,
    is,
    cssVar,
    cssVarBlock,
    cssVarName,
    cssVarBlockName
  }
}
