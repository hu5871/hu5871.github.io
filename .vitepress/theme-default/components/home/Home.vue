<template>
  <div class="home">
    <div class="pre">
      <div class="figure">
        <img class="image" :src="log" />
        <div class="motto animate__animated animate__bounce">为成长买单</div>
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
      height: 22rem;
    }
    .figure {
      padding: 0 1.5rem;
    }
    .motto {
      text-align:center;
      margin-top:2rem;
      font-weight: 700;
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
