<template>
  <div class="hidden tablet:block">
    <Modal
      v-model="isShow"
      position="left"
      class="!p-0"
      transition-name="fadeRight"
    >
      <Icon
        name="i-material-symbols:dehaze-rounded"
        size="20"
        class="p-0.5"
        @click="isShow = true"
      />
      <template #content>
        <SideBar />
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import SideBar from './index.vue'
const isShow = ref(false)
</script>
