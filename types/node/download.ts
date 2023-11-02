export interface DownloadResult {
  progress: number;
  /** download file size */
  totalSize: string;
  downloadSpeed: string;
  /** download path folder */
  folder: string;
  cover?: string;
}

export interface VideoInfo {
  cover?: string;
  name?: string;
  id: string | number;
}
