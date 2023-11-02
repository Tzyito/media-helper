import { App } from "vue";
import { createI18n } from "vue-i18n";
const zh = {
  sideBarLink: {
    1: "下载视频",
    2: "压缩视频",
    3: "伴奏分离",
  },
  download: {
    inputTextPlaceholder: "输入资源链接，启动魔法! 🧙",
  },
};
const en = {
  sideBarLink: {
    1: "download video",
    2: "compression video",
    3: "accompaniment separation",
  },
  download: {
    inputTextPlaceholder: "Enter the resource link to start the magic! 🧙",
  },
};
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "zh",
  fallbackLocale: "en",
  messages: {
    en,
    zh,
  },
});
export default function loadI18N(app: App) {
  app.use(i18n);
}
