import { createApp } from "vue";
import loadPlugins from "./plugins";
import Router from "@/router/index";
import App from "./App.vue";
/** load style */
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import "@/assets/styles/global.css";

const app = createApp(App);
/** 加载全局插件 */
loadPlugins(app);

app.use(Router);
app.mount("#app");
