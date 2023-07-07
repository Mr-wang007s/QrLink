export function VitePluginHtml(options) {
    let config = null;
    return {
      name: 'vite-plugin-html',
      configResolved(c) {
        config = c;
      },
      transformIndexHtml(html) {
        return {
          html,
          // 注入标签
          tags: [
            {
              // 放到 body 末尾，可取值还有`head`|`head-prepend`|`body-prepend`，顾名思义
              injectTo: 'head-prepend',
              // 标签属性定义
              attrs: { href: options.baseUrl },
              // 标签名
              tag: 'base',
            },
            {
              injectTo: 'head-prepend',
              // 标签属性定义
              attrs: { type: "module",  src: "/@vite/client"},
              // 标签名
              tag: 'script',
            },
            {
              injectTo: 'body-prepend',
              // 标签属性定义
              attrs: { type: "module",  src: "./ui/ui.ts"},
              // 标签名
              tag: 'script',
            },
          ],
        }
      }
    }
  }
  