import path from "node:path";
import { isPlainObject } from "../../tools/utils";
import Store from "electron-store";
import { app } from "electron";

export interface StoreProperty {
  output: string;
}
class StoreManager {
  private ytDlpConfig: Store<StoreProperty>;
  constructor() {
    this.initYtDlp();
  }

  initYtDlp() {
    this.ytDlpConfig = new Store({
      name: "yt-dlp",
      defaults: {
        output: `${app.getPath("downloads")}/%(title)s.%(ext)s`,
      },
    });
  }

  getConfig(key?: string, defaultValue?: any) {
    if (typeof key === "undefined" && typeof defaultValue === "undefined") {
      return this.ytDlpConfig.store;
    }
    return this.ytDlpConfig.get(key, defaultValue);
  }

  setConfig(config?: { key: string; value: any }) {
    if (typeof config === "undefined" && isPlainObject(config)) {
      this.ytDlpConfig.set(config);
    }
    const { key, value } = config;
    return this.ytDlpConfig.set(key, value);
  }
}

export const store = new StoreManager();
export default StoreManager;
