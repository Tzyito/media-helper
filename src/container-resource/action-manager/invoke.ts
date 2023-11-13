import { DownloadEvent, SystemEvent } from "../../contant/invoke";
import { ipcRenderer } from "electron";

export const InvokeMethods = {
  downloadVideo: async (url: string, id: number) => {
    return await ipcRenderer.invoke(DownloadEvent.DownloadVideo, url, id);
  },
  openFolder: async (folder: string) => {
    return await ipcRenderer.send(SystemEvent.OpenFolder, folder);
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
