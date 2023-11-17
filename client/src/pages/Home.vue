<script lang="ts" setup>
import SideBar from "@/components/SideBar/SideBar.vue";
</script>
<template>
  <div h-screen w-full flex overflow-hidden>
    <side-bar></side-bar>
    <div
      mt-4
      mx-4
      p-10
      bg="[var(--m-second-color)]"
      w-full
      rounded-t-4
      relative
    >
      <router-view></router-view>
    </div>
  </div>
</template>
