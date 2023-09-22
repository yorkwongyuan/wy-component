import { withInstall } from "@wy-component/utils";
import Popper from './src/popper.vue'
import WyPopperTrigger from './src/trigger.vue'
import WyPopperContent from './src/content.vue'
export { WyPopperTrigger, WyPopperContent }
export * from './src/content'
export const WyPopper = withInstall(Popper)
export default WyPopper
