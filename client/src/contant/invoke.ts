/*
 * @Author: tzyito
 * @Date: 2022-11-04
 * @LastEditTime: 2022-11-07
 * @LastEditors: tzyito
 * @Description:
 */
export enum SystemEvent {
  OpenFolder = "openFolder", // 打开文件夹
  GetStoreConfig = "getStoreConfig", // 获取数据
  GetSyncStoreConfig = "getSyncStoreConfog", // 同步获取数据
  SetStoreConfig = "setStoreConfig", // 设置数据
  SetSyncStoreConfog = "setSyncStoreConfog", // 同步设置数据
}

export enum IpcRenderChannel {
  ShowPathsList = "showPathsList", // 获取路径列表
}

export enum DownloadEvent {
  DownloadVideo = "downloadVideo",
  DownloadProgress = "downloadProgress",
}
