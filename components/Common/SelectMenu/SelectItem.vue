<template>
  <li
    class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition-all hover:bg-gray-200"
    :class="[
      {
        'bg-blossom-300 text-blossom-950 hover:!bg-blossom-400 hover:shadow-md':
          isSelected,
      },
    ]"
  >
    <Icon
      v-if="item.icon && typeof item.icon === 'string'"
      :name="item.icon"
      class=""
    />
    <span class="whitespace-nowrap">
      {{ item?.label || item }}
    </span>
  </li>
</template>

<script setup lang="ts">
interface SelectItemProps {
  item: any
  isSelected?: boolean
}
defineProps<SelectItemProps>()
</script>
