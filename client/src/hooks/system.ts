/*
 * @Author: tzyito
 * @Date: 2022-11-07
 * @LastEditTime: 2022-12-12
 * @LastEditors: tzyito
 * @Description:
 */

import { DownloadEvent } from "@/contant/invoke";
import { Ref } from "vue";
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

export const downloadVideo = (url: string, r: Ref): void => {
  const system = new System();
  system.on(DownloadEvent.DownloadVideo, (result) => {
    const [_, arr] = result;
    r.value = arr;
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
