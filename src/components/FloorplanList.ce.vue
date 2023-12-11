<script setup lang="ts">
import '@mdi/font/css/materialdesignicons.min.css'
import { ref, watch } from 'vue'
import FloorplanCard from './FloorplanCard.ce.vue'
import { useFloorplans } from '../hooks/useFloorplans'
import { useFloorplanTypes } from '../hooks/useFloorplanTypes'
import SelectBox from './SelectBox.ce.vue'

const props = defineProps<{
  test: string
}>()

console.log(props)

const type = ref<FloorplanType>()
const bedrooms = ref<number>()
const bathrooms = ref<number>()
const orderBy = ref<OrderBy>()

interface OrderBy {
  id: number
  name: string
  orderBy: string
  direction: string
}

const orderByOptions = [
  { id: 1, name: 'Size (lower to higher)', orderBy: 'size', direction: 'asc' },
  { id: 2, name: 'Size (higher to lower)', orderBy: 'size', direction: 'desc' }
]

const floorplanProps = ref({
  floorplanTypeId: type.value?.id,
  bedrooms: bedrooms.value,
  bathrooms: bathrooms.value,
  orderBy: orderBy.value
    ? { orderBy: orderBy.value.orderBy, direction: orderBy.value.direction }
    : undefined
})

watch([type, bedrooms, bathrooms, orderBy], () => {
  floorplanProps.value = {
    floorplanTypeId: type.value?.id,
    bedrooms: bedrooms.value || undefined,
    bathrooms: bathrooms.value || undefined,
    orderBy: orderBy.value
      ? { orderBy: orderBy.value.orderBy, direction: orderBy.value.direction }
      : undefined
  }
})

const [floorplans] = useFloorplans(floorplanProps)
const [floorplanTypes] = useFloorplanTypes()
</script>

<template>
  <div class="main container mx-auto mt-5">
    <div v-if="floorplanTypes.type === 'SUCCESS'">
      <div class="grid sm:grid-cols-12 md:grid-cols-4 gap-4">
        <SelectBox
          label="Type"
          :items="floorplanTypes.data"
          @onChanged="(value: FloorplanType) => (type = value)"
        />
        <input
          type="number"
          placeholder="Bedrooms"
          v-model="bedrooms"
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        />
        <input
          type="number"
          placeholder="Bathrooms"
          v-model="bathrooms"
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        />
        <SelectBox
          label="Sort by"
          :items="orderByOptions"
          @onChanged="(value: OrderBy) => (orderBy = value)"
        />
      </div>
    </div>

    <div v-if="floorplans.type === 'LOADING'">Loading...</div>
    <div
      v-else-if="floorplans.type === 'SUCCESS'"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4 justify-items-center"
    >
      <FloorplanCard v-for="item in floorplans.data" :key="item.name" :item="item" />
    </div>
    <div v-else-if="floorplans.type === 'ERROR'">{{ floorplans.error.message }}</div>
    <div v-else>No floorplans found</div>
  </div>
</template>

<style lang="scss">
@import url('../index.css');
.main {
  transition:
    color 0.5s,
    background-color 0.5s;
  line-height: 1.6;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-inner-leave-active {
  transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
