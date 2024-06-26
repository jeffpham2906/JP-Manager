<template>
  <div
    class="flex items-center justify-between border-b border-gray-200 bg-white p-5"
  >
    <Breakcrumb />
    <div class="flex items-center gap-2 px-1">
      <SelectMenu v-model="currentLocale" :menu="listLocale">
        <template #default="{ toggleMenu }">
          <Icon
            name="i-material-symbols:language"
            class="cursor-pointer"
            @click="toggleMenu"
          />
        </template>
      </SelectMenu>
      <MobileNav />
      <Icon
        class="cursor-pointer"
        name="i-heroicons:arrow-right-on-rectangle-20-solid"
        @click="handleLogOut"
        title="Logout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MobileNav from '../SideBar/MobileNav.vue'
const { $i18n, $toast } = useNuxtApp()
const { locale, t, locales, setLocale } = $i18n
const { logOut } = useUserStore()

const handleLogOut = async () => {
  const { error } = await logOut()
  if (error) {
    $toast.error(error.message)
    return
  }
  navigateTo('/login')
}

const currentLocale = computed({
  get: () => locale.value,
  set: (newLocale: string) => setLocale(newLocale),
})

const listLocale = computed(() =>
  locales.value.map((e) => ({
    key: e.code,
    value: e.code,
    label: t(e.name || e.code),
  }))
)
</script>
