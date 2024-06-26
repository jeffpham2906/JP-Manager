<template>
  <input
    :checked="value"
    type="checkbox"
    class="accent-blossom-600 border-blossom-600 w-4 h-4"
  />
</template>

<script setup lang="ts">
defineProps<{
  value?: boolean
}>()
</script>
