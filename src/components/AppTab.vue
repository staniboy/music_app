<template>
  <div v-if="active">
    <slot></slot>
  </div>
</template>

<script>
import { reactive, toRef } from "vue";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  inject: ["register"],
  data() {
    const tab = reactive({ title: toRef(this, "title") });
    return this.register(tab);
  },
  unmounted() {
    this.unregister();
  },
};
</script>
