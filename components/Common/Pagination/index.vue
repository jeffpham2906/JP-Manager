<template>
  <div class="flex justify-between gap-5 overflow-auto">
    <div class="flex items-center">
      <Button
        text
        frontIcon="i-material-symbols:arrow-back-ios-rounded"
        size="small"
        :disabled="!canMoveBack"
        @click="goFirst"
      />

      <Button
        text
        size="small"
        class="-ml-1 mr-1"
        :disabled="!canMoveBack"
        @click="goPre"
      >
        Pre
      </Button>
      <div class="flex items-center gap-0.5">
        <Button
          v-for="(item, index) in displayedItems"
          :key="`${item}-${index}`"
          size="small"
          :text="page === item ? undefined : true"
          @click="handleOnChangePage(item)"
        >
          {{ item }}
        </Button>
      </div>
      <Button
        text
        size="small"
        class="-mr-1 ml-1"
        :disabled="!canMoveNext"
        @click="goNext"
      >
        Next
      </Button>
      <Button
        text
        frontIcon="i-material-symbols:arrow-forward-ios-rounded"
        size="small"
        :disabled="!canMoveNext"
        @click="goLast"
      />
    </div>
    <div class="flex items-center gap-2 text-sm">
      <span>Show</span>
      <SelectMenu v-model="limitSelected" :menu="limitOptions" direction="top">
        <template #default="{ toggleMenu }">
          <div class="rounded-md border px-2 py-1" @click="toggleMenu">
            {{ limitSelected }}
          </div>
        </template>
      </SelectMenu>
      <span class="whitespace-nowrap">per page</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PaginationProps {
  page: number
  pageLimit: number
  max?: number
  totalCount: number
}
const props = withDefaults(defineProps<PaginationProps>(), {
  page: 1,
  pageLimit: 10,
  max: 7,
})

const pages = computed(() =>
  Array.from(
    {
      length: Math.ceil(props.totalCount / props.pageLimit),
    },
    (_, index) => index + 1
  )
)
const limitOptions = [10, 20, 30, 50]
const limitSelected = computed({
  get: () => props.pageLimit,
  set: (newValue: number) => {
    emit('onChangeLimit', newValue)
  },
})

const emit = defineEmits<{
  (e: 'onChangePage', pageNum: number): void
  (e: 'onChangeLimit', limit: number): void
}>()
const handleOnChangePage = (pageNum: number | string) => {
  if (typeof pageNum === 'string') return
  emit('onChangePage', pageNum)
}
const canMoveNext = computed((): boolean => props.page !== pages.value.length)
const canMoveBack = computed((): boolean => props.page !== 1)
const goPre = () => {
  if (canMoveBack) {
    emit('onChangePage', props.page - 1)
  }
}
const goNext = () => {
  if (canMoveNext) {
    emit('onChangePage', props.page + 1)
  }
}
const goFirst = () => {
  emit('onChangePage', 1)
}
const goLast = () => {
  emit('onChangePage', pages.value.length)
}
const displayedItems = computed(() => {
  let items: Array<string | number> = []
  const currentPage = props.page
  const maxDisplayed = Math.max(props.max, 5)
  const maxItemShow = maxDisplayed - 2

  const lastItem = pages.value[pages.value.length - 1]

  if (pages.value.length < maxDisplayed) {
    items = [...pages.value]
    return items
  }

  const middle = Math.floor(maxDisplayed / 2) // 3

  if (currentPage <= middle) {
    items = pages.value.slice(0, maxItemShow)
    items.push('...')
    items.push(lastItem)
  } else if (currentPage <= pages.value.length - middle) {
    items = pages.value.slice(
      currentPage - maxItemShow / 2,
      currentPage + maxItemShow / 2
    )
    items.push('...')
    items.push(lastItem)
  } else {
    items.push(1)
    items.push('...')
    items = [...items, ...pages.value.slice(lastItem - maxItemShow)]
  }
  return items
})
</script>
