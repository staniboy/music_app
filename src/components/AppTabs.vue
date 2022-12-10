<template>
  <ul class="flex flex-wrap mb-4">
    <li v-for="tab in tabs" :key="tab" class="flex-auto text-center">
      <a
        class="block rounded py-3 px-4 transition"
        :class="{
          'text-white bg-blue-600 hover:text-white': selectedTab === tab,
          'hover:text-blue-600': selectedTab !== tab,
        }"
        href="#"
        @click="selectTab(tab)"
        >{{ tab }}</a
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
      selectedTab: "",
      tabs: [],
    };
  },
  methods: {
    selectTab(name) {
      this.selectedTab = name;
    },
  },
  provide() {
    return {
      selectedTabProvider: computed(() => this.selectedTab),
      tabsProvider: this.tabs,
    };
  },
  mounted() {
    this.selectedTab = this.tabs[0];
  },
};
</script>
