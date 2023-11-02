<script lang="ts" setup>
// import { downloadVideo, openFileFolder } from "@/hooks/system";
import { computed, ref } from "vue";
import useTranslation from "@/composiables/useI18n";
const { t } = useTranslation();
const placeholder = computed(() => t("download.inputTextPlaceholder"));

const url = ref("");
const result = ref();
const hasFocused = ref(false);
// const a = "https://www.youtube.com/watch?v=sRs2o36a1Us&ab_channel=DrakeVEVO";
const handleDownload = () => {
  console.log(url.value);
  // downloadVideo(url.value, result);
};
// const handleOpen = () => {
//   openFileFolder(result.value.folder);
// };
</script>
<template>
  <div h-full flex items-center justify-center>
    <div :class="hasFocused ? 'w-200' : 'w-84'" transition-width>
      <q-input
        c="[var(--m-text-color)]"
        h-8
        v-model="url"
        :dense="true"
        :label="placeholder"
        clearable
        dark
        @keypress.enter="handleDownload"
        @focus="() => (hasFocused = true)"
        @blur="() => (hasFocused = false)"
      >
        <template #append>
          <q-icon
            v-if="!url"
            round
            dense
            flat
            name="send"
            @click.key="handleDownload"
          />
        </template>
      </q-input>
      <!-- <q-btn color="primary" @click="handleDownload" label="开始下载" />
      <q-btn color="primary" @click="handleOpen" label="打开" /> -->
      <template v-if="result">
        <div>进度：{{ result.progress }}</div>
        <div>总大小：{{ result.totalSize }}</div>
        <div>下载速率：{{ result.downloadSpeed }}</div>
        <div>文件保存路径：{{ result.folder }}</div>
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep .q-field--dense .q-field__label {
  top: 4px !important;
}
</style>
