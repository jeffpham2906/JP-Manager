<template>
  <div class="relative" v-click-out-side="() => (isDrop = false)">
    <slot :setDrop="setDrop"></slot>
    <Transition name="dropdown">
      <div
        v-if="isDrop"
        class="absolute right-0 z-30 mt-1 w-48 rounded-md bg-white p-3 shadow-md"
      >
        <slot name="panel"> </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { vClickOutSide } from '~/directives/clickOutSide'
const isDrop = ref(false)
const setDrop = (newValue: boolean) => {
  isDrop.value = newValue
}
</script>
