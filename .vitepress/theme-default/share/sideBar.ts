/*
 * @Author: webhjc
 * @Date: 2022-03-28 19:02:08
 * @LastEditors: webhjc
 * @LastEditTime: 2022-03-28 19:08:28
 * @FilePath: /个人项目/blogPro/.vitepress/theme-default/share/sideBar.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */

import { isArray, ensureStartingSlash, removeExtention } from '../utils'

namespace DefaultTheme {
  export type SideBarItem = SideBarLink | SideBarGroup
  export type SideBarConfig = SideBarItem[] | 'auto' | false
  export interface MultiSideBarConfig {
    [path: string]: SideBarConfig
  }
  export interface SideBarLink {
    text: string
    link: string
  }
  export interface SideBarGroup {
    text: string
    link?: string

    /**
     * @default false
     */
    collapsable?: boolean

    children: SideBarItem[]
  }
}
export function isSideBarConfig(
  sidebar: DefaultTheme.SideBarConfig | DefaultTheme.MultiSideBarConfig
): sidebar is DefaultTheme.SideBarConfig {
  return sidebar === false || sidebar === 'auto' || isArray(sidebar)
}

export function isSideBarGroup(
  item: DefaultTheme.SideBarItem
): item is DefaultTheme.SideBarGroup {
  return (item as DefaultTheme.SideBarGroup).children !== undefined
}

export function isSideBarEmpty(sidebar?: DefaultTheme.SideBarConfig): boolean {
  return isArray(sidebar) ? sidebar.length === 0 : !sidebar
}

/**
 * Get the `SideBarConfig` from sidebar option. This method will ensure to get
 * correct sidebar config from `MultiSideBarConfig` with various path
 * combinations such as matching `guide/` and `/guide/`. If no matching config
 * was found, it will return `auto` as a fallback.
 */
export function getSideBarConfig(
  sidebar: DefaultTheme.SideBarConfig | DefaultTheme.MultiSideBarConfig,
  path: string
): DefaultTheme.SideBarConfig {
  if (isSideBarConfig(sidebar)) {
    return sidebar
  }

  path = ensureStartingSlash(path)

  for (const dir in sidebar) {
    // make sure the multi sidebar key starts with slash too
    if (path.startsWith(ensureStartingSlash(dir))) {
      return sidebar[dir]
    }
  }

  return 'auto'
}

/**
 * Get flat sidebar links from the sidebar items. This method is useful for
 * creating the "next and prev link" feature. It will ignore any items that
 * don't have `link` property and removes `.md` or `.html` extension if a
 * link contains it.
 */
export function getFlatSideBarLinks(
  sidebar: DefaultTheme.SideBarItem[]
): DefaultTheme.SideBarLink[] {
  return sidebar.reduce<DefaultTheme.SideBarLink[]>((links, item) => {
    if (item.link) {
      links.push({ text: item.text, link: removeExtention(item.link) })
    }

    if (isSideBarGroup(item)) {
      links = [...links, ...getFlatSideBarLinks(item.children)]
    }

    return links
  }, [])
}