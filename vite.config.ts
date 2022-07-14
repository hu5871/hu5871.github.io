import { UserConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'vite-plugin-components';
import { resolve } from 'path'
const config: UserConfig = {
  optimizeDeps: {
    exclude: ['vue-demi', '@vueuse/shared', '@vueuse/core'],
  },
  plugins: [
    Components({
      dirs: ['.vitepress/theme'],
      customLoaderMatcher: (id) => {
        return id.endsWith('.md')
      },
      customComponentResolvers: [
        IconsResolver({
          customCollections:['ri-moon-line','ri-sun-line']
        }),
        // AntDesignVueResolver()
      ],
    }),
    Icons({
      autoInstall:true,
    }),
    WindiCSS({
      preflight: false,
    }),
  ],
  server:{
    port: 8888,
  },
  resolve: {
    alias: {
      '@comps': resolve(__dirname, '.viteppress/theme/components') // 设置 `@` 指向 `src` 目录
    }
  },
};
export default config;