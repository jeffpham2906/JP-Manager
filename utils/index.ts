import type { Component } from 'vue'
import Icon from '~/components/Common/Icon.vue'

export function renderIcon(icon: Component | string) {
  if (typeof icon === 'string') {
    return () => h(Icon, { name: icon })
  } else {
    return () => h(Icon, null, { default: () => h(icon) })
  }
}

export const getDiffObject = (obj1: object, obj2: object) => {
  const diff = new Map()
  for (const key of Object.keys(obj1)) {
    if (key in obj2) {
      if (obj1[key as keyof object] === obj2[key as keyof object]) continue
      diff.set(key, obj2[key as keyof object])
    } else {
      diff.set(key, obj1[key as keyof object])
    }
  }
  return Object.fromEntries(diff)
}
