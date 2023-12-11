<script setup lang="ts">
import { ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
defineProps<{
  label: string
  items: { id: number; name: string }[]
}>()
const emit = defineEmits(['onChanged'])

const selected = ref<{ id: number; name: string }>()

watch(selected, (value) => {
  emit('onChanged', value)
})
</script>

<template>
  <div>
    <Listbox v-model="selected">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate" :class="!selected && 'text-gray-400'">{{
            selected ? selected.name : label
          }}</span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2">
            <i
              v-if="!selected"
              class="mdi mdi-chevron-down h-5 w-5 text-gray-400 pointer-events-none"
            ></i>
            <button v-else @click.stop.prevent="selected = undefined">
              <i class="mdi mdi-close h-5 w-5 text-gray-400"></i>
            </button>
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="item in items"
              :key="item.name"
              :value="item"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-4 pr-4'
                ]"
              >
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                  {{ item.name }}
                </span>
                <!-- <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span> -->
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
