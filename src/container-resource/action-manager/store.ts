import { SystemEvent } from "../../contant/invoke";
import { InvokeActionProps } from "./invokeAction";
import { store } from "../store-manager";

export default {
  [SystemEvent.GetStoreConfig]: {
    ipcCaptureEventType: "on",
    async handle(_, key) {
      const value = await store.getConfig(key);
      console.log(`get[${key}]: ${value}`);
    },
  },
  [SystemEvent.GetSyncStoreConfig]: {
    ipcCaptureEventType: "handle",
    handle(_, key) {
      let value;
      if (!key) {
        value = store.getConfig();
        console.log(`sync get config: ${value}`);
      } else {
        value = store.getConfig(key);
        console.log(`sync get[${key}]: ${value}`);
      }
      return value;
    },
  },
  [SystemEvent.SetStoreConfig]: {
    ipcCaptureEventType: "on",
    async handle(event, key, value) {
      try {
        await store.setConfig({ key, value });
        console.log(`set[${key}]: ${value}`);
        event.sender.send("on-set-config", true);
      } catch (e) {
        event.sender.send("on-set-config", false);
      }
    },
  },
  [SystemEvent.SetSyncStoreConfog]: {
    ipcCaptureEventType: "handle",
    async handle(_, key, value) {
      try {
        await store.setConfig({ key, value });
        console.log(`sync set[${key}]: ${value}`);
        return {
          code: 200,
          msg: "success!",
        };
      } catch (e) {
        return {
          code: -1,
          msg: e,
        };
      }
    },
  },
} as InvokeActionProps;
