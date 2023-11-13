import { ipcMain } from "electron";
import AllInvokeAction from "./invokeAction";
export const ActionManager = () => {
  const channelPools: Map<string, Function> = new Map();

  function init() {
    const ipcHandleEvent = getInvokeMethodActions();
    Object.entries({ ...ipcHandleEvent }).forEach((item) => {
      const [channelName, event] = item;
      if (event.ipcCaptureEventType === "on") {
        registerOn(channelName, event.handle);
      } else if (event.ipcCaptureEventType === "handle") {
        registerHandle(
          channelName,
          event.handle as (...args: any[]) => Promise<any>
        );
      }
    });
  }

  function registerHandle(
    channelName: string,
    handle: (...args: any[]) => Promise<any>
  ) {
    if (channelPools.has(channelName)) {
      throw new Error(`[${channelName}]ipc channel 已被注册！`);
    }
    ipcMain.handle(channelName, async (_, ...args: any[]) => {
      return await handle(_, args);
    });
    channelPools.set(channelName, handle);
  }

  function registerOn(
    channelName: string,
    handle: (envent: Electron.IpcMainEvent, ...args: any[]) => void
  ) {
    if (channelPools.has(channelName)) {
      throw new Error(`[${channelName}]ipc channel 已被注册！`);
    }
    ipcMain.on(channelName, async (_, ...args: any[]) => {
      return await handle(_, args);
    });
    channelPools.set(channelName, handle);
  }

  function getInvokeMethodActions() {
    return AllInvokeAction;
  }

  init();
};
