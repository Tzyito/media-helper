import { type App } from "vue";
import loadQuasar from "./ui";

export default function loadPlugins(app: App) {
  loadQuasar(app);
}
