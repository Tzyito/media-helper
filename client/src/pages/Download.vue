<script lang="ts" setup>
import { downloadVideo, openFileFolder } from "@/hooks/system";
import { ref } from "vue";

const url = ref("");
const result = ref();
// const a = "https://www.youtube.com/watch?v=sRs2o36a1Us&ab_channel=DrakeVEVO";
const handleDownload = () => {
  // console.log(url.value);
  downloadVideo(url.value, result);
};
const handleOpen = () => {
  openFileFolder(result.value.folder);
};
</script>
<template>
  <div>
    <q-input v-model="url" placeholder="请输入资源地址" clearable></q-input>
    <q-btn color="primary" @click="handleDownload" label="开始下载" />
    <q-btn color="primary" @click="handleOpen" label="打开" />
    <template v-if="result">
      <div>进度：{{ result.progress }}</div>
      <div>总大小：{{ result.totalSize }}</div>
      <div>下载速率：{{ result.downloadSpeed }}</div>
      <div>文件保存路径：{{ result.folder }}</div>
    </template>
  </div>
</template>
