<script setup lang="ts">
import SvgIcon from './SvgIcon.vue'
defineProps<{
  bedrooms: number | string
  bathrooms: number | string
  garages: number | string
  size: number | string
}>()
</script>

<template>
  <div class="flex items-center justify-around font-bold text-black">
    <div class="flex items-center text-xl">
      <SvgIcon
        title="bed-queen-outline"
        path="M19 10V7A2 2 0 0 0 17 5H7A2 2 0 0 0 5 7V10A2 2 0 0 0 3 12V17H4.33L5 19H6L6.67 17H17.33L18 19H19L19.67 17H21V12A2 2 0 0 0 19 10M7 7H17V10H7M19 15H5V12H19Z"
        class="mr-1"
        :height="40"
        :width="40"
      />
      {{ bedrooms }}
    </div>

    <div class="flex items-center text-xl">
      <SvgIcon
        title="shower"
        path="M21,14V15C21,16.91 19.93,18.57 18.35,19.41L19,22H17L16.5,20C16.33,20 16.17,20 16,20H8C7.83,20 7.67,20 7.5,20L7,22H5L5.65,19.41C4.07,18.57 3,16.91 3,15V14H2V12H20V5A1,1 0 0,0 19,4C18.5,4 18.12,4.34 18,4.79C18.63,5.33 19,6.13 19,7H13A3,3 0 0,1 16,4C16.06,4 16.11,4 16.17,4C16.58,2.84 17.69,2 19,2A3,3 0 0,1 22,5V14H21V14M19,14H5V15A3,3 0 0,0 8,18H16A3,3 0 0,0 19,15V14Z"
        class="mr-1 ml-3"
        :height="40"
        :width="40"
      />
      {{ bathrooms }}
    </div>

    <div class="flex items-center text-xl">
      <SvgIcon
        title="car-outline"
        path="M18.9 6C18.7 5.4 18.1 5 17.5 5H6.5C5.8 5 5.3 5.4 5.1 6L3 12V20C3 20.5 3.5 21 4 21H5C5.6 21 6 20.5 6 20V19H18V20C18 20.5 18.5 21 19 21H20C20.5 21 21 20.5 21 20V12L18.9 6M6.8 7H17.1L18.2 10H5.8L6.8 7M19 17H5V12H19V17M7.5 13C8.3 13 9 13.7 9 14.5S8.3 16 7.5 16 6 15.3 6 14.5 6.7 13 7.5 13M16.5 13C17.3 13 18 13.7 18 14.5S17.3 16 16.5 16C15.7 16 15 15.3 15 14.5S15.7 13 16.5 13Z"
        class="mr-1 ml-3"
        :height="40"
        :width="40"
      />
      {{ garages }}
    </div>
    <div class="flex items-center text-xl">
      <SvgIcon
        title="arrow-expand-horizontal"
        path="M9,11H15V8L19,12L15,16V13H9V16L5,12L9,8V11M2,20V4H4V20H2M20,20V4H22V20H20Z"
        class="mr-1 ml-3"
        :height="40"
        :width="40"
      />
      {{ size }}
    </div>
  </div>
</template>
