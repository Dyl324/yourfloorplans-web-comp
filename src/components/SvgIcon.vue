<script setup lang="ts">
defineProps<{
  path: string
  title: string
  height?: number
  width?: number
}>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :height="height ? height : 20"
    :width="height ? height : 20"
  >
    <title>{{ title }}</title>
    <path :d="path" />
  </svg>
</template>
