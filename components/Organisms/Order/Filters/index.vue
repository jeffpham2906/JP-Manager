<template>
  <div class="flex gap-2">
    <InputGroup
      v-model="search"
      icon="i-material-symbols:search"
      class="w-full min-w-28 max-w-64"
      placeholder="Search by seller sku"
    />
    <TimepickerVue
      v-model="timeRange"
      class="min-w-28 max-w-64"
      :presetDates="presetDates"
      @cleared="timeRange = null"
    />
  </div>
</template>

<script setup lang="ts">
import type { PageType } from '~/composables/usePaging'
import { presetDates } from './presetDates'

interface OrderFilterProps {
  paginate: PageType
}
const props = defineProps<OrderFilterProps>()
const { filter } = props.paginate
const { filter: filterQ, search: searchQ } = props.paginate.getQuery()
const search = ref<string>(searchQ as string)

const debouceSeacrh = debounce(
  async () => await props.paginate.setSearch(search.value),
  300
)
watch(search, () => debouceSeacrh())

const timeRange = ref<[Date, Date] | null>(
  filterQ?.created_time
    ? [filterQ.created_time.gte, filterQ.created_time.lte]
    : (presetDates.at(4)?.value as [Date, Date])
)

const setTimeRange = (trigger?: boolean) => {
  const filterObj = { ...filter.value }
  if (timeRange.value) {
    filterObj['created_time'] = {
      gte: timeRange.value[0],
      lte: timeRange.value[1],
    }
  } else {
    delete filterObj['created_time']
  }
  props.paginate.setFilter(filterObj, trigger)
}

watch(timeRange, () => setTimeRange())

onMounted(() => {
  setTimeRange(false)
  props.paginate.setSearch(search.value, false)
})
</script>
