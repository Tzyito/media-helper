import { isPlainObject } from "../../shared";
import Store from "electron-store";

export interface StoreProperty {
  format: string;
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
        format: "bv*",
      },
    });
  }

  getConfig(key?: string, defaultValue?: any) {
    if (typeof key === "undefined" && typeof defaultValue === "undefined") {
      console.log(
        "this.ytDlpConfig.store: ",
        JSON.stringify(this.ytDlpConfig.store.format)
      );
      return this.ytDlpConfig.store.format;
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
