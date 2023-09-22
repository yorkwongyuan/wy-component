import { type PopperCoreConfigProps } from './content'

export const buildPopperOptions = (props: PopperCoreConfigProps) => {
  const { placement } = props
  return {
    placement
  }
}