export enum SystemEvent {
  OpenFolder = "openFolder", // 打开文件夹
  GetStoreConfig = "getStoreConfig", // 获取数据
  GetSyncStoreConfig = "getSyncStoreConfog", // 同步获取数据
  SetStoreConfig = "setStoreConfig", // 设置数据
  SetSyncStoreConfog = "setSyncStoreConfog", // 同步设置数据
}

export enum DownloadEvent {
  DownloadVideo = "downloadVideo",
  DownloadProgress = "downloadProgress",
}
