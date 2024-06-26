<template>
  <div class="flex items-center">
    <div
      class="rounded-l border border-r-0 border-slate-200 py-2 pl-3 pr-2 peer-focus:bg-black"
    >
      <slot>
        <Icon v-if="icon" :name="icon" size="20" /> <span v-else>@</span>
      </slot>
    </div>
    <InputText
      class="rounded-l-none border-l-0"
      :placeholder="$attrs.placeholder"
      v-model:input="model"
    />
  </div>
</template>

<script setup lang="ts">
import InputText from './InputText.vue'
const model = defineModel()
defineProps<{
  icon?: string
}>()
</script>
