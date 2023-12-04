<script lang="ts" setup>
import { downloadVideo, openFileFolder } from "@/hooks/system";
import { Ref, computed, ref } from "vue";
import useTranslation from "@/composiables/useI18n";
import { DownloadResult } from "../../../types/node/download";
import Setting from "./components/Setting.vue";

const { t } = useTranslation();
const placeholder = computed(() => t("download.inputTextPlaceholder"));

const url = ref("");
const mediaList: Ref<Ref<DownloadResult>[]> = ref([]);

const hasFocused = ref(false);
const loading = ref(false);
// const a = "https://www.youtube.com/watch?v=sRs2o36a1Us&ab_channel=DrakeVEVO";
const handleDownload = async () => {
  console.log("loading.value", loading.value);
  if (loading.value || !url.value) return;
  loading.value = true;
  const temp = ref<any>({
    progress: 0,
    totalSize: "",
    downloadSpeed: "",
    folder: "",
    cover: "",
  });
  const success = await downloadVideo(url.value, temp, loading);
  console.log("success:", success);
  if (!success) return;
  mediaList.value.push(temp);
  url.value = "";
};

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
    <div h="170" mt-10 overflow-y-auto p-5>
      <div grid="~ gap4" grid-cols="5">
        <q-card
          v-for="(item, index) in mediaList"
          :key="index"
          w-50
          bg="[var(--m-bg-color)]"
          hover="shadow-[0_10px_15px_-3px_var(--m-boxbg-color)] -translate-y-2"
          transition-all
        >
          <div h-30 bg-white leading-30 text-center text-black text-4>
            {{ t("download.downloadInfo.img_err") }}
          </div>
          <q-linear-progress
            size="sm"
            :value="Number(item.value.progress) / 100"
          />
          <q-card-section>
            <template v-if="Number(item.value.progress) !== 100">
              <div>
                <span>{{ t("download.downloadInfo.progress") }}</span>
                <span>{{ item.value.progress }}%</span>
              </div>
              <div>
                <span>{{ t("download.downloadInfo.speed") }}</span>
                <span>{{ item.value.downloadSpeed }}</span>
              </div>
            </template>
            <template v-else>
              <div flex="~ col" justify-center items-center>
                <span mb-2>{{ t("download.downloadInfo.down_success") }}</span>
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
  <setting />
</template>
<style lang="scss" scoped>
:deep(.q-field--dense .q-field__label) {
  top: 4px !important;
}
.download-dialog {
  box-shadow: none !important;
}
</style>
