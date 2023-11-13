/*
 * @Author: tzyito
 * @Date: 2022-11-04
 * @LastEditTime: 2022-12-12
 * @LastEditors: tzyito
 * @Description:
 */

import { contextBridge } from "electron";
import { InvokeMethods } from "./container-resource/action-manager/invoke";
(() => {
  contextBridge.exposeInMainWorld("system", InvokeMethods);
})();
