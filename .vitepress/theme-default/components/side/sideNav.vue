<!--
 * @Author: webhjc
 * @Date: 2022-03-27 23:07:05
 * @LastEditors: webhjc
 * @LastEditTime: 2022-03-27 23:18:44
 * @FilePath: /个人项目/blogPro/.vitepress/theme-default/components/side/sideNav.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->

<template>
  <nav class="nav-links nav">
    <div  v-for="item in headSide">
        <SideNavDown v-if="item?.children" :item="item" />
      <div class="nav-link" v-else>
        <a class="item" :href="item.link">{{ item.text }}</a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import SideNavDown from './sideNavDown.vue';
  const props = defineProps({
    headSide: {
      type: Array,
      default: () => [],
    },
  });
</script>

<style scoped>
  .item {
    display: block;
    padding: 0 1.5rem;
    line-height: 36px;
    font-size: 1rem;
    font-weight: 600;
    color: var(--c-text);
    white-space: nowrap;
  }

  .item:hover,
  .item.active {
    text-decoration: none;
    color: var(--c-brand);
  }

  .item.external:hover {
    border-bottom-color: transparent;
    color: var(--c-text);
  }
  .nav-links {
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--c-divider);
  }

  @media (min-width: 720px) {
    .nav-links {
      display: flex;
      padding: 6px 0 0;
      align-items: center;
      border-bottom: 0;
    }

    .item + .item {
      padding-left: 24px;
    }
  }
  @media (min-width: 720px) {
    .item {
      border-bottom: 2px solid transparent;
      padding: 0;
      line-height: 24px;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .item:hover,
    .item.active {
      border-bottom-color: var(--c-brand);
      color: var(--c-text);
    }
  }
</style>
