<template>
  <PageContainer>
    <div class="mb-3 flex justify-between gap-5">
      <OrganismsOrderFilters :paginate="orderPaginate" class="grow" />
      <div class="flex gap-2">
        <ImportData @onSucess="orderPaginate.fireCallback()" />
        <OrganismsOrderModalCreate :refresh="orderPaginate.fireCallback" />
      </div>
    </div>
    <div class="relative grow">
      <div
        :class="[
          'mx-auto max-w-full overflow-auto',
          'h-[calc(100dvh-243px)]',
          'w-[calc(100vw-325px)] tablet:w-[calc(100vw-80px)]',
        ]"
        @scroll="handleScroll"
      >
        <Table
          :header-sticky="true"
          :box="true"
          :columns="OrderColumn"
          :data-source="orders"
          :loading="isLoading"
        >
          <template #header-actions="{ label, cellStyle }">
            <td
              :class="[
                cellStyle,
                { fakeShadow: actionShadow },
                'sticky right-0 z-20 bg-white',
              ]"
            >
              {{ label }}
            </td>
          </template>
          <template #body-product_name="{ data, cellStyle }">
            <td class="max-w-64 truncate" :class="[cellStyle]" :title="data">
              {{ data }}
            </td>
          </template>

          <template #body-created_time="{ data, cellStyle }">
            <td :class="cellStyle">{{ formatDate(data, 'DD/MM/YYYY') }}</td>
          </template>
          <template
            #body-actions="{
              row,
              cellStyle,
            }: {
              row: Tables<'order_products'>
              cellStyle: string
            }"
          >
            <td
              class="flex"
              :class="[
                cellStyle,
                'sticky right-0 z-10 bg-white',
                { fakeShadow: actionShadow },
              ]"
            >
              <OrganismsOrderModalEdit
                :id="row.id"
                :refresh="orderPaginate.fireCallback"
              />
              <RemoveButton
                :id="row.id"
                :data="row"
                :title="`Are you sure to remove ${row.order_id} ?`"
                :action="handleRemove"
              />
            </td>
          </template>
        </Table>
      </div>
      <Pagination
        :page="orderPaginate.pageRef.value"
        :pageLimit="orderPaginate.limitRef.value"
        :totalCount="orderPaginate.totalCount.value"
        :max="7"
        class="mt-3"
        @onChangePage="orderPaginate.setPage"
        @onChangeLimit="orderPaginate.setLimit"
      />
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
definePageMeta({
  activeMenuKey: 'Order',
  title: 'List order',
  breadcrumb: [
    {
      name: 'Order',
      path: '/order',
    },
    {
      name: 'List',
      path: '/order/list',
    },
  ],
})
import PageContainer from '~/layouts/Page/PageContainer.vue'
import useOrders from '~/composables/api/useOrders'
import type { Tables } from '~/database'
import type { AllQueryType } from '~/types/common'
const { getOrder, deleteOrder } = useOrders()
const { isLoading, showLoading, hideLoading } = useLoading()
const { $toast } = useNuxtApp()

const actionShadow = ref(true)
const handleScroll = (e: Event) => {
  const tableContainerElement = e.target as HTMLElement
  const innerWidth = tableContainerElement?.clientWidth || 0
  const width = tableContainerElement?.scrollWidth || 0
  const scrollLeft = tableContainerElement?.scrollLeft || 0

  const isEndOfTable = width - (innerWidth + scrollLeft) <= 1
  if (isEndOfTable) {
    actionShadow.value = false
  } else {
    actionShadow.value = true
  }
}
const orders = ref<Tables<'order_products'>[]>([])

const fetchList = async (options?: AllQueryType<any>) => {
  showLoading()
  const { data, error, count } = await getOrder(options)
  if (error || !data) {
    console.log(error.message)
  }
  orders.value = data || []
  hideLoading()
  return count
}
const orderPaginate = usePaging({
  pageName: 'orderPaginate',
  updateUrl: true,
  onChange: fetchList,
})

const init = async () => {
  const { page, limit } = orderPaginate.getQuery()

  await orderPaginate.setLimit(limit, false)
  await orderPaginate.setPage(page)
}

const handleRemove = async (id: number) => {
  const { data, error } = await deleteOrder(id)
  if (error) {
    $toast.error(error.message)
    return
  }
  if (data) {
    const itemDeleted = data[0] as Tables<'order_products'>
    $toast.success(`Delete success ${itemDeleted.order_id}`)
    orderPaginate.fireCallback()
  }
}

onMounted(() => init())
</script>
<style>
.fakeShadow::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: -10px;
  width: 10px;
  bottom: 0;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
}
</style>
