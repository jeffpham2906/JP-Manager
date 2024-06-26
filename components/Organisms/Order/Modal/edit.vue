<template>
  <OrganismsOrderModal>
    <template #default="{ showModal }">
      <Button
        @click="showModal"
        frontIcon="i-material-symbols:edit-square-outline-rounded"
        text
        size="small"
      />
    </template>

    <template #header>Edit Order</template>
    <template #content="{ hideModal }">
      <OrganismsOrderFormEdit @close="hideModal" :id="id" @refresh="refresh" />
    </template>
  </OrganismsOrderModal>
</template>

<script setup lang="ts">
interface EditProps {
  id: number | null
  refresh: () => Promise<void>
}
defineProps<EditProps>()
</script>
