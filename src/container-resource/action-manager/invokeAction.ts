import { DownloadEvent, SystemEvent } from "../../contant/invoke";
import { dialog, shell } from "electron";
import * as fs from "fs";
import { downloadDlp } from "../download";
import store from "./store";

// export enum ipcCaptureEvent {
//   /** ipc send handler */
//   on = "on",
//   /** ipc invoke handler */
//   handle = "handle",
// }
export type ipcCaptureEvent = "on" | "handle";
export interface InvokeAction<EventType extends ipcCaptureEvent> {
  ipcCaptureEventType: EventType;
  handle: (
    envent: EventType extends "on"
      ? Electron.IpcMainEvent
      : Electron.IpcMainInvokeEvent,
    ...args: any[]
  ) => EventType extends "on" ? void : Promise<any>;
}
export type InvokeActionProps = Record<string, InvokeAction<ipcCaptureEvent>>;

export const InvokeMethodsAction: InvokeActionProps = {
  [SystemEvent.OpenFolder]: {
    ipcCaptureEventType: "on",
    handle: async (event, folder: string) => {
      if (!folder) return;
      try {
        fs.accessSync(folder, fs.constants.F_OK);
        shell.showItemInFolder(folder);
        event.sender.send("reply", "done");
      } catch (e) {
        dialog.showErrorBox("Error", "File does not exist!");
      }
    },
  },
  [DownloadEvent.DownloadVideo]: {
    ipcCaptureEventType: "handle",
    handle: async (_, url: string, id: number) => {
      const folderPaths = dialog.showOpenDialogSync({
        title: "Select Folder",
        properties: ["openDirectory"],
      });
      if (!folderPaths) {
        return {
          code: -1,
          msg: "not found folder!",
        };
      } else {
        downloadDlp(folderPaths, url, id);
      }
    },
  },
};

export default {
  ...store,
  ...InvokeMethodsAction,
};
