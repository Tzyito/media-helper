/*
 * @Author: tzyito
 * @Date: 2022-10-28
 * @LastEditTime: 2023-01-17
 * @LastEditors: tzyito
 * @Description:
 */
import { screen, BrowserWindow, globalShortcut, app } from "electron";
import * as path from "path";
import { ActionManager } from "./container-resource/action-manager";

let win;
export const getCurrentWindow = () => {
  return win as BrowserWindow;
};
const createWindow = () => {
  const display = screen.getPrimaryDisplay();
  win = new BrowserWindow({
    width: Math.min(1024, display.workAreaSize.width),
    height: Math.min(768, display.workAreaSize.height),
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: true,
    },
  });
  // development
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    win.loadFile(path.join(__dirname, "../client/dist/index.html"));
  } else {
    win.loadURL("http://127.0.0.1:4455");
  }
  const ret = globalShortcut.register("Command+I", () => {
    console.log("Command+I is pressed");
    win.webContents.openDevTools({ mode: "bottom" });
  });
  ActionManager();
};

app.whenReady().then(() => {
  createWindow();
});
