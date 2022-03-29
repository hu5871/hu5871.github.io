<template>
  <div class="nav-link">
    <template v-for="item in navList" :key="item.text">
      <div class="item" v-if="item.children">
        <NavDropdown class="navDrop" v-model="item.children" :text="item.text" />
      </div>
      <template v-else>
        <a class="item" :href="item.link">{{ item.text }}</a>
      </template>
    </template>
    <button class="nav-btn" aria-label="Toggle Theme" @click="toggle">
      <riMoonLine v-if="isDark" />
      <riSunLine v-else />
      <span class="iconify" data-icon="ri:sun-line"></span>
    </button>
  </div>
  <div class="nav-mini">
    <button class="nav-btn" aria-label="Toggle Theme" @click="toggle">
      <riMoonLine v-if="isDark" />
      <riSunLine v-else />
      <span class="iconify" data-icon="ri:sun-line"></span>
    </button>
  </div>
</template>
<script lang="ts" setup>
  import { computed, defineProps } from 'vue';
  import NavDropdown from './navDropdown.vue';
  import { useData } from 'vitepress';
  import { useDark, useToggle } from '@vueuse/core';
  import riMoonLine from '../icons/riMoonLine.vue';
  import riSunLine from '../icons/riSunLine.vue';
  const props = defineProps({
    modelValue: {
      type: Array,
    },
  });

  const isDark = useDark({
    storageKey: 'naive-ui-admin-color-scheme',
    valueLight: 'light',
  });
  const toggle = useToggle(isDark);

  const { theme } = useData();

  const navList = computed(() => props.modelValue || theme.value.nav);
</script>

<style lang="scss" scoped>
  .nav-link,
  .nav-mini {
    display: flex;
    font-weight: 500;
    align-items: center;
  }
  .item {
    padding: 0 24px 0 12px;
    // line-height: 1;
    font-size: 1rem;
    font-weight: 500;
    color: var(--c-text);
    white-space: nowrap;
    text-decoration: none;
  }

  .nav-btn {
    display: flex;
    font-size: 1.05rem;
    border: 0;
    outline: none;
    background: none;
    color: var(--c-text);
    opacity: 0.8;
    cursor: pointer;
  }
  .nav-btn:hover {
    color: #249ffe;
  }
  .nav-btn:hover {
    opacity: 1;
  }
  .nav-btn svg {
    margin: auto;
  }
  @media (min-width: 720px) {
    .nav-mini {
      display: none;
    }
  }
  @media (max-width: 720px) {
    .nav-link {
      display: none;
    }
  }
</style>
