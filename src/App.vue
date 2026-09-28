<script setup>
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease, filter 0.4s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
  filter: blur(6px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  filter: blur(6px);
}
</style>