import type { Plugin } from 'vue'

// 相当于是T, 即传入的SFC类型, 继承了Plugin, 即拥有了install方法
export type SFCWithInstall<T> = T & Plugin

// 返回Promise的方法
export type Awaitable<T> = Promise<T> | T