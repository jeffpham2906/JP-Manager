<template>
  <ClientOnly>
    <div class="flex items-center justify-center" v-bind="$attrs">
      <IconCSS :name="name" :size="size" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
defineProps<{
  size?: string
  name: string
}>()
</script>
