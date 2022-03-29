<template>
  <aside class="sidebar" :class="{ open: show }">
    <SideNav :headSide="headSide" />
    <ul v-if="sidebar?.length > 0" class="sidebar-links">
      <SideBarLink v-for="item of sidebar" :key="item.text" :item="item" />
    </ul>
  </aside>
</template>
<script lang="ts" setup>
  import { defineProps, onMounted, computed } from 'vue';
  import { useRoute, useData } from 'vitepress';
  import SideBarLink from './sideBarlink.vue';
  import cloneDeep from 'lodash/cloneDeep';
  import SideNav from './sideNav.vue';
  import { useActiveSidebarLinks } from '../../share/activeSidebarLink';
  defineProps({
    show: {
      type: Boolean,
      default: false,
    },
  });
  const data = useData();

  useActiveSidebarLinks();

  const route = useRoute();
  const isHome = computed(() => {
    return route.path === '/';
  });
  const items = cloneDeep(route.data?.headers as any);
  const sidebar = computed(() => {
    if (route.path.startsWith('/pages/')) {
      let str = route.path.split('/pages/');
      if(str.length){
       str= str[1].split('/')[0]
      }

      return data.theme.value.sidebar[`/pages/${str}`];
    }

    return [];
  });
  const headSide = computed(() => {
    return data.theme.value.nav;
  });
</script>
<style lang="scss" scoped>
  .sidebar {
    position: fixed;
    top: var(--header-height);
    bottom: 0;
    left: 0;
    z-index: var(--z-index-sidebar);
    border-right: 1px solid var(--c-divider);
    width: 16.4rem;
    background-color: var(--c-bg);
    overflow-y: auto;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
  }

  .sidebar.open {
    transform: translateX(0);
  }
  @media (min-width: 720px) {
    .sidebar {
      transform: translateX(0);
    }
  }
  .nav {
    display: block;
  }
  @media (min-width: 720px) {
    .nav {
      display: none;
    }
  }
</style>
