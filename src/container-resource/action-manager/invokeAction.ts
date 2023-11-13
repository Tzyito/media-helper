import { DownloadEvent, SystemEvent } from "../../contant/invoke";
import { dialog, shell } from "electron";
import * as fs from "fs";
import { downloadDlp } from "../download";

type ipcCaptureEvent = "on" | "handle";
export interface InvokeAction<EventType extends ipcCaptureEvent> {
  ipcCaptureEventType: EventType;
  handle: (
    envent: EventType extends "on"
      ? Electron.IpcMainEvent
      : Electron.IpcMainInvokeEvent,
    ...args: any[]
  ) => EventType extends "on" ? void : Promise<any>;
}
export const InvokeMethodsAction: Record<
  string,
  InvokeAction<ipcCaptureEvent>
> = {
  [SystemEvent.OpenFolder]: {
    ipcCaptureEventType: "on",
    handle: async (event, folder: string) => {
      console.log("folder: ", folder);
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
  ...InvokeMethodsAction,
};
