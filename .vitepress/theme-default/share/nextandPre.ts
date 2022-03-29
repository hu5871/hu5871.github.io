/*
 * @Author: webhjc
 * @Date: 2022-03-28 18:41:44
 * @LastEditors: webhjc
 * @LastEditTime: 2022-03-28 19:23:09
 * @FilePath: /个人项目/blogPro/.vitepress/theme-default/share/nextandPre.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
import { computed } from 'vue'
import { useData } from 'vitepress'
import { isArray, ensureStartingSlash, removeExtention } from '../utils'
import {getSideBarConfig,getFlatSideBarLinks} from  './sideBar'
// const route=useRoute()
// const data=useData()
// export const sidebar = computed(() => {
//   if (route.path.startsWith('/pages/')) {
//     const str = route.path.split('/pages/')[1]?.split('/')[0];
//     return data.theme.value.sidebar[`/pages/${str}`];
//   }

//   return [];
// });
export function useNextAndPrevLinks() {
const data = useData()
  const site=data.site
  const page = data.page

  const path = computed(() => {
    return removeExtention(ensureStartingSlash(page.value.relativePath))
  })

  const candidates = computed(() => {
    const config = getSideBarConfig(site.value.themeConfig.sidebar, path.value)

    return isArray(config) ? getFlatSideBarLinks(config) : []
  })

  const index = computed(() => {
    return candidates.value.findIndex((item) => {
      return item.link === path.value
    })
  })

  const next = computed(() => {
    if (
      site.value.themeConfig.nextLinks !== false &&
      index.value > -1 &&
      index.value < candidates.value.length - 1
    ) {
      return candidates.value[index.value + 1]
    }
  })

  const prev = computed(() => {
    if (site.value.themeConfig.prevLinks !== false && index.value > 0) {
      return candidates.value[index.value - 1]
    }
  })

  const hasLinks = computed(() => !!next.value || !!prev.value)

  return {
    next,
    prev,
    hasLinks
  }
}