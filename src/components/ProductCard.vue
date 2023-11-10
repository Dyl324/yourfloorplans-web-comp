<script setup lang="ts">
import { ref } from 'vue'
import BaseModel from './BaseModel.vue'

defineProps<{
  item: {
    title: string
    img: string
    bathrooms: string
    bedrooms: string
    garage: string
    size: string
  }
}>()

const dialog = ref(false)

// const vClickOutside = {
//   // @ts-ignore
//   beforeMount: (el: HTMLElement, binding) => {
//     // @ts-ignore
//     el.clickOutsideEvent = function (event) {
//       console.log('TEST')
//       if (!(el === event.target || el.contains(event.target))) {
//         binding.value(event)
//       }
//     }
//     // @ts-ignore
//     document.addEventListener('click', el.clickOutsideEvent)
//   },
//   // @ts-ignore
//   unmounted(el) {
//     document.removeEventListener('click', el.clickOutsideEvent)
//   }
// }
// const open = () => {
//   console.log('open')
//   dialog.value = true
// }
// const close = () => {
//   console.log('close')
//   dialog.value = false
// }
</script>

<template>
  <div>
    <div class="max-w-sm bg-white rounded-xl shadow w-full" @click="dialog = true">
      <img class="rounded-xl shadow" :src="`/src/assets/img/${item.img}`" alt="" />
      <div class="p-2">
        <div>
          {{ item.title }}
        </div>
        <div>
          {{ item.bathrooms }}
          {{ item.bedrooms }}
          {{ item.garage }}
          {{ item.size }}
        </div>
      </div>
    </div>
    <div
      v-if="dialog"
      class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
      @click="dialog = false"
    >
      <div
        class="bg-white self-start mt-32 max-w-screen-md rounded-xl overflow-x-hidden overflow-y-auto"
        style="max-height: 60vh"
        @click.stop
      >
        <img class="rounded-xl shadow" :src="`/src/assets/img/${item.img}`" alt="" />
        <div class="p-4">
          <div class="flex justify-between">
            <h4 class="text-2xl">{{ item.title }}</h4>
            <div>
              {{ item.bathrooms }}
              {{ item.bedrooms }}
              {{ item.garage }}
              {{ item.size }}
            </div>
          </div>
          <div class="flex justify-center">
            <img class="rounded-xl max-w-2xl" src="/src/assets/img/TEST_1.jpg" alt="" />
          </div>
          <div class="flex justify-end">
            <button
              class="text-white mt-8 bg-amber-100 py-2 px-6 rounded-xl"
              @click="dialog = false"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <BaseModel :dialog="dialog" :close="() => (dialog = false)">
      <img class="rounded-xl shadow" :src="`/src/assets/img/${item.img}`" alt="" />
      <div>{{ item.title }}</div>
    </BaseModel> -->
    <!-- <div
      v-if="dialog"
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full">
          <div>
            {{ item.title }}
          </div>
          <button class="rounded bg-amber-200 text-white" @click="close">Close</button>
        </div>
      </div>
    </div>
    <div v-if="dialog" class="absolute z-40 inset-0 opacity-25 bg-black"></div> -->
  </div>
</template>

<style scoped></style>
