<script setup lang="ts">
import { ref } from 'vue'
import FloorplanCardIconRow from './FloorplanCardIconRow.vue'
import FloorplanDialog from './FloorplanDialog.vue'

const props = defineProps<{
  item: Floorplan
}>()

const dialog = ref(false)

const displayUrl = `${import.meta.env.VITE_AWS_URL}${props.item.displayImage}`
</script>

<template>
  <div>
    <div
      class="max-w-sm bg-white rounded-3xl shadow-md w-full cursor-pointer hover:brightness-95 transition-all duration-200"
      @click="dialog = true"
    >
      <img class="rounded-3xl" :src="displayUrl" alt="" />
      <div class="p-2">
        <div class="font-medium text-lg">
          {{ item.name }}
        </div>
        <FloorplanCardIconRow
          class="mt-2"
          :bedrooms="item.bedrooms"
          :bathrooms="item.bathrooms"
          :garages="item.garages"
          :size="item.size"
        />
      </div>
    </div>

    <FloorplanDialog :item="item" :dialog="dialog" :close="() => (dialog = false)" />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(4px);
}
.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}

.ripple {
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

.ripple:after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition:
    transform 0.5s,
    opacity 1s;
}

.ripple:active:after {
  transform: scale(0, 0);
  opacity: 0.2;
  transition: 0s;
}
</style>
