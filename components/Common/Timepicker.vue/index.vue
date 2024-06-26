<template>
  <VueDatePicker
    v-model="date"
    range
    :enable-time-picker="false"
    input-class-name="!border-slate-200 shadow-sm"
    menu-class-name="shadow-md"
    calendar-cell-class-name="!rounded-md"
    format="dd/MM/yyyy"
    :locale="$i18n.locale"
    @cleared="emit('cleared')"
  >
    <template #calendar-header="{ index }">
      <div v-if="index === 6">CN</div>
      <div v-else>T{{ index + 2 }}</div>
    </template>
    <template #left-sidebar="{ presetDate }">
      <div
        v-for="pre in presetDates"
        class="cursor-pointer whitespace-nowrap rounded-md px-2 py-1 transition-all hover:bg-blossom-200 hover:text-blossom-900"
        @click="presetDate && presetDate(pre.value)"
      >
        {{ pre.label }}
      </div>
    </template>
    <template #action-row="{ selectDate, closePicker }">
      <div class="flex w-full items-center justify-end gap-2">
        <Button size="small" text @click="closePicker">Cancel</Button>
        <Button size="small" class="select-button" @click="selectDate">
          Apply
        </Button>
      </div>
    </template>
  </VueDatePicker>
</template>

<script setup lang="ts">
import VueDatePicker, { type VueDatePickerProps } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
type TimePickerProps = {
  presetDates: any
} & VueDatePickerProps
defineProps<TimePickerProps>()
const date = defineModel({
  default: () => [new Date(), new Date()],
})
const emit = defineEmits<{
  (e: 'cleared'): void
}>()
</script>
<style>
.dp__range_start {
  @apply bg-blossom-600;
}
.dp__today {
  border: 1px solid;
  @apply border-blossom-600;
}
.dp__range_end {
  @apply bg-blossom-600;
}
</style>
