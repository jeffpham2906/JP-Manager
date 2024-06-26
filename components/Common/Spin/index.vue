<template>
  <div
    class="animate-spin rounded-full border-4 border-gray-100 border-l-blossom-600"
    :class="[{ 'h-5 w-5': size === 'small' }, { 'h-6 w-6': size === 'medium' }]"
    v-if="visible"
  ></div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
type SpinSize = 'small' | 'medium' | 'large'
withDefaults(
  defineProps<{
    visible?: boolean
    size?: SpinSize
  }>(),
  {
    visible: true,
    size: 'medium',
  }
)
</script>
