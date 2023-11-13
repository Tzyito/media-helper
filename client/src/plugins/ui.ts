import { type App } from "vue";
import { Notify, Quasar } from "quasar";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/dist/quasar.css";

export default function loadImgPerview(app: App) {
  app.use(Quasar, {
    plugins: {
      Notify,
    },
  });
}
