import { Dialog, QDialogOptions, QOptionGroupProps } from "quasar";
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

export function useComponentDialog(
  component: QDialogOptions["component"],
  componentProps: Pick<QDialogOptions, "componentProps">,
  options: Omit<QDialogOptions, "component" | "componentProps"> = {}
) {
  const defaultConfig: QDialogOptions = {
    component,
    componentProps,
  };
  const config = Object.assign(defaultConfig, options);
  const dialog = useDialog(config);
  return dialog;
}
