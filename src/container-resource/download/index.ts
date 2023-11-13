import { DownloadEvent } from "../../contant/invoke";
import { YtDlp } from "../../python";
import { getCurrentWindow } from "../../main";

export const downloadDlp = (folderPaths, url, id) => {
  let targetPath = "";
  let instance = null;
  const win = getCurrentWindow();
  targetPath = folderPaths[0];
  console.log("输出：", `${targetPath}/%(title)s.%(ext)s`);
  instance = new YtDlp(url, {
    args: ["-o", `${targetPath}/%(title)s.%(ext)s`],
    folderPath: targetPath,
  });
  let result = {
    progress: 0,
    totalSize: "",
    downloadSpeed: "",
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
      result.progress = +progressMatch[1];
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
    win.webContents.send(DownloadEvent.DownloadVideo, result, id);

    // 可以根据需要解析其他信息，如标题、时长等
  });
};
