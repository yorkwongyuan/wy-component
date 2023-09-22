import {defineComponent, inject, Comment, Text, Fragment, withDirectives, cloneVNode} from 'vue'
import { NOOP, isObject } from '@vue/shared'
import { FORWARD_REF_INJECTION_KEY, useForwardRefDirective, useNamespace } from '@wy-component/hooks'
import { type VNode } from 'vue'
const NAME = 'WyOnlyChild'

export const OnlyChild = defineComponent({
  name: NAME,
  setup(_, { slots, attrs }) {
    const forwardRefInjection = inject(FORWARD_REF_INJECTION_KEY)
    // 对象, 里面包含钩子函数等
    const forwardRefDirective = useForwardRefDirective(forwardRefInjection?.setForwardRef ?? NOOP)

    return () => {
      // 获取slot部分的数据
      const defaultSlot = slots.default?.(attrs)
      if (!defaultSlot) return

      if (defaultSlot.length > 1) return
      const firstLegitNode = findFirstLegitChild(defaultSlot)
      return withDirectives(cloneVNode(firstLegitNode!, attrs), [[forwardRefDirective]])
    }

    // 找到首个合法子节点
    function findFirstLegitChild (node: VNode[] | undefined):VNode | null {
      if (!node) return null
      for (const child of node) {
        if (isObject(child)) {
          switch(child.type) {
            // 如果是注释
            case Comment:
              continue;
            case Text:
            case 'svg':
              return getTextVnode(child)
            case Fragment: // 碎片节点
              return findFirstLegitChild(child.children as VNode[])
            default:
            return child
          }
        }
        return findFirstLegitChild(child)
      }
      return null
    }

    // 获取文本节点
    function getTextVnode (s: string | VNode) {
      const ns = useNamespace('only-child')
      return <span class={ns.e('content')}>{s}</span>
    }
  }
})