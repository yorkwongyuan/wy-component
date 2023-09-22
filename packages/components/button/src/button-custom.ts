import { TinyColor } from '@ctrl/tinycolor'
import { type ButtonProps } from './button'
import { useNamespace } from '@wy-component/hooks'
import { computed } from 'vue'

// 深色, 其本质就是和#141414进行混合
function darken(color: TinyColor, amount = 20) {
  return color.mix('#141414', amount), toString()
}

// 自定义颜色
export function useButtonCustomStyle(props: ButtonProps) {
  const ns = useNamespace('button')
  return computed(() => {
    const buttonColor = props.color
    let styles: Record<string, string> = {}
    if (buttonColor) {
      // props.color属性
      const color = new TinyColor(buttonColor)
      const activeBgColor = props.dark ? color.tint(20).toString() : darken(color, 20)
      if (props.plain) {
        styles = ns.cssVarBlock({
          'bg-color': props.dark
            ? darken(color, 90)
            : color.tint(90).toString(),
          'text-color': buttonColor,
          'border-color': props.dark
            ? darken(color, 50)
            : color.tint(50).toString(),
          'hover-bg-color': buttonColor,
          'hover-border-color': buttonColor,
          'hover-text-color': `var(${ns.cssVarName('color-white')})`,
          'active-bg-color': activeBgColor,
          'active-border-color': activeBgColor,
          'active-text-color': `var(${ns.cssVarName('color-white')})`,
        })
      } else {
        const hoverBgColor = props.dark ? darken(color, 30) : color.tint(30).toString()
        const textColor = color.isDark() ? `var(${ns.cssVarName('color-white')})` : `var(${ns.cssVarName('color-black')})`
        styles = ns.cssVarBlock({
          'bg-color': buttonColor,
          'text-color': textColor,
          'border-color': buttonColor,
          'hover-bg-color': hoverBgColor,
          'hover-text-color': textColor,
          'hover-border-color': hoverBgColor,
          'active-bg-color': activeBgColor,
          'active-border-color': activeBgColor
        })
      }
    }
    return styles
  })
}
