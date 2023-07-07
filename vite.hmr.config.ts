import { resolve } from 'path'
import { defineConfig, BuildOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePluginHtml } from './plugin/vite-plugin-html';

const HOST = "127.0.0.1";
const PORT = 8088;

export default defineConfig(():any => {
  const buildConfig = {
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

  return {
    plugins: [
      vue(),
      VitePluginHtml({
        baseUrl: `http://${HOST}:${PORT}/`
      }),
    ],
    server: {
      host: HOST,
      port: PORT,
      hmr: {
        host: HOST,
      },
    },
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