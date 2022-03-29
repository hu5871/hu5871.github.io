<!--
 * @Author: webhjc
 * @Date: 2022-03-27 19:30:19
 * @LastEditors: webhjc
 * @LastEditTime: 2022-03-27 19:40:00
 * @FilePath: /个人项目/blogPro/.vitepress/theme-default/components/side/sideBarLinkItem.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <ul class="sidebar-links">
    <li class="sidebar-link" v-for="item in data">
      <a class="sidebar-link-item"  :href="`#${item.title.toLowerCase()}`">{{ item.title }} </a>
      <SideBarLinkItem v-if="item.children" :data="item.children"></SideBarLinkItem>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import { useRoute} from 'vitepress';

  const props = defineProps({
    data: {
      type: Object || Array,
      required: false,
    },
  });
   
</script>

<style scoped></style>
