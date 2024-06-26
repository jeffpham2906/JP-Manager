<template>
  <div class="relative flex h-dvh w-dvw bg-gray-100" ref="appContainer">
    <SideBar class="tablet:hidden" />
    <div class="flex grow flex-col">
      <Header />
      <div class="grow p-5 tablet:w-screen">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from '~/layouts/Page/SideBar/index.vue'
import Header from '~/layouts/Page/Header/index.vue'

const appContainer = ref<HTMLDivElement>()
</script>
