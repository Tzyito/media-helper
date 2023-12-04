<script lang="ts" setup>
import { QDialog, useDialogPluginComponent } from "quasar";
import { Ref } from "vue";

const props = defineProps<{
  dialogRef: Ref<QDialog>;
  form: any;
}>();
const emits = defineEmits([...useDialogPluginComponent.emits]);

const onSubmit = () => {
  console.log("form", props.form);
  emits("ok", props.form);
};
</script>
<template>
  <q-form @submit="onSubmit" w-100 px-10 mx-auto>
    <div v-for="(item, index) in props.form" :key="index">
      <q-toggle
        v-model="item.value"
        color="green"
        left-label
        :label="item.label"
      />
    </div>
    <q-btn label="Submit" type="submit" color="primary" />
  </q-form>
</template>
<style lang="scss" scoped>
:deep(.q-toggle) {
  width: 100%;
  .q-toggle__label {
    margin-right: 50px;
  }
}
</style>
