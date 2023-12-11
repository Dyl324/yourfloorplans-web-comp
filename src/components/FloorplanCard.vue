<script setup lang="ts">
import { ref } from 'vue'
import FloorplanDialog from './FloorplanDialog.vue'

const props = defineProps<{
  item: Floorplan
}>()

const dialog = ref(false)

const displayUrl = `${import.meta.env.VITE_AWS_URL}${props.item.displayImage}`
</script>

<template>
  <div>
    <div class="max-w-sm bg-white rounded-xl shadow w-full" @click="dialog = true">
      <img class="rounded-xl shadow" :src="displayUrl" alt="" />
      <div class="p-2">
        <div>
          {{ item.name }}
        </div>
        <div class="mt-2 flex items-center">
          <i class="mdi mdi-bed-queen-outline mr-1"></i>
          {{ item.bedrooms }}
          <i class="mdi mdi-shower mr-1 ml-3"></i>
          {{ item.bathrooms }}
          <i class="mdi mdi-car-outline mr-1 ml-3"></i>
          {{ item.garages }}
          <i class="mdi mdi-arrow-expand-horizontal mr-1 ml-3"></i>
          {{ item.size }}
        </div>
      </div>
    </div>

    <FloorplanDialog :dialog="dialog" :close="() => (dialog = false)" :item="item" />
  </div>
</template>
