import { resolve } from 'path'
import { defineConfig, BuildOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from "vite-plugin-singlefile"
import { vitePluginCopy } from './plugin/vite-plugin-copy.js'

const target = process.env.TARGET
const platform = process.env.PLATFORM

export default defineConfig(():any  => {
  const buildConfig = target === 'ui'
    ? {
        target: "esnext",
        assetsInlineLimit: 100000000,
        chunkSizeWarningLimit: 100000000,
        cssCodeSplit: false,
        brotliSize: false,
        rollupOptions: {
          inlineDynamicImports: true,
          output: {
            manualChunks: () => "ui.js",
          },
        },
      }
    : {
      lib: {
        entry: resolve(__dirname, `./main/${platform}/main.ts`),
        name: 'myLib',
        formats: ['umd'],
        fileName: () => `${platform}/main.js`
      },
    }
  let pluginsArr = [
    vue(),
    viteSingleFile(),
  ]

  if (target === 'main') {
    let manifest:any =  vitePluginCopy([
      {
        src:  `main/${platform}/manifest.json`,
        dest: `dist/${platform}`,
      },
      {
        src:  `dist/index.html`,
        dest: `dist/${platform}`,
      }
    ])
    pluginsArr.push(manifest)
  }

  return {
    plugins: pluginsArr,
    build: {
      ...buildConfig as BuildOptions,
      emptyOutDir: false
    },
    resolve: {
      alias: {
        "@ui": resolve(__dirname, './ui'),
      }
    },
  }
})