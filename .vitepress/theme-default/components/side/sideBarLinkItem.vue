<template>
  <ul class="sidebar-links">
    <li class="sidebar-link" v-for="item in data">
      <a class="sidebar-link-item"  :href="`#${item.title.toLowerCase()}`">{{ item.title }} </a>
      <SideBarLinkItem v-if="item.children" :data="item.children"></SideBarLinkItem>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { defineProps,ref } from 'vue';
  import { useRoute} from 'vitepress';
  const name=ref(null)
  const props = defineProps({
    data: {
      type: Object || Array,
      required: false,
    },
  });
   
</script>

<style scoped></style>
