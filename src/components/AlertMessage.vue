<template>
  <div
    v-if="show"
    class="text-white text-center font-bold p-4 mb-4 rounded"
    :class="color"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "AlertMessage",
  props: {
    show: {
      default: false,
      type: Boolean,
    },
    color: {
      default: "bg-blue-500",
      type: String,
    },
    message: {
      default: "This is default message use message prop to change it.",
      type: String,
    },
  },
};
</script>
