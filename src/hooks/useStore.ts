import { store } from "../container-resource/store-manager";
export const useConfigJson = () => {
  return store.getConfig();
};

export const getConfigJsonArray = (config = useConfigJson()) => {
  let result = [];
  Object.entries(config).forEach((item) => {
    const [key, value] = item;
    result.push(...["--" + key, value]);
  });
  return result;
};
