
export type Writable<T> = {
  -readonly [K in keyof T]: T[K]
}

export type WritableArray<T> = T extends readonly any[] ? Writable<T> : T
// 是否是never类型
export type IfNever<T, Y = true, N = false> = [T] extends [never] ? Y : N

export type IfUnKnown<T, Y, N> = [unknown] extends [T] ? Y : N

export type UnKnownToNever<T> = IfUnKnown<T, never, T>