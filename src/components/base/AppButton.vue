<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    class="text-white rounded transition py-1.5 px-5"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    default: "button",
  },
});
</script>
<style></style>
