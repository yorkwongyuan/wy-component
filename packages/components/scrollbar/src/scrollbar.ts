import { buildProps } from "@wy-component/utils";

export const scrollbarProps = buildProps({
  tag: {
    type: String,
    default: 'div'
  },
  native: {
    type: Boolean,
    default: false,
  },
  height: {
    type: [String, Number],
    default: ''
  },
  maxHeight: {
    type: [String, Number],
    default: ''
  },
  minSize: {
    type: Number,
    default: 20
  },
  wrapClass: {
    type: [String, Array],
    default: ''
  },
  viewClass: {
    type: [String, Array],
    default: '',
  },
})