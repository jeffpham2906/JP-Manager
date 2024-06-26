<template>
  <Modal
    v-model="isShow"
    position="right"
    width="w-full max-w-[600px]"
    heigh="h-screen"
    transitionName="fadeLeft"
  >
    <slot :showModal="showModal">
      <Button
        @click="isShow = true"
        front-icon="i-material-symbols:add-box-outline-rounded"
      >
        <span class="tablet:hidden">Label </span>
      </Button>
    </slot>

    <template #content>
      <div class="flex h-full w-full flex-col">
        <div class="flex justify-between">
          <span class="font-medium">
            <slot name="header">Header</slot>
          </span>
          <Button
            front-icon="i-material-symbols:close-rounded"
            size="small"
            rounded
            severity="secondary"
            @click="isShow = false"
          />
        </div>
        <Divider />
        <slot name="content" :hideModal="hideModal" :showModal="showModal">
          Form
        </slot>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isShow = ref(false)
const hideModal = () => (isShow.value = false)
const showModal = () => (isShow.value = true)
</script>
