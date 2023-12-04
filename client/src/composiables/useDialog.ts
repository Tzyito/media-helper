import { Dialog, QDialogOptions } from "quasar";
import CustomDialog from "@/components/Dialog/index.vue";
import { type Component } from "vue";
import { DialogProps } from "@/components/Dialog/types";
export function useDialog(options: QDialogOptions = {}) {
  const defaultConfig: QDialogOptions = {
    title: "Dialog",
    message: "this is a message",
    color: "deep-orange-4",
    html: false,
    dark: true,
  };
  const config = Object.assign(defaultConfig, options);
  const instance = Dialog.create(config);
  return instance;
}

export function useComponentDialog<T>(
  component: Component,
  dialogProps: DialogProps,
  innerProps: T,
  options: Omit<QDialogOptions, "component" | "componentProps"> = {}
) {
  const defaultConfig: QDialogOptions = {
    component: CustomDialog,
    componentProps: {
      component,
      dialogProps,
      innerProps,
    },
  };
  const config = Object.assign(defaultConfig, options);
  const dialog = Dialog.create(config);
  return dialog;
}
