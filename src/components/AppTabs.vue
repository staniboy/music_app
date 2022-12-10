<template>
  <ul class="flex flex-wrap mb-4">
    <li v-for="tab in tabs" :key="tab" class="flex-auto text-center">
      <a
        class="block rounded py-3 px-4 transition"
        :class="{
          'text-white bg-blue-600 hover:text-white': modelValue === tab,
          'hover:text-blue-600': modelValue !== tab,
        }"
        href="#"
        @click.prevent="$emit('update:modelValue', tab)"
        >{{ tab }}</a
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: "AppTabs",
  props: ["modelValue", "tabs"],
  emits: ["update:modelValue"],
};
</script>
