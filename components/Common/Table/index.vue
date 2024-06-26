<template>
  <table
    class="w-full border-separate border-spacing-0 overflow-auto scroll-smooth"
  >
    <thead
      :class="[
        { 'sticky top-0 z-20 bg-white shadow-md': headerSticky },
        headerStyle,
      ]"
    >
      <tr :class="[rowStyle]">
        <template v-for="column in columns" :key="`header-${column.key}`">
          <slot
            :name="`header-${column.key}`"
            @mounted="() => console.log(`header-${column.key}`)"
            :label="column.label"
            :cellStyle="`${cellStyle} ${box && 'border-[0.5px]'} font-medium text-sm`"
          >
            <td
              class="whitespace-nowrap text-sm font-medium"
              :class="[{ 'border-[0.5px]': box }, cellStyle]"
            >
              {{ column.label }}
            </td>
          </slot>
        </template>
      </tr>
    </thead>
    <div
      v-if="loading || !dataSource.length"
      class="absolute inset-0 flex items-center justify-center"
    >
      <template v-if="loading">
        <slot name="loading">
          <TableLoading />
        </slot>
      </template>
      <template v-if="!dataSource.length && !loading">
        <slot name="empty">
          <TableEmpty />
        </slot>
      </template>
    </div>
    <tbody v-else>
      <tr v-for="data in dataSource" :key="data.key" :class="rowStyle">
        <template v-for="column in columns" :key="`body-${column.key}`">
          <slot
            :name="`body-${column.key}`"
            :data="data[column.key]"
            :row="data"
            :cellStyle="`${cellStyle} ${box && 'border-[0.5px]'}`"
          >
            <td
              class="text-sm"
              :class="[column.ui, cellStyle, { 'border-[0.5px]': box }]"
            >
              {{ data[column.key] }}
            </td>
          </slot>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface TableProps {
  dataSource: any[]
  loading?: boolean
  columns: TableColumn[]
  headerSticky?: boolean
  headerStyle?: string
  rowStyle?: string
  box?: boolean
  cellStyle?: string
}
withDefaults(defineProps<TableProps>(), {
  cellStyle: 'p-3 whitespace-nowrap ',
})
</script>
