import { buildProps } from "@wy-component/utils";
import { type ExtractPropTypes } from "vue";



export const thumbProps = buildProps({
  vertical: Boolean,
  move: Number,
  size: String,
  ratio: {
    type: Number,
    required: true,
  },
})

export type ThumbProps = ExtractPropTypes<typeof thumbProps>
