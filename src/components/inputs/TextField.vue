<script setup lang="ts">
const model = defineModel()
defineProps<{
  label: string
  type?: string
}>()
</script>

<template>
  <input
    :type="type ? type : 'text'"
    :placeholder="label"
    v-model.number="model"
    class="relative w-full cursor-text rounded-3xl bg-white py-2 pl-5 pr-5 text-left ring-1 ring-inset ring-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:ring-gray-500 sm:text-sm transition-all"
  />
</template>

<style>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
