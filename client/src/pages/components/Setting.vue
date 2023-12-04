<script lang="ts" setup>
import { useComponentDialog } from "@/composiables/useDialog";
import { onMounted, reactive } from "vue";
import FromComponent from "./Options.vue";
import { getConfigData } from "@/hooks/system";

const formBind = reactive([
  { type: "toggle", value: false, label: "是否包括音频", prop: "-o" },
  { type: "input", value: false, label: "是否包括ban", prop: "-w" },
  { type: "input", value: true, label: "是否包括k", prop: "-k" },
]);

const handleOption = () => {
  const dialog = useComponentDialog(
    FromComponent,
    {
      class: "title-dialog",
      title: "设置",
    },
    {
      form: formBind,
    }
  );
  return dialog;
};

onMounted(async () => {
  console.log("setConfigData", await getConfigData());
});
</script>
<template>
  <div fixed right-10 bottom-10>
    <q-btn round dense flat size="lg" icon="settings" @click.key="handleOption">
    </q-btn>
  </div>
</template>
