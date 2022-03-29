<template>
  <div class="nav-dropdown-link">
    <button class="button"
            @click="toggle">
      <span class="button-text">{{text }}</span>
      <span class="button-arrow" />
    </button>
    <ul class="dialog">
      <li v-for="item in modelValue"
          :key="item.text"
          class="dialog-item">
        <div class="nav-dropdown-link-item">
          <a class="item"
             :href="item.link">
            <span class="arrow" />
            <span class="text">{{ item.text }}</span>
            <span class="icon">
              <OutboundLink />
            </span>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, PropType, ref, watch } from 'vue';
import { useRoute } from 'vitepress';
import OutboundLink from '../icons/OutboundLink.vue'
interface List {
  text?: string;
  link?: string;
}
const props = defineProps({
  modelValue: {
    type: Array as PropType<List[]>,
  },
  text: {
    type: String,
  },
});

const route = useRoute();

const open = ref(false);

watch(
  () => route.path,
  () => {
    open.value = false;
  }
);

function toggle() {
  open.value = !open.value;
}
</script>
<style lang="scss" scoped>
.nav-dropdown-link {
  position: relative;
  height: 36px;
  overflow: hidden;
  cursor: pointer;
}

.nav-dropdown-link.open {
  height: auto;
}
.dialog {
  margin: 0;
  padding: 0;
  list-style: none;
}
.button {
  display: block;
  border: 0;
  padding: 0 1.5rem;
  width: 100%;
  text-align: left;
  line-height: 36px;
  font-family: var(--font-family-base);
  font-size: 1rem;
  font-weight: 600;
  color: var(--c-text);
  white-space: nowrap;
  background-color: transparent;
  cursor: pointer;
}

.button:focus {
  outline: 0;
}

.button-arrow {
  display: inline-block;
  margin-top: -1px;
  margin-left: 8px;
  border-top: 6px solid #ccc;
  border-right: 4px solid transparent;
  border-bottom: 0;
  border-left: 4px solid transparent;
  vertical-align: middle;
}
.item {
  display: block;
  padding: 0 1.5rem 0 2.5rem;
  line-height: 32px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--c-text);
  white-space: nowrap;
  text-decoration: none;
  &:hover{
    color: #0e80ed;
  }
}

@media (min-width: 720px) {
  .nav-dropdown-link {
    height: auto;
    overflow: visible;
  }

  .nav-dropdown-link:hover .dialog {
    display: block;
  }
  .button {
    border-bottom: 2px solid transparent;
    padding: 0;
    line-height: 24px;
    font-size: 0.9rem;
    font-weight: 500;
  }
  .item {
    padding: 0 24px 0 12px;
    line-height: 32px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--c-text);
    white-space: nowrap;
  }

  .item.active .arrow {
    opacity: 1;
  }

  .arrow {
    display: inline-block;
    margin-right: 8px;
    border-top: 6px solid #ccc;
    border-right: 4px solid transparent;
    border-bottom: 0;
    border-left: 4px solid transparent;
    vertical-align: middle;
    opacity: 0;
    transform: translateY(-2px) rotate(-90deg);
  }
}

@media (min-width: 720px) {
  .button-arrow.right {
    transform: rotate(0);
  }

}

@media (min-width: 720px) {
  .dialog {
    display: none;
    position: absolute;
    top: 26px;
    right: -8px;
    border-radius: 6px;
    padding: 12px 0;
    min-width: 128px;
    background-color: var(--c-bg);
    box-shadow: var(--shadow-3);
  }
}
</style>