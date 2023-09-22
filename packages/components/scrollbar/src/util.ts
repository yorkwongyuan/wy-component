import { type ThumbProps } from "./thumb";
import { type CSSProperties } from "vue";
export const GAP = 4;

export const BAR_MAP = {
  vertical: {
    size: 'height',
    scroll: 'scrollTop',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
    offset: 'offsetHeight',
    scrollSize: 'scrollHeight'
  },
  horizontal: {
    size: 'width',
    scroll: 'scrollLeft',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
    offset: 'offsetWidth',
    scrollSize: 'scrollWidth'
  }
} as const

export const renderThumbStyle = ({
  size,
  move,
  bar
}:Pick<ThumbProps, 'size' | 'move'> & {
  bar: typeof BAR_MAP[keyof typeof BAR_MAP]
}): CSSProperties => ({
  [bar.size]: size,
  transform: `translate${bar.axis}(${move}%)`
})