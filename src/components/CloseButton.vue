<script setup lang="ts">
defineProps<{
  close: () => void
}>()
</script>

<template>
  <button
    @click="close"
    type="button"
    class="font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center md:hidden"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" class="w-4 h-4">
      <title>close</title>
      <path
        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
      />
    </svg>
    <span class="sr-only">Icon description</span>
  </button>
</template>
