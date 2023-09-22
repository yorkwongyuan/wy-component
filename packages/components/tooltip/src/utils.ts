import { Arrayable } from "@wy-component/utils";
import { TooltipTriggerType } from "./trigger";
import {type Ref, unref} from 'vue'
// 判断事件是否是期望的
export const isTriggerType = (trigger: Arrayable<TooltipTriggerType>, type: TooltipTriggerType) => {
  if (Array.isArray(trigger)) {
    return trigger.includes(type)
  }
  return trigger === type
}


export const whenTrigger = (
  trigger: Ref<Arrayable<TooltipTriggerType>>,
  type: TooltipTriggerType,
  handler: (e:Event) => void
  ) => {
    return (e:Event) => {
      return isTriggerType(unref(trigger), type) && handler(e)
    }
}