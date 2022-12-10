<template>
  <div v-if="title === selectedTabProvider">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Tab",
    },
  },
  data() {
    return {
      isActive: true,
    };
  },
  inject: ["tabsProvider", "selectedTabProvider"],
  created() {
    this.tabsProvider.push(this.title);
  },
};
</script>
