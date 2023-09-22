import {resolve} from 'path'

// 项目根路径
export const projRoot = resolve(__dirname, '..', '..', '..')
// 包目录根路径
export const pkgRoot = resolve(projRoot, 'packages')
// 组件文件根路径
export const comRoot = resolve(pkgRoot, 'components')
// 组件库路径
export const wyRoot = resolve(pkgRoot, 'wy-component')