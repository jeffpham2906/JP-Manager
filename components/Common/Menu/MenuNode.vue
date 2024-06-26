<template>
  <li class="mb-1 rounded-sm">
    <NuxtLink
      exactActiveClass="text-blossom-800"
      :to="node.url"
      class="relative flex cursor-pointer items-center rounded-md p-2 pl-10 transition-colors duration-300 hover:text-blossom-800"
      :class="[
        { 'bg-blossom-50': isExpanded && isHasSubmenu },
        { '!bg-blossom-200': isCurrentRoute },
      ]"
      @click="handleShowSubmenu"
    >
      <div
        class="absolute bottom-0 left-1 top-0 flex w-8 items-center justify-center"
      >
        <Icon
          v-if="node.icon"
          :name="node.icon"
          size="20"
          :class="[
            {
              'rounded-md bg-blossom-600 p-1 text-blossom-50': isCurrentRoute,
            },
          ]"
        />
        <div v-else class="absolute inset-0 flex items-center justify-center">
          <div
            class="h-2 w-2 rounded-full bg-gray-400"
            :class="[{ '!bg-blossom-600': isSubRouteSelected }]"
          ></div>
          <div
            class="absolute top-0 h-2.5 w-px bg-gray-400"
            :class="[{ 'bg-blossom-600': isSubRouteSelected }]"
          ></div>
        </div>
      </div>
      <span
        :class="[
          { 'font-medium text-blossom-700': isCurrentRoute },
          { 'font-semibold': isSubRouteSelected },
        ]"
      >
        {{ node.label }}
      </span>
      <span class="absolute right-2" v-if="node.children">
        <Icon
          name="i-material-symbols:arrow-forward-ios-rounded"
          size="14"
          :class="[
            'transition-all',
            { 'rotate-90': isExpanded },
            { 'text-blossom-600': isCurrentRoute },
          ]"
        />
      </span>
    </NuxtLink>
    <Transition name="dropdown">
      <ul v-if="isExpanded && isHasSubmenu">
        <MenuNode v-for="child in node.children" :node="child" />
      </ul>
    </Transition>
  </li>
</template>

<script setup lang="ts">
import type { MenuNode } from './menu'

const props = defineProps<{
  node: MenuNode
  activeMenuKey?: string
}>()
const route = useRoute()
const isHasSubmenu = computed(() => !!props.node.children)
const isExpanded = ref(props.node.expanded)
const isCurrentRoute = computed(() => props.activeMenuKey === props.node.key)
const isSubRouteSelected = computed(() => route.path === props.node.url)

const handleShowSubmenu = () => {
  if (isHasSubmenu.value) {
    isExpanded.value = !isExpanded.value
  }
}
</script>
