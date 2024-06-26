<template>
  <OrganismsOrderModal>
    <template #default="{ showModal }">
      <Button
        @click="showModal"
        front-icon="i-material-symbols:add-box-outline-rounded"
      >
        <span class="tablet:hidden"> {{ $t('create_order') }} </span>
      </Button>
    </template>

    <template #header> {{ $t('add_new_order') }} </template>
    <template #content="{ hideModal }">
      <OrganismsOrderFormCreate @close="hideModal" @on-created="refresh" />
    </template>
  </OrganismsOrderModal>
</template>

<script setup lang="ts">
defineProps<{
  refresh?: () => Promise<void>
}>()
</script>
