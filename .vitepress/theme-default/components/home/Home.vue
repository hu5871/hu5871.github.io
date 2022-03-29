<!--
 * @Author: webhjc
 * @Date: 2021-12-03 03:29:14
 * @LastEditors: webhjc
 * @LastEditTime: 2022-03-30 00:32:28
 * @FilePath: /个人项目/blogPro/.vitepress/theme-default/components/home/Home.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <div class="home">
    <div class="pre">
      <div class="figure">
        <img class="image"
             :src="log" />
      </div>
      <div>
      </div>
    </div>
    <HomeFeature />
  </div>
</template>
<script lang="ts" setup>
import HomeFeature from './homeFeature.vue';
import log from '../../public/img/log.jpg';
</script>

<style scoped lang="scss">
.home {
  padding-top: var(--header-height);
  overflow: hidden;
  .pre {
    // width: 21rem;
    margin: 3rem 0rem 0.9rem 0rem; 
    height: 15rem;
  }
  .figure {
    padding: 0 1.5rem;
  }
  .image {
    display: block;
    margin: 0 auto;
    width: auto;
    max-width: 100%;
    max-height: 280px;
  }
}
</style>