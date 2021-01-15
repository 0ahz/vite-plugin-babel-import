import vue from '@vitejs/plugin-vue';
import vitePluginImport from 'vite-plugin-babel-import';

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [
    vue(),
    vitePluginImport([
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style(name) {
          return `vant/es/${name}/index.css`;
        },
      },
      {
        libraryName: 'element-plus',
        libraryDirectory: 'es',
        style(name) {
          return `element-plus/lib/theme-chalk/${name}.css`;
        },
      },
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style(name) {
          return `ant-design-vue/lib/${name}/style/index.css`;
        },
      },
    ]),
  ],
  server: {
    hmr: { overlay: false },
  },
  optimizeDeps: {
    exclude: ['vant', 'element-plus', 'ant-design-vue'],
  },
};
