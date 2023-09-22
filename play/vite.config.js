import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pkg from '@wy-component/build-utils'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueMacros({
      setupComponent: false,
      setupSFC: false,
      plugins: {
        vue: vue(),
        vueJsx: vueJsx()
      }
    })
  ],
  resolve: {
    alias: [
      {
        find: /^unbuild$/,
        replacement: path.resolve(pkg.wyRoot, 'index.ts')
      },
      {
        find: /^unbuild\/(.*)$/,
        replacement: `${pkg.pkgRoot}/$1`
      }
    ],
  },
  optimizeDeps: {include: ['vue', '@vue/shared', '@ctrl/tinycolor']}
})
