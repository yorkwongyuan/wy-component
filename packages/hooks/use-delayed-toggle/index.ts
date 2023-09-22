import { buildProps } from "@wy-component/utils";

export const useDelayedToggleProps = buildProps({
  showAfter: {
    type: Number,
    default: 0,
  },
  /**
   * @description delay of disappear, in millisecond
   */
  hideAfter: {
    type: Number,
    default: 200,
  },
  /**
   * @description disappear automatically, in millisecond
   */
  autoClose: {
    type: Number,
    default: 0,
  },
} as const)