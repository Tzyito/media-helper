import { isPlainObject } from "@/shared";
import Store from "electron-store";

export interface StoreProperty {
  format: string;
}

export default class StoreManager {
  private ytDlpConfig: Store<StoreProperty>;
  constructor() {
    this.initYtDlp();
  }

  initYtDlp() {
    this.ytDlpConfig = new Store({
      name: "yt-dlp",
      defaults: {
        format: "bv*",
      },
    });
  }

  getConfig(key, defaultValue) {
    if (!arguments.length) return this.ytDlpConfig.store;
    return this.ytDlpConfig.get(key, defaultValue);
  }

  setConfig(...args) {
    if (args.length === 1 && isPlainObject(args)) {
      this.ytDlpConfig.set(args as object);
    }
    const [key, value] = args;
    return this.ytDlpConfig.set(key, value);
  }
}
