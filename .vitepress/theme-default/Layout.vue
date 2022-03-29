<template>
  <div class="theme" :class="pageClasses">
    <Nav @toggle="toggleSidebar" />
    <Home class="home" v-if="pageData.frontmatter.value.home ===true" />
    <!-- <template v-else > -->
      <Side :show="openSideBar"/>
       <div class="sidebar-mask" @click="toggleSidebar(false)" />
      <Page />
      <!-- </template>  -->
  </div>
  <!-- <Debug /> -->
</template>
<script setup lang="ts">
import { ref, computed, watch, defineAsyncComponent } from 'vue';
import { useRoute,useData } from 'vitepress';

import Nav from './components/nav/nav.vue';
import Home from './components/home/Home.vue';
import Side from './components/side/Side.vue';
import Page from './components/page/page.vue';

const route = useRoute();
const pageData=useData();
const openSideBar = ref(false);
const showSidebar = computed(() => {
  const { frontmatter={} } = route.data

  if (frontmatter.home || frontmatter.sidebar === false) {
    return false
  }
  return true
})
function toggleSidebar(to?: boolean){
openSideBar.value = typeof to === 'boolean' ? to : !openSideBar.value;
}
const hideSidebar = toggleSidebar.bind(null, false)
// close the sidebar when navigating to a different location
watch(route, hideSidebar)
const pageClasses = computed(() => {
  return [
    {
      'sidebar-open': openSideBar.value,
      'no-sidebar': !showSidebar.value
    }
  ]
})
</script>

