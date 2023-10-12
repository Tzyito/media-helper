/*
 * @Author: tzyito
 * @Date: 2022-11-04
 * @LastEditTime: 2022-12-12
 * @LastEditors: tzyito
 * @Description:
 */

import { contextBridge, ipcRenderer } from "electron";
(() => {
  contextBridge.exposeInMainWorld("system", {
    downloadVideo: (url: string) => {
      ipcRenderer.send("downloadVideo", url);
    },
    openFolder: (folder: string) => {
      ipcRenderer.send("openFolder", folder);
    },
    on: (event, cb) => {
      ipcRenderer.on(event, (...args) => {
        cb(args);
      });
    },
  });
})();
