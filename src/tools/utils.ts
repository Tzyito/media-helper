import { platform } from "os";
import { app } from "electron";
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
export const isDev = () => {
  return !app.isPackaged;
};
export function isPlainObject(variable) {
  return (
    typeof variable === "object" &&
    variable !== null &&
    !Array.isArray(variable)
  );
}
