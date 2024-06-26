<template>
  <NuxtLayout>
    <NuxtPage
      :transition="{
        name: 'fadeup',
        mode: 'out-in',
        appear: true,
      }"
    />
  </NuxtLayout>
</template>
<script setup lang="ts"></script>
<style>
.fadeup-enter-active,
.fadeup-leave-active {
  transition: all 0.3s ease-in-out;
}

.fadeup-enter-from,
.fadeup-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
