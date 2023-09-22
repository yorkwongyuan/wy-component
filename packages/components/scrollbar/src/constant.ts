import { type InjectionKey } from "vue"
export interface ScrollbarContext {
  scrollbarElement: HTMLDivElement | undefined
  wrapElement: HTMLDivElement | undefined
}

// scrollBar的inject类型
export const scrollbarContextKey:InjectionKey<ScrollbarContext> = Symbol('scrollbarContextKey')