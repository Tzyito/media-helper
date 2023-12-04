<template>
  <q-dialog ref="dialogRef" v-bind="props.dialogProps">
    <q-card dark flat>
      <q-bar dark class="bg-primary text-white">
        <div>
          <q-btn
            dense
            flat
            round
            icon="lens"
            size="8.5px"
            color="red"
            @click="onDialogCancel"
          ></q-btn>
        </div>
        <div v-if="dialogProps.title" class="col text-center text-weight-bold">
          {{ dialogProps.title }}
        </div>
      </q-bar>
      <q-card-section>
        <component
          :is="props.component"
          v-bind="injectProps"
          @hide="onDialogCancel"
          @ok="onDialogOK"
        ></component>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, type Component } from "vue";
import { DialogProps } from "./types";
import { useDialogPluginComponent } from "quasar";

const props = defineProps<{
  component: Component;
  dialogProps: DialogProps;
  innerProps: any;
}>();
defineEmits([...useDialogPluginComponent.emits]);
const { dialogRef, onDialogCancel, onDialogOK } = useDialogPluginComponent();
const injectProps = computed(() => {
  return {
    dialogRef,
    ...props.innerProps,
  };
});
</script>
<style lang="scss"></style>
