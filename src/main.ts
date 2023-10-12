/*
 * @Author: tzyito
 * @Date: 2022-10-28
 * @LastEditTime: 2023-01-17
 * @LastEditors: tzyito
 * @Description:
 */
const { app, BrowserWindow, globalShortcut } = require("electron");
import { dialog, ipcMain, shell } from "electron";
import * as path from "path";
import { DownloadEvent, SystemEvent } from "./contant/invoke";
import { YtDlp } from "./python";

let win;
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
  });
  win.loadFile(path.join(__dirname, "../client/dist/index.html"));
  const ret = globalShortcut.register("Command+I", () => {
    console.log("Command+I is pressed");
    win.webContents.openDevTools({ mode: "right" });
  });
  ipcMain.on(SystemEvent.OpenFolder, (_, folder) => {
    console.log("folder: ", folder);
    if (!folder) return;
    shell.showItemInFolder(folder);
  });
  ipcMain.on(DownloadEvent.DownloadVideo, (_, url) => {
    const folderPaths = dialog.showOpenDialogSync({
      title: "Select Folder",
      properties: ["openDirectory"],
    });
    console.log("folderPaths: ", folderPaths);
    let targetPath = "";
    let instance = null;
    if (folderPaths === undefined) {
      return;
    } else {
      targetPath = folderPaths[0];
      console.log("输出：", `${targetPath}/%(title)s.%(ext)s`);
      instance = new YtDlp(url, {
        args: ["-o", `${targetPath}/%(title)s.%(ext)s`],
        folderPath: targetPath,
      });
    }
    let result = {
      progress: 0,
      totalSize: 0,
      downloadSpeed: 0,
      folder: "",
    };
    instance.onStdOut("data", (data) => {
      // 解析 yt-dlp 输出，查找下载进度信息
      console.log(data);
      const downloadMatch = data.match(/\[download]\s/);
      const progressMatch = data.match(
        /\[download\]\s+([\d.]+)% of\s+([\d.]+(G|M|K)iB) at\s+([\d.]+(G|M|K)iB\/s)/
      );
      const folderMatch = data.match(/\[download\] Destination: (.*)/);
      if (!downloadMatch) return;
      if (progressMatch) {
        result.progress = progressMatch[1];
        result.totalSize = progressMatch[2];
        result.downloadSpeed = progressMatch[4];
        console.log(
          `Download Progress: ${result.progress} (${result.downloadSpeed}), Total Size: ${result.totalSize}`
        );
      }
      if (folderMatch && folderMatch[1]) {
        console.log(folderMatch[1]);
        result.folder = folderMatch[1];
      }
      win.webContents.send(DownloadEvent.DownloadVideo, result);

      // 可以根据需要解析其他信息，如标题、时长等
    });
  });
};

app.whenReady().then(() => {
  createWindow();
});
