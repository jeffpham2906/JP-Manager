<template>
  <label class="flex flex-col gap-1">
    <slot name="label">
      <span :class="[{ requiredMark: required }]">{{ label }}</span>
    </slot>
    <slot>
      <div class="relative">
        <InputText
          v-bind="$attrs"
          :placeholder="placeholder"
          v-model:input="modelValue"
          :type="type"
        />

        <Transition name="warn">
          <div
            v-if="error"
            class="absolute bottom-0 left-0 right-0 top-0 mr-2 flex cursor-text items-center justify-end"
          >
            <IconCSS
              name="i-material-symbols:warning-outline"
              size="20"
              class="text-red-500"
            />
          </div>
        </Transition>
      </div>
    </slot>
    <Transition name="warn">
      <slot v-if="error" name="error">
        <span class="mt-1 text-sm text-red-500">{{ error }}</span>
      </slot>
    </Transition>
  </label>
</template>

<script setup lang="ts">
const modelValue = defineModel()

withDefaults(
  defineProps<{
    label: string
    placeholder?: string
    error?: string
    type?: string
    required?: boolean
  }>(),
  {
    label: 'Label',
    type: 'text',
  }
)
</script>
<style>
.requiredMark::after {
  content: '*';
  margin-left: 2px;
  color: red;
}
.warn-enter-active {
  animation: shake 0.3s ease-in-out;
}
.warn-leave-active {
  transition: all 0.2s ease-in-out;
}
.warn-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-3px);
  }
  50% {
    transform: translateX(3px);
  }
  75% {
    transform: translateX(-3px);
  }
}
</style>
