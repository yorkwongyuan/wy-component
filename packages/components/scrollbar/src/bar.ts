import Bar from './bar.vue'
import { buildProps } from "@wy-component/utils";

export const barProps = buildProps({
  ratioX: {
    type: Number,
    default: 1
  },
  ratioY: {
    type: Number,
    default: 1
  },
  height: {
    type: String,
    default: ''
  }
})

export type BarInstance = InstanceType<typeof Bar>