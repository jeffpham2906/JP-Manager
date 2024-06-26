<template>
  <div class="myShadow flex h-full w-full flex-col rounded-md bg-slate-50 p-5">
    <slot />
  </div>
</template>

<script setup lang="ts">

// :class="[
//       {
//         'mx-auto h-[calc(100dvh-120px)] max-w-[calc(100dvw-320px)]':
//           !isNavCollapsed,
//       },
//     ]"
</script>
<style>
.myShadow {
  box-shadow: 0px 0px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>
