<template>
  <label
    for="import-order"
    class="relative flex cursor-pointer items-center justify-center rounded-md px-3 py-2 ring-1 ring-inset ring-blossom-300 transition-all hover:shadow-md hover:ring-blossom-400"
  >
    <div class="text-blossom-950">Import</div>
    <Spin v-if="loading" size="small" class="ml-1.5" />
    <input
      v-on:change="handleFileChange"
      type="file"
      name="import-order"
      id="import-order"
      class="absolute inset-0 h-0 w-0"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
  </label>
</template>

<script setup lang="ts">
interface UploadProps {
  loading?: boolean
}
defineProps<UploadProps>()
const file = ref<File | null>(null)
const emit = defineEmits<{
  (e: 'update:modalValue', newValue: File | null): void
}>()

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    file.value = target.files[0]
    emit('update:modalValue', file.value)
  }
}
</script>
