<template>
  <div class="relative">
    <Upload v-model:modalValue="file" :loading="isLoading" />
    <Transition name="dropdown">
      <div
        v-if="file"
        class="absolute right-0 z-30 mt-1 w-48 rounded-md bg-white p-3 shadow-md"
      >
        <div class="mb-1 break-words">
          {{ file.name }}
        </div>
        <div class="flex justify-end gap-2">
          <Button size="small" text @click="file = null">Cancel</Button>
          <Button size="small" @click="handleImport(file)">Import</Button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Upload from './Form/Upload.vue'
const file = ref<File | null>()
const { isLoading, showLoading, hideLoading } = useLoading()
const emit = defineEmits<{
  (e: 'onSucess'): void
}>()
const handleImport = async (f: File) => {
  showLoading()
  const { $toast } = useNuxtApp()
  const formData = new FormData()
  formData.append('file', f)
  const res: { status: number; message: string } = await $fetch(
    '/api/importOrder',
    {
      method: 'POST',
      body: formData,
    }
  )
  if (res?.status === 200) {
    $toast.success('Import succes', { position: 'top-center' })
    emit('onSucess')
  } else {
    $toast.error(`Import error: ${res?.message}`)
  }
  file.value = null
  hideLoading()
}
</script>
