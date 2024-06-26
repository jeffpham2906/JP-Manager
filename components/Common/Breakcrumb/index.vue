<template>
  <div class="flex items-center">
    <NuxtLink to="/">
      <Icon
        class="rounded-md p-0.5 hover:cursor-pointer hover:bg-sky-100"
        name="i-material-symbols:house-outline-rounded"
        size="18"
      />
    </NuxtLink>

    <ClientOnly>
      <TransitionGroup name="list" tag="ul" class="flex items-center">
        <li v-for="bread in breadcrumb" :key="bread.name">
          <span class="mx-1">/</span>
          <NuxtLink :to="bread.path">
            <span class="transition-all hover:text-sky-600">
              {{ $t(bread.name) }}
            </span>
          </NuxtLink>
        </li>
      </TransitionGroup>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'

type Page = {
  name: string
  path: string
}
const breadcrumb = ref<Page[]>([])
const route = useRoute()
const router = useRouter()
const checkRoute = (route: RouteLocationNormalizedLoaded) => {
  if (route.meta.breadcrumb) {
    breadcrumb.value = route.meta.breadcrumb as Page[]
  } else {
    breadcrumb.value = []
  }
}
onBeforeMount(() => {
  checkRoute(route)
  router.beforeResolve((to) => checkRoute(to))
})
</script>
<style>
.list-enter-active {
  transition: all 0.3s ease-in-out;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(5px);
}
</style>
