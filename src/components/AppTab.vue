<template>
  <div v-if="id === selectedTabId">
    <slot></slot>
  </div>
</template>

<script>
//import { v4 as uuidv4 } from "uuid";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isActive: true,
    };
  },
  inject: ["selectedTabId"],
};
</script>
