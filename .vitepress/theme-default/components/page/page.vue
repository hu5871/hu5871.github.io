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
