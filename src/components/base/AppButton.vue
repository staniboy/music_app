<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    class="text-white rounded transition py-1 px-2"
    :class="colorClasses"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  color: {
    type: String,
    default: "gray",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    default: "button",
  },
});
const colorClasses = computed(
  () => `bg-${props.color}-600 hover:bg-${props.color}-700`
);
</script>

<style scoped></style>
