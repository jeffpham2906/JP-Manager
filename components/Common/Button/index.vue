<template>
  <button
    v-bind="$attrs"
    :class="[
      `flex items-center justify-center gap-1 whitespace-nowrap rounded-md transition-all hover:shadow-md disabled:cursor-not-allowed disabled:text-gray-500`,
      { 'px-3 py-2': size === 'medium' },
      { 'px-2 py-1 text-sm': size === 'small' },
      { 'px-3 py-2': size === 'large' },
      { 'rounded-full': rounded },
      {
        'bg-blossom-600 text-blossom-50 hover:bg-blossom-700':
          severity === 'primary' && !text,
      },
      {
        'bg-transparent text-blossom-600 hover:bg-blossom-100 hover:shadow-none disabled:bg-inherit':
          text,
      },
      {
        'bg-blossom-200 text-blossom-900 hover:bg-blossom-300':
          severity === 'secondary',
      },
    ]"
  >
    <slot name="frontIcon">
      <Icon v-if="frontIcon" :name="frontIcon" :size="iconStyle[size]" />
    </slot>
    <slot>
      {{ label }}
    </slot>
    <slot name="backIcon">
      <Icon v-if="backIcon" :name="backIcon" :size="iconStyle[size]" />
    </slot>
    <template v-if="loading"> <Spin :size="size" /></template>
  </button>
</template>

<script setup lang="ts">
type Size = 'small' | 'large' | 'medium'
type ButtonSeverity = 'primary' | 'secondary' | 'ghost' | 'text'

interface ButtonProps {
  size?: Size
  severity?: ButtonSeverity
  label?: string
  rounded?: boolean
  loading?: boolean
  frontIcon?: string
  backIcon?: string
  text?: boolean
}
const iconStyle = {
  small: '18',
  medium: '23',
  large: '26',
}
withDefaults(defineProps<ButtonProps>(), {
  size: 'medium',
  iconSize: 'medium',
  severity: 'primary',
  text: false,
})
</script>
