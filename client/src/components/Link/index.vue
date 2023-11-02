<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const props = defineProps({
  title: String,
  params: Object,
  name: String,
});
const handleJumpLink = () => {
  router.push({ name: props.name, params: props.params });
};

const activeMenu = (activeName: string) => {
  return route.name === activeName;
};
</script>
<template>
  <div
    text-3.5
    cursor-pointer
    py-10
    px-5
    text-center
    hover:bg="[var(--m-second-color)]"
    rounded-8
    :class="activeMenu(props.name!) && 'bg-[var(--m-second-color)]'"
    @click="handleJumpLink"
  >
    <span>{{ props.title }}</span>
  </div>
</template>
