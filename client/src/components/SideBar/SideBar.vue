<script lang="ts" setup>
import Icon from "./Icon.vue";
import Link from "../Link/index.vue";
import useTranslation from "@/composiables/useI18n";
const { t } = useTranslation();
const links = [
  {
    title: t("sideBarLink['1']"),
    name: "Download",
  },
  {
    title: t("sideBarLink['2']"),
    name: "Compression",
  },
  {
    title: t("sideBarLink['3']"),
    name: "Separation",
  },
];
</script>
<template>
  <div w-70>
    <Icon />
    <div relative flex="~ col" items-center justify-center>
      <Link
        w-55
        px-2
        py-4
        my-4
        v-for="(link, index) in links"
        :key="index"
        :title="link.title"
        :name="link.name"
      ></Link>
    </div>
  </div>
</template>
