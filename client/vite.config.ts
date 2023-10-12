import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { transformAssetUrls } from "@quasar/vite-plugin";

export default defineConfig({
  plugins: [vue({ template: { transformAssetUrls } }), UnoCSS()],
  base: process.env.NODE_ENV === "production" ? "./" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
