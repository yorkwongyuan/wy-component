import { isNumber } from "@wy-component/utils";
let hiddenTextarea: HTMLTextAreaElement | undefined = undefined

type nodeStyle = {
  contentStyle: string;
  borderSize:number;
  paddingSize:number;
  boxSizing: string;
}

type TextAreaHeight = {
  height: string
  minHeight?: string
}

const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`

const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
] 

// 计算文本节点样式
function calculateNodeStyling (targetElement: HTMLTextAreaElement):nodeStyle {
  const style = window.getComputedStyle(targetElement)
  const boxSizing = style.getPropertyValue('box-sizing')
  const paddingSize = 
    Number.parseFloat(style.getPropertyValue('padding-top')) +
    Number.parseFloat(style.getPropertyValue('padding-bottom'))
  const borderSize = 
    Number.parseFloat(style.getPropertyValue('border-bottom-width')) + 
    Number.parseFloat(style.getPropertyValue('border-top-width'))
  let contentStyle = CONTEXT_STYLE.map(name => `${name}:${style.getPropertyValue(name)}`).join(';')
  return {
    borderSize,
    paddingSize,
    boxSizing,
    contentStyle
  }
}


// 计算文本框高度
export function calcTextareaHeight (targetElement: HTMLTextAreaElement, minRows = 1, maxRows?: number):TextAreaHeight {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea')
    document.body.appendChild(hiddenTextarea)
  }
  const { boxSizing, borderSize, paddingSize, contentStyle } = calculateNodeStyling(targetElement)
  hiddenTextarea.setAttribute('style', `${contentStyle};${HIDDEN_STYLE}`)
  // 赋值, 用于计算scrollHeight
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || ''

  let height = targetElement.scrollHeight
  // 计算出节点高度
  // scrollHeight会把padding算进去的
  // boder-box下, height基本就是盒子的css中的height了
  if (boxSizing === 'border-box') {
    height = height + borderSize
    // contentbox下的高度减去padding刚好就是height
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize
  }
  
  hiddenTextarea.value = ''
  const result = {} as TextAreaHeight
  // scrollHeight包含了padding因此需要减去
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize
  if (isNumber(minRows)) {
    let minHeight = singleRowHeight * minRows
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize
    }
    height = Math.max(height, minHeight)
    result.minHeight = `${minHeight}px`
  }

  if (isNumber(maxRows)) {
    let maxHeight = singleRowHeight * maxRows
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize
    }
    height = Math.min(height, maxHeight)
  }
  result.height = `${height}px`
  
  return result
}