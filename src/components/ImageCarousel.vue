<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  images: string[]
}>()

const carouselIndex = ref(0)

const nextImage = () => {
  carouselIndex.value = (carouselIndex.value + 1) % props.images.length
}

const prevImage = () => {
  carouselIndex.value = (carouselIndex.value - 1 + props.images.length) % props.images.length
}
</script>

<template>
  <div class="relative p-5">
    <img
      class="object-fit w-full h-60 md:h-96 transition ease-in duration-200"
      :src="images[carouselIndex]"
    />
    <div class="flex justify-center space-x-2">
      <span
        v-for="(image, index) in images"
        :key="index"
        class="w-2 h-2 rounded-full bg-gray-400 cursor-pointer"
        :class="{ 'bg-gray-800': index === carouselIndex }"
        @click="carouselIndex = index"
      ></span>
    </div>

    <button
      type="button"
      class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="prevImage"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:outline-none transition-all"
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button
      type="button"
      class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="nextImage"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:outline-none"
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>
</template>
