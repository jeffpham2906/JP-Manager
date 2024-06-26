<template>
  <textarea
    v-if="type === 'textarea'"
    v-model="model"
    v-bind="$attrs"
    class="block w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm placeholder:text-sm focus:outline-none"
  ></textarea>
  <input
    v-else
    v-model="model"
    v-bind="$attrs"
    class="block w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm placeholder:text-sm focus:outline-none"
  />
</template>

<script setup lang="ts">
interface InputProps {
  type?: string
}
defineProps<InputProps>()
const model = defineModel('input')
</script>
