<template>
  <div class="h-screen min-w-60 overflow-auto border-r bg-white px-6 pb-6">
    <div
      class="relative mb-5 mt-10 flex items-center justify-center gap-2 text-center text-2xl"
    >
      <Icon
        name="i-material-symbols:bar-chart"
        class="flex h-6 items-center rounded-md bg-blossom-600 text-blossom-50"
      />

      <span class="font-medium">Julia</span>
    </div>
    <Menu :options="items" :activeMenuKey="selectedKey" />
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordNormalized } from 'vue-router'
import { getItems } from './items'
interface SideBarProps {
  collapsed?: boolean
}
defineProps<SideBarProps>()
const items = useState('navs', () => getItems())

const selectedKey = ref<string>('')

const route = useRoute()
const router = useRouter()
const setKey = (matched: RouteRecordNormalized[]) => {
  for (const match of matched) {
    if (match.meta?.activeMenuKey) {
      selectedKey.value = match.meta.activeMenuKey as string
    } else {
      selectedKey.value = match.name as string
    }
  }
}

onBeforeMount(() => {
  router.afterEach((to, from) => {
    setKey(to.matched)
  })
})
</script>
