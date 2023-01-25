<template>
  <ul class="flex flex-wrap mb-4">
    <li v-for="tab in tabs" :key="tab.title" class="flex-auto text-center">
      <a
        class="block rounded py-3 px-4 transition"
        :class="{
          'text-white bg-blue-600 hover:text-white': active === tab,
          'hover:text-blue-600': active !== tab,
        }"
        href="#"
        @click="activate(tab)"
        >{{ tab.title }}</a
      >
    </li>
  </ul>
  <slot></slot>
</template>

<script>
import { computed } from "vue";

export default {
  name: "AppTabs",
  data() {
    return {
      active: null,
      tabs: [],
    };
  },
  methods: {
    activate(tab) {
      this.active = tab;
    },
  },
  provide() {
    return {
      register: (tab) => {
        this.tabs.push(tab);
        if (!this.active) this.activate(tab);
        return {
          active: computed(() => this.active === tab),
          unregister: () => {
            const index = this.tabs.indexOf(tab);
            this.tabs.splice(index, 1);
            if (this.active === tab) this.activate(this.tabs[0]);
          },
        };
      },
    };
  },
};
</script>
