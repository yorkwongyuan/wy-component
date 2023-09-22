import { componentSizes } from '../../constants'
import { buildProp } from '../../utils/vue/props/runtime'

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false
} as const)
