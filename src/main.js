import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import VeeValidatePlugin from "@/includes/validation.js";
import { auth } from "@/includes/firebase";
import i18n from "@/includes/i18n";
import { registerSW } from "virtual:pwa-register";
import GlobalComponents from "@/includes/_globals";
import progressBar from "./includes/progress-bar";

import "./assets/base.css";
import "./assets/main.css";
import "nprogress/nprogress.css";

registerSW({ immediate: true });
progressBar(router);

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.config.unwrapInjectedRef = true; // For provide/inject reactivity. Can be removed after Vue 3.3
    app.use(i18n);
    app.use(GlobalComponents);
    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.mount("#app");
  }
});
