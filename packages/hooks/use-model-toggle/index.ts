import { buildProp, defineProptype, isBoolean } from '@wy-component/utils';
import { ExtractPropType } from '@wy-component/utils/vue/props/types';
import { getCurrentInstance, watch, computed, type Ref } from 'vue';
import { isFunction } from '@vue/shared'

// todo!!!!
const _prop = buildProp({
  type: defineProptype<boolean | null>(Boolean),
  default: null
} as const)
// let dddd: typeof _prop = {
//   type: Boolean as PropType<boolean>,
//   required: false,
//   validator: undefined,
//   default: null,
//   '__epPropKey': true
// }
const _event = buildProp({
  type: defineProptype<(bool: boolean) => void>(Function)
} as const)
type UseModelTogglePropsRaw<T extends string> = {
  [K in T]: typeof _prop
} & {
  [K in `onUpdate:${T}`]: typeof _event
}

type UseModelTogglePropsGeneric<T extends string> = {
  [K in T]: ExtractPropType<typeof _prop>
} & {
  [K in `onUpdate:${T}`]: ExtractPropType<typeof _event>
}

export const createModelToggleComposable = <T extends string>(name:T) => {
  const updateEventKeyRaw = `onUpdate:${name}` as const
    // 切换相关属性
  const useModelToggleProps = {
    [name]: _prop,
    [updateEventKeyRaw]: _event
  } as UseModelTogglePropsRaw<T>

  const useModelToggle = ({indicator, toggleReason}: ModelToggleParams) => {
    const instance = getCurrentInstance()!
    const props = instance.props as UseModelTogglePropsGeneric<T> & {
      disabled: boolean
    }
    // 是否有更新事件
    const hasUpdateHandler = computed(() => {
      return isFunction(props[updateEventKeyRaw])
    })
    // 显示
    const doShow = (event?:Event) => {
      if (toggleReason) {
        toggleReason.value = event
      }
      indicator.value = true
    }
    // 隐藏
    const doHide = (event?:Event) => {
      if (toggleReason) {
        toggleReason.value = event
      }
      indicator.value = false
    }

    const show = (event?:Event) => {
      doShow(event)
    }
    const hide = (event?:Event) => {
      doHide(event)
    }
    
    const onChange = (val:object) => {
      if (!isBoolean(val)) return
      if (indicator.value !== val) {
        if (val) {
          doShow()
        } else {
          doHide()
        }
      }
    }
  
    watch(() => props[name], onChange)
    return {
      show,
      hide,
      hasUpdateHandler
    }
  }
  return {
    useModelToggle,
    useModelToggleProps
  }
}

export type ModelToggleParams = {
  indicator: Ref<boolean>,
  toggleReason: Ref<Event | undefined>
}