<template>
  <li class="sidebar-link">
    <p class="sidebar-link-item" v-if="title">{{ title }} </p>
    <ul class="sidebar-links" >
     <li class="sidebar-link" v-for="item in item?.children" :key="item.text">

    <a class="sidebar-link-item" :class="{active:item.link===pathFlags}" :href="item.link">{{ item.text }}</a>
      <SideBarLinkItem  v-if="item.link === pathFlags" :data="data"></SideBarLinkItem>
  </li>
  </ul>
  </li>
 
</template>

<script lang="ts" setup>
  import { defineProps, computed, watch, onMounted } from 'vue';
  import { useRoute, useData } from 'vitepress';
  import { cloneDeep } from 'lodash';
  import { joinUrl, isActive } from '../../utils';
  import SideBarLinkItem from './sideBarLinkItem.vue'

  const props = defineProps({
    item: {
      type: Object || Array,
    },
  });
  const title = props.item?.text;
  const link=props.item?.link
  const route = useRoute();
  const pathFlags = computed(() => {
    return route.path.split('.')[0];
  });
  interface Total {
    level?: number;
    children?: Total[];
    slug?: string;
    title?: string;
  }
  const data = computed(() => {
    const list = cloneDeep(useData().page.value.headers);
    let idx: number;
    const arr = list.reduce((total, item, index) => {
      if (item.level === 2) {
        item.children = [];
        total.push(item);
        idx = total.length - 1;
      }
      else if (item.level === 3 && idx>=0) {
        total[idx].children.push(item);
      }else{
        total.push(item);
      }
      return total;
    }, [] as Total[]);
    return arr;
  });
</script>
