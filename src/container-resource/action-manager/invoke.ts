import { DownloadEvent, SystemEvent } from "../../contant/invoke";
import { ipcRenderer } from "electron";

/**
 * 这里暴露所有preload方法，不使用remote模块防止引起性能以及安全问题
 * invoke 异步返回Promise
 * send 异步无返回值
 */
export const InvokeMethods = {
  downloadVideo: async (url: string, id: number) => {
    return await ipcRenderer.invoke(DownloadEvent.DownloadVideo, url, id);
  },
  openFolder: async (folder: string) => {
    return await ipcRenderer.send(SystemEvent.OpenFolder, folder);
  },
  getStoreConfig: async (key: string) => {
    return await ipcRenderer.send(SystemEvent.GetStoreConfig, key);
  },
  getSyncStoreConfig: async (key: string) => {
    return await ipcRenderer.invoke(SystemEvent.GetSyncStoreConfig, key);
  },
  setStoreConfig: async (key: string, value: any) => {
    return await ipcRenderer.send(SystemEvent.SetStoreConfig, key, value);
  },
  setSyncStoreConfig: async (key: string, value: any) => {
    return await ipcRenderer.invoke(SystemEvent.SetStoreConfig, key, value);
  },
  on: (event, cb) => {
    ipcRenderer.on(event, (...args) => {
      cb(args);
    });
  },
  remove: (event, cb) => {
    ipcRenderer.removeListener(event, cb);
  },
};
