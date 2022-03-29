<template>
  <div class="edit-link">
    <a
      v-if="!isHome"
      class="link"
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ text }} <OutboundLink class="icon" />
    </a>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useRoute} from "vitepress"
import OutboundLink from '../icons/OutboundLink.vue'

const isHome = computed(() => {
  return useRoute().path==='/'
})
const url='https://github.com/hu5871/hu5871.github.io'
const text='为此页提供修改建议'

</script>

<style scoped>
.link {
  display: inline-block;
  font-size: 1rem;
  font-weight: 500;
  color: var(--c-text-light);
}

.link:hover {
  text-decoration: none;
  color: var(--c-brand);
}

.icon {
  margin-left: 4px;
}
</style>
