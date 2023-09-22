export const mutable = <T extends readonly any[] | Record<string, unknown>>(val: T) => val as Mutable<T>

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export type Arrayable<T> = T | T[]