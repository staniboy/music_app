<template>
  <app-header />
  <router-view />
  <app-player />
  <app-auth></app-auth>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppAuth from "@/components/AppAuth.vue";
import { auth } from "@/includes/firebase";
import { mapWritableState } from "pinia";
import useUserStore from "@/stores/user";
import AppPlayer from "@/components/AppPlayer.vue";

export default {
  components: {
    AppHeader,
    AppAuth,
    AppPlayer,
  },
  computed: {
    ...mapWritableState(useUserStore, ["isLoggedIn"]),
  },
  created() {
    if (auth.currentUser) {
      this.isLoggedIn = true;
    }
  },
};
</script>

<style lang="scss" scoped></style>
