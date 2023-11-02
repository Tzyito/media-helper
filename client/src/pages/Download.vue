<script lang="ts" setup>
import { downloadVideo, openFileFolder } from "@/hooks/system";
import { Ref, computed, ref } from "vue";
import useTranslation from "@/composiables/useI18n";
import { DownloadResult } from "../../../types/node/download";

const { t } = useTranslation();
const placeholder = computed(() => t("download.inputTextPlaceholder"));

const url = ref("");
const mediaList: Ref<Ref<DownloadResult>[]> = ref([]);

const hasFocused = ref(false);
const loading = ref(false);
// const a = "https://www.youtube.com/watch?v=sRs2o36a1Us&ab_channel=DrakeVEVO";
const handleDownload = () => {
  if (loading.value) return;
  loading.value = true;
  const temp = ref<any>({
    progress: 0,
    totalSize: "",
    downloadSpeed: "",
    folder: "",
    cover: "",
  });
  mediaList.value.push(temp);
  downloadVideo(url.value, temp, loading);
  url.value = "";
};
const a = ref({ a: 1 });
const state: Ref[] = [];
state.push(a);
const handleOpen = (path: string) => {
  openFileFolder(path);
};
</script>
<template>
  <div h-full>
    <div my-0 mx-auto :class="hasFocused ? 'w-80%' : 'w-40%'" transition-width>
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
          <q-btn
            v-if="!url"
            :loading="loading"
            round
            dense
            flat
            icon="send"
            @click.key="handleDownload"
          >
            <template #loading>
              <q-spinner-gears />
            </template>
          </q-btn>
        </template>
      </q-input>
    </div>
    <div h="170" mt-10>
      <div grid="~ gap2">
        <q-card
          v-for="(item, index) in mediaList"
          :key="index"
          w-50
          bg="[var(--m-bg-color)]"
          hover="shadow-[0_10px_15px_-3px_var(--m-boxbg-color)] -translate-y-2"
          transition-all
        >
          <div h-30 bg-white leading-30 text-center text-black text-4>
            暂不支持缩略图
          </div>
          <q-linear-progress
            size="sm"
            :value="Number(item.value.progress) / 100"
          />
          <q-card-section>
            <template v-if="Number(item.value.progress) !== 100">
              <div>下载进度：{{ item.value.progress }}%</div>
              <div>下载速率：{{ item.value.downloadSpeed }}</div>
            </template>
            <template v-else>
              <div flex="~ col" justify-center items-center>
                <span mb-2>文件下载成功!</span>
                <q-btn
                  color="primary"
                  @click="handleOpen(item.value.folder)"
                  label="点击打开"
                />
              </div>
            </template>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.q-field--dense .q-field__label) {
  top: 4px !important;
}
</style>
