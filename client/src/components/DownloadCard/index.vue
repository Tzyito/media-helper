<script lang="ts" setup>
import { DownloadResult } from "../../../../types/node/download";
const props = defineProps<DownloadResult>({
  progress: String,
  downloadSpeed: String,
});
</script>
<template>
  <q-card w-50 bg="[var(--m-bg-color)]">
    <!-- <img :src="result?.cover" alt="" /> -->
    <div h-30 bg-white leading-30 text-center text-black text-4>
      暂不支持缩略图
    </div>
    <q-linear-progress size="sm" :value="progress / 100" />
    <q-card-section>
      <div>下载进度：{{ progress }}%</div>
      <div>下载速率：{{ downloadSpeed }}</div>
    </q-card-section>
  </q-card>
</template>
