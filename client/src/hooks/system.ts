/*
 * @Author: tzyito
 * @Date: 2022-11-07
 * @LastEditTime: 2022-12-12
 * @LastEditors: tzyito
 * @Description:
 */

import { DownloadEvent } from "@/contant/invoke";
import { Ref } from "vue";
import { DownloadResult } from "../../../types/node/download";
import { Notify } from "quasar";
const win: any = window;
class System {
  on(event: string, cb: (...arg: any) => any) {
    return win.system.on(event, cb);
  }
  remove(event: string, cb?: (...arg: any) => any) {
    return win.system.remove(event, cb);
  }
  openFolder(folder: string) {
    console.log(folder, win.system);
    return win.system.openFolder(folder);
  }
  downloadVideo(url: string, id: number) {
    return win.system.downloadVideo(url, id);
  }
}

export const downloadVideo = async (
  url: string,
  r: Ref<DownloadResult>,
  loading: Ref<boolean>
): Promise<unknown> => {
  return new Promise(async (resolve, reject) => {
    if (!url) return;
    const system = new System();
    const timestamp = Date.now();
    const handler = (result: any) => {
      const [_, arr, id] = result;
      console.log("arr: ", arr, id);
      if (id !== timestamp) return;
      r.value = arr;
      if (r.value?.progress === 100) {
        loading.value = false;
      } else {
        loading.value = true;
      }
    };
    system.on(DownloadEvent.DownloadProgress, handler);
    try {
      console.log("等待获取路径");
      const res = await system.downloadVideo(url, timestamp);
      if (res?.code === -1) {
        Notify.create({
          position: "bottom",
          timeout: 1000,
          textColor: "white",
          message: res.msg,
          actions: [{ icon: "close", color: "white" }],
        });
        resolve(false);
      }
      resolve(true);
      console.log("开始下载", res);
    } catch (e) {
      console.log("render catch: ", e);
      reject(e);
    }
  });
};

export const openFileFolder = (url: string) => {
  return new Promise((res) => {
    const system = new System();
    system.openFolder(url);
    res(true);
  });
};
