<!--
 * @Author: webhjc
 * @Date: 2021-12-03 16:46:48
 * @LastEditors: webhjc
 * @LastEditTime: 2022-03-27 01:48:53
 * @FilePath: /个人项目/blogPro/.vitepress/theme-default/components/nav/nav.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <header class="nav-bar">
    <div class="showSide"  @click="$emit('toggle')"><MenuOutlined /></div>
    <div @click="go('/')">
      <span>前端博客</span>
    </div>
    <div class="flex-grow" />
    <NavLink />
  </header>
</template>
<script lang="ts" setup>
import {defineEmits,computed} from 'vue';
import NavLink from './navLink.vue';
import {MenuOutlined} from '@ant-design/icons-vue';
import {useRouter,useRoute} from 'vitepress';
defineEmits(['toggle'])

const {go}=useRouter()
const route= useRoute()
// console.log(route);


const isHome=computed(()=>{
  return route.path==='/'
})
</script>
<style lang="scss" scoped>
.nav-bar{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
     display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid  rgba(84, 84, 88, 0.48);
    height: var(--header-height);
    padding: 0.7rem 1.5rem 0.7rem 4rem;
     background-color: var(--c-bg);
     z-index: 999;
}
.showSide{
  margin-left: -2rem;
  margin-right: 1rem;
  font-weight: 500;
  font-size: 1.5rem;
}
 .flex-grow {
    flex-grow: 1;
  }
  @media screen and  (min-width:720px) {
    .showSide{
      display: none;
    }
  }
</style>