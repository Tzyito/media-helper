import { platform } from "os";
export enum Platform {
  WIN32 = "win32",
  MAC = "darwin",
  LINUX = "linux",
}
export const isWin = () => {
  return platform() === Platform.WIN32;
};
export const isLinux = () => {
  return platform() === Platform.LINUX;
};
export const isMacOS = () => {
  return platform() === Platform.MAC;
};
