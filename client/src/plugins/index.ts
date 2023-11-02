import { type App } from "vue";
import loadQuasar from "./ui";
import loadI18N from "./i18n";

export default function loadPlugins(app: App) {
  loadQuasar(app);
  loadI18N(app);
}
