import { UserConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';
import Icons, { ViteIconsResolver } from 'vite-plugin-icons';
import Components, { AntDesignVueResolver } from 'vite-plugin-components';
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
        ViteIconsResolver({
          componentPrefix: '',
        }),
        // AntDesignVueResolver()
      ],
    }),
    Icons(),
    WindiCSS({
      preflight: false,
    }),
  ],
  resolve: {
    alias: {
      '@comps': resolve(__dirname, '.viteppress/theme/components') // 设置 `@` 指向 `src` 目录
    }
  },
};
export default config;