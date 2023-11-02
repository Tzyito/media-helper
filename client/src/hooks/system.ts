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
const win: any = window;
class System {
  on(event: string, cb: (...arg: any) => any) {
    return win.system.on(event, cb);
  }
  openFolder(folder: string) {
    console.log(folder, win.system);
    return win.system.openFolder(folder);
  }
  downloadVideo(url: string) {
    win.system.downloadVideo(url);
  }
}

export const downloadVideo = (
  url: string,
  r: Ref<DownloadResult>,
  loading: Ref<boolean>
): void => {
  const system = new System();
  system.on(DownloadEvent.DownloadVideo, (result) => {
    const [_, arr] = result;
    console.log("arr: ", arr);
    r.value = arr;
    if (r.value?.progress === 100) {
      loading.value = false;
    } else {
      loading.value = true;
    }
  });
  system.downloadVideo(url);
};

export const openFileFolder = (url: string) => {
  return new Promise((res) => {
    const system = new System();
    system.openFolder(url);
    res(true);
  });
};
