<template>
  <ul>
    <MenuNode
      v-for="node in options"
      :key="node.key"
      :node="node"
      :activeMenuKey="activeMenuKey"
    />
  </ul>
</template>

<script setup lang="ts">
import type { MenuNode } from './menu'
defineProps<{
  options: MenuNode[]
  activeMenuKey: string
}>()
</script>
