<template>
  <ul class="flex flex-wrap mb-4">
    <li class="flex-auto text-center">
      <a
        class="block rounded py-3 px-4 transition"
        :class="{
          'text-white bg-blue-600 hover:text-white': modelValue === 'login',
          'hover:text-blue-600': modelValue !== 'login',
        }"
        href="#"
        @click.prevent="$emit('update:modelValue', 'login')"
        >Login</a
      >
    </li>
    <li class="flex-auto text-center">
      <a
        class="block rounded py-3 px-4 transition"
        :class="{
          'text-white bg-blue-600 hover:text-white': modelValue === 'register',
          'hover:text-blue-600': modelValue !== 'register',
        }"
        href="#"
        @click.prevent="$emit('update:modelValue', 'register')"
        >Register</a
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: "AppTabs",
  props: ["modelValue"],
  emits: ["update:modelValue"],
};
</script>
