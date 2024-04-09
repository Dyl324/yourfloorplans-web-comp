<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  label: string
  items: { id: number; name: string }[]
  rounded: string
}>()

watch(
  () => props.rounded,
  () => console.log('rounded changed', props.rounded)
)

const emit = defineEmits(['onChanged'])

const open = ref(false)
const selected = ref<{ id: number; name: string }>()

const select = (item: { id: number; name: string }) => {
  selected.value = item
  open.value = false
}

watch(selected, (value) => {
  emit('onChanged', value)
})

// @ts-ignore
const handleFocusOut = (event) => {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    open.value = false
  }
}
</script>

<template>
  <div class="relative" @focusout="handleFocusOut">
    <button
      @click="open = !open"
      type="button"
      class="relative w-full cursor-pointer bg-white py-2 pl-5 pr-10 text-left text-gray-900 ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:ring-gray-500 sm:text-sm sm:leading-6 transition-all"
      :class="rounded"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
    >
      <span class="flex items-center">
        <span class="block truncate" :class="!selected ? 'text-gray-400' : ''">
          {{ selected ? selected.name : label }}
        </span>
      </span>

      <span
        v-if="selected"
        class="absolute inset-y-0 right-5 ml-3 flex items-center pr-2"
        @click.stop="selected = undefined"
      >
        <svg
          class="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <title>close-circle</title>
          <path
            d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
          />
        </svg>
      </span>

      <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <svg
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </button>

    <transition name="fade">
      <ul
        v-if="open"
        class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        <li
          class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 transition-colors duration-200 ease-in-out"
          :class="selected?.id === item.id ? 'bg-sky-200' : 'hover:bg-sky-100'"
          id="listbox-option-0"
          role="option"
          v-for="item in items"
          :key="item.id"
          @click="() => select(item)"
        >
          <div class="flex items-center">
            <span class="font-normal ml-3 block truncate">{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
