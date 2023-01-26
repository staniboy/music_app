import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Audio Sink",
        short_name: "Audio Sink",
        description: "Share Your Audio Files",
        theme_color: "#ff5e3a",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "assets/img/pwa-192x192.png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{html,css,js,png,jpg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/use\.fontawesome\.com/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "font-awesome",
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts",
            },
          },
        ],
      },
    }),
    visualizer({ open: false }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
