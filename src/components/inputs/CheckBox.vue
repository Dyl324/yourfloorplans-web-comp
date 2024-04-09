<script setup lang="ts">
const model = defineModel()
const props = defineProps<{
  label: string
  onClick: () => void
}>()
const id = `checkbox_${props.label.toLowerCase().replace(/\s/g, '_')}`
</script>

<template>
  <div class="flex gap-2 items-center py-1">
    <input
      :id="id"
      type="checkbox"
      v-model="model"
      class="relative peer cursor-pointer appearance-none w-4 h-4 border-2 border-blue-500 rounded-sm bg-white shrink-0 checked:bg-blue-800 checked:border-0 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-100 disabled:border-steel-400 disabled:bg-steel-400"
      @click="onClick"
    />
    <label :htmlFor="id" class="cursor-pointer">{{ label }}</label>
    <svg
      class="absolute w-4 h-4 hidden peer-checked:block pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  </div>
</template>
