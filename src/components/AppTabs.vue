<template>
  <ul class="flex flex-wrap mb-4">
    <li v-for="tab in tabs" :key="tab.id" class="flex-auto text-center">
      <a
        class="block rounded py-3 px-4 transition"
        :class="{
          'text-white bg-blue-600 hover:text-white': selectedTabId === tab.id,
          'hover:text-blue-600': selectedTabId !== tab.id,
        }"
        href="#"
        @click="selectTab(tab.id)"
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
      selectedTabId: "",
    };
  },
  computed: {
    tabs() {
      return this.$slots.default().map((tab) => {
        return { title: tab.props.title, id: tab.props.id };
      });
    },
  },
  methods: {
    selectTab(id) {
      this.selectedTabId = id;
    },
  },
  provide() {
    return {
      selectedTabId: computed(() => this.selectedTabId),
    };
  },
  mounted() {
    this.selectedTabId = this.tabs[0].id;
  },
};
</script>
