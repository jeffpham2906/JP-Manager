<template>
  <div>
    <slot></slot>
    <Teleport to="body">
      <Transition name="overlay">
        <div
          v-if="isShowModal"
          class="absolute inset-0 z-20 bg-gray-700 opacity-30"
          @click="isShowModal = false"
        ></div>
      </Transition>
      <Transition :name="transitionName">
        <div
          v-if="isShowModal"
          v-bind="$attrs"
          class="absolute z-30 bg-white p-5 shadow-md"
          :class="[
            containerStyle,
            width,
            heigh,
            {
              'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform':
                position === 'center',
            },
            { 'bottom-0 right-0 top-0': position === 'right' },
            { 'left-0 top-0': position === 'left' },
          ]"
        >
          <slot name="content"></slot>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
type Transition = 'fadeRight' | 'fadeLeft'
type Position = 'center' | 'left' | 'right'
interface ModalProps {
  transitionName?: Transition
  position?: Position
  width?: string
  heigh?: string
  containerStyle?: string
}

withDefaults(defineProps<ModalProps>(), {
  position: 'center',
})
const isShowModal = defineModel({
  required: true,
  type: Boolean,
  default: false,
})
</script>
<style>
/* Slide from left side */

.fadeLeft-enter-active,
.fadeLeft-leave-active {
  transition: all 0.5s ease-out;
}

.fadeLeft-enter-from,
.fadeLeft-leave-to {
  margin-right: -100%;
}

.fadeLeft-enter-to,
.fadeLeft-leave-from {
  margin-right: 0px;
}

.fadeRight-enter-active,
.fadeRight-leave-active {
  transition: all 0.5s ease-out;
}

.fadeRight-enter-from,
.fadeRight-leave-to {
  margin-left: -100%;
}

.fadeRight-enter-to,
.fadeRight-leave-from {
  margin-left: 0px;
}
</style>
