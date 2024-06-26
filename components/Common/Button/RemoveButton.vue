<template>
  <div class="flex items-center justify-center">
    <Modal v-model="isDeleteConfirm" class="rounded-md">
      <template #content>
        <div>
          <h3 class="mb-3">{{ title }}</h3>
          <div class="flex items-center justify-evenly">
            <Button class="w-20" text @click="handleYesClick">
              {{ $t('Yes') }}
            </Button>
            <Button class="w-20" @click="isDeleteConfirm = false">
              {{ $t('No') }}
            </Button>
          </div>
        </div>
      </template>
    </Modal>
    <Button
      text
      size="small"
      @click="isDeleteConfirm = true"
      :loading="isLoading"
    >
      <template #backIcon v-if="!isLoading">
        <Icon name="i-material-symbols:delete-outline-rounded" size="18" />
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
interface RemoveButtonProps {
  id?: number | null
  data?: any
  title?: string
  action?: (id: number) => Promise<void>
  loading?: boolean
}
const props = defineProps<RemoveButtonProps>()
const isDeleteConfirm = ref(false)

const { isLoading, showLoading, hideLoading } = useLoading()
const handleYesClick = async () => {
  showLoading()
  isDeleteConfirm.value = false
  if (props.action && props.id) {
    await props.action(props.id)
  }
  hideLoading()
}
</script>
