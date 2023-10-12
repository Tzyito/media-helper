import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { join } from "path";
import { platform } from "os";
export class YtDlp {
  url: string;
  path = join(__dirname, this.getPlatform);
  private ytDlpProcess: ChildProcessWithoutNullStreams;
  constructor(url, options = { args: [], folderPath: process.cwd() }) {
    this.url = url;
    const args = ["--progress", "-f", "b"];
    this.ytDlpProcess = spawn(this.path, [...options.args, ...args, url], {
      cwd: options.folderPath,
    });
    // this.ytDlpProcess = exec(`${this.path} --progress -f b ${this.url}`);
  }
  get getPlatform() {
    const map = {
      win32: "./yt-dlp_win.exe",
      darwin: "./yt-dlp_mac",
      linux: "./yt-dlp_linux",
    };
    return map[platform()];
  }
  onStdOut(event, cb) {
    this.ytDlpProcess.stdout.on(event, (data) => {
      cb(data.toString());
    });

    this.ytDlpProcess.stderr.on("data", (data) => {
      // 输出错误信息
      console.error(`${this.path} error: ${data}`);
    });

    this.ytDlpProcess.on("close", (code) => {
      // yt-dlp 进程关闭
      console.log(`${this.path} process exited with code ${code}`);
    });
  }
}
