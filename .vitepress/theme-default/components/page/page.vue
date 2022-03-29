<!--
 * @Author: webhjc
 * @Date: 2021-12-05 16:36:58
 * @LastEditors: webhjc
 * @LastEditTime: 2022-03-27 21:35:27
 * @FilePath: /个人项目/blogPro/.vitepress/theme-default/components/page/page.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
-->
<template>
  <div class="page">
    <div class="container">
      <div class="content">
        <Content />
      </div>
      <div class="footer">
        <PageFooter />
      </div>
      <NextandPre />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import NextandPre from './NextandPre.vue';
  import PageFooter from './PageFooter.vue';
</script>
<style scoped lang="scss">
  .page {
    padding-top: var(--header-height);
  }
  .container {
    margin: 0 auto;
    padding: 0.5rem 2rem 1rem 2rem;
    width: calc(100% - var(--slug-width));
  }
  .content {
    padding-bottom: 1.5rem;
  }
  .footer {
    margin-top: 0.5rem;
  }
  @media (min-width: 768px) {
    .page {
      margin-left: 16.4rem;
    }
  }

  @media (max-width: 420px) {
    .content {
      /* fix carbon ads display */
      clear: both;
    }
  }
</style>
