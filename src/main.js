import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import VeeValidatePlugin from "@/includes/validation.js";
import { auth } from "@/includes/firebase";

import "./assets/base.css";
import "./assets/main.css";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.config.unwrapInjectedRef = true; // For provide/inject reactivity. Can be removed after Vue 3.3
    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.mount("#app");
  }
});
