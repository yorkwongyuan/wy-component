import { type InjectionKey } from 'vue';


// 这个InjectionKey的泛型参数的类型, 就是他所传递的值的类型
export const formContextKey: InjectionKey<{disabled:boolean}> = Symbol('formContextKey')
export const formItemContextKey: InjectionKey<Symbol> = Symbol('formItemContextKey')