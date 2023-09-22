import {useGetDerivedNamespace} from '../use-namespace'
import {useIdInjection} from '../use-id'
import {computed, onBeforeMount} from 'vue'

let container:HTMLElement
// 获取根目录下popper临时节点的id
export const usePopperContainerId = () => {
  const namespace = useGetDerivedNamespace()
  const injectResult = useIdInjection()
  const id = computed(() => {
    return `${namespace.value}-${injectResult.prefix}-popper-container-${injectResult.current}`
  })
  const selector = computed(() => {
    return `#${id.value}`
  })
  return {
    selector,
    id
  }
}

// 创建容器
const createContainer = (id:string) => {
  container = document.createElement('div')
  container.id = id
  document.body.appendChild(container)
  return container
}

// 将id赋值给容器, 并创建容器
export const usePopperContainer = () => {
  const { id, selector } = usePopperContainerId()
  onBeforeMount(() => {
    if (!container && !document.querySelector(selector.value)) {
      createContainer(id.value)
    }
  })
  return {
    id,
    selector
  }
}

