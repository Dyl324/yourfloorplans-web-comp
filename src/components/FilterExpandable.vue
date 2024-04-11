<script setup lang="ts">
defineProps<{
  open: boolean
  toggle: () => void
  rounded: string
  shadow: string
  cardColor?: string
}>()
</script>

<template>
  <div class="relative mb-3 mx-4">
    <h6 class="mb-0">
      <div
        class="relative px-4 flex items-center justify-between w-full cursor-pointer hover:brightness-95 font-semibold text-left transition-all ease-in text-black group text-dark-500"
        :class="`${rounded} ${open ? 'py-4' : 'py-2'} ${shadow} ${!cardColor ? 'bg-white' : ''}`"
        :style="cardColor ? `background-color: ${cardColor}` : ''"
        @click="toggle"
      >
        <span>Filters</span>
        <svg
          v-if="!open"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
      </div>
    </h6>
    <transition name="fade">
      <div v-if="open" class="py-5 bg-gray-200" :class="`${rounded} ${shadow}`">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
