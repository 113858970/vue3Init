import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginImp from 'vite-plugin-imp';
import { resolve } from "path";
//import legacyPlugin from 'vite-plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  vitePluginImp({//组件按需导入
    libList: [[{
      libName: 'vant',
      style(name) {
        return `vant/es/${name}/index.css`;
      }
    }]]
  })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 设置 `@` 指向 `src` 目录
    },
  },
  server: {
    port: 3000,
    open: true, //自动打开
    base: "./ ", //生产环境路径
    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      '^/api': {
        target: 'http://192.168.8.86:31060',
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
