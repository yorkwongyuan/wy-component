import { createPopper, type VirtualElement, type Instance, type Options } from '@popperjs/core'
import { watch, ref, shallowRef, type Ref, unref, computed } from 'vue'

type ElementType = HTMLElement | undefined
type ReferenceElement = ElementType | VirtualElement
export type PartialOptions = Partial<Options>
export const usePopper = (
    referenceElementRef: Ref<ReferenceElement>, 
    popperElementRef: Ref<ElementType>,
    opts: Ref<PartialOptions>
  ) => {
  const instanceRef = shallowRef<Instance | undefined>()
  const options = computed(() => {
    return {
      placement: unref(opts).placement
    }
  })
  watch(
    [referenceElementRef, popperElementRef],
    ([referenceElement, popperElement]) => {
      if (referenceElement && popperElement) {
        instanceRef.value = createPopper(referenceElement, popperElement, unref(options))
      }
    }
  )
}