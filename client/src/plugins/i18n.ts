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
    downloadInfo: {
      progress: "下载进度：",
      speed: "下载速率：",
      down_success: "文件下载成功!",
      img_err: "暂不支持缩略图",
    },
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
    downloadInfo: {
      progress: "Progress：",
      speed: "Speed：",
      down_success: "File download successful!",
      img_err: "Thumbnails are not supported yet",
    },
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
