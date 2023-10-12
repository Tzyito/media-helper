import { createApp } from "vue";
import loadPlugins from "./plugins";
import Router from "@/router/index";
import App from "./App.vue";
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";

const app = createApp(App);
/** 加载全局插件 */
loadPlugins(app);

app.use(Router);
app.mount("#app");
