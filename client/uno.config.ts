import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerVariantGroup()],
});
