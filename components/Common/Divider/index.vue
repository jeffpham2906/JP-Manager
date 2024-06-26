<template>
  <div
    class="h-px w-full bg-gray-200"
    :class="[{ 'my-5': size === 'medium' }]"
  ></div>
</template>

<script setup lang="ts">
type DividerSize = 'small' | 'medium' | 'large'
interface DividerProps {
  size: DividerSize
}

withDefaults(defineProps<DividerProps>(), { size: 'medium' })
</script>
