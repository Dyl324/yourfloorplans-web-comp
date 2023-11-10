<script setup lang="ts">
defineProps<{
  dialog: boolean
  close: () => void
}>()
</script>

<template>
  <div
    v-if="dialog"
    class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
  >
    <div class="bg-white self-start mt-32 max-w-screen-md rounded-xl">
      <slot />
      <button class="text-white mt-8 bg-amber-100 py-2 px-6" @click="close">Close</button>
    </div>
  </div>
</template>

<style scoped></style>
