<template>
  <div
    class="relative cursor-pointer"
    v-click-out-side="() => (showMenu = false)"
  >
    <slot :toggleMenu="toggleMenu">
      <div>{{ model }}</div>
    </slot>
    <Transition :name="direction === 'bottom' ? 'dropdown' : 'dropup'">
      <ul
        v-if="showMenu"
        class="absolute right-0 space-y-1 rounded-md bg-white p-3 shadow-md z-50"
        :class="[{ 'bottom-full mb-1': direction === 'top' }]"
      >
        <template v-for="item in menu" :key="item?.key || item">
          <SelectItem
            :item="item"
            @click="handleClickItem(item)"
            :isSelected="model === (item?.value ?? item)"
          />
        </template>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { vClickOutSide } from '~/directives/clickOutSide'
import SelectItem from './SelectItem.vue'
type Direction = 'bottom' | 'top'
interface SelectMenuProps {
  menu: any[]
  direction?: Direction
  offset?: string
}
withDefaults(defineProps<SelectMenuProps>(), {
  direction: 'bottom',
})
const showMenu = ref(false)
const model = defineModel()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const handleClickItem = (item: any) => {
  emit('update:modelValue', item?.value || (item as string))
  showMenu.value = false
}
const toggleMenu = () => (showMenu.value = !showMenu.value)
</script>
