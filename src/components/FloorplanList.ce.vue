<script setup lang="ts">
import { ref, watch } from 'vue'
import FloorplanCard from './FloorplanCard.vue'
import { useFloorplans } from '../hooks/useFloorplans'
import { useFloorplanTypes } from '../hooks/useFloorplanTypes'
import SelectField from './inputs/SelectField.vue'
import TextField from './inputs/TextField.vue'
import CheckBox from './inputs/CheckBox.vue'
import LoadingSpinner from './misc/LoadingSpinner.vue'

export interface Props {
  test?: string
  rounded?: string
  expandedDefault?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  test: 'Default test value',
  rounded: 'rounded-md',
  expandedDefault: false
})

// const props = defineProps<{
//   test: string
//   rounded?: string
// }>()

console.log(props)

const type = ref<FloorplanType>()
const bedrooms = ref<number>()
const bathrooms = ref<number>()
const garages = ref<number>()
const orderBy = ref<OrderBy>()

const minSize = ref<number>()
const maxSize = ref<number>()
const minWidth = ref<number>()
const maxWidth = ref<number>()
const minLength = ref<number>()
const maxLength = ref<number>()

const masterPosRear = ref<boolean>()
const front = ref(false)
const back = ref(false)

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
  garages: garages.value,
  orderBy: orderBy.value
    ? { orderBy: orderBy.value.orderBy, direction: orderBy.value.direction }
    : undefined,
  minSize: minSize.value,
  maxSize: maxSize.value,
  minWidth: minWidth.value,
  maxWidth: maxWidth.value,
  minLength: minLength.value,
  maxLength: maxLength.value,
  masterPosRear: masterPosRear.value
})

watch(
  [
    type,
    bedrooms,
    bathrooms,
    garages,
    orderBy,
    minSize,
    maxSize,
    minWidth,
    maxWidth,
    minLength,
    maxLength,
    masterPosRear
  ],
  () => {
    console.log(masterPosRear.value)
    floorplanProps.value = {
      floorplanTypeId: type.value?.id,
      bedrooms: bedrooms.value || undefined,
      bathrooms: bathrooms.value || undefined,
      garages: garages.value || undefined,
      orderBy: orderBy.value
        ? { orderBy: orderBy.value.orderBy, direction: orderBy.value.direction }
        : undefined,
      minSize: minSize.value || undefined,
      maxSize: maxSize.value || undefined,
      minWidth: minWidth.value || undefined,
      maxWidth: maxWidth.value || undefined,
      minLength: minLength.value || undefined,
      maxLength: maxLength.value || undefined,
      masterPosRear: masterPosRear.value
    }
  }
)

const onClickFront = () => {
  if (!front.value) masterPosRear.value = false
  else masterPosRear.value = undefined
  back.value = false
}
const onClickBack = () => {
  if (!back.value) masterPosRear.value = true
  else masterPosRear.value = undefined
  front.value = false
}

const [floorplans] = useFloorplans(floorplanProps)
const [floorplanTypes] = useFloorplanTypes()

const expanded = ref(props.expandedDefault)
</script>

<template>
  <div class="main container mx-auto mt-5">
    <div class="relative mb-3 mx-4">
      <h6 class="mb-0">
        <div
          class="relative flex items-center bg-white shadow-md w-full cursor-pointer hover:brightness-95 p-4 font-semibold text-left transition-all ease-in border-b border-solid border-slate-100 text-black group text-dark-500"
          :class="rounded"
          @click="expanded = !expanded"
        >
          <span>Filters</span>
          <i
            class="absolute right-0 pt-1 text-base transition-transform fa fa-chevron-down group-open:rotate-180"
          ></i>
        </div>
      </h6>
      <div
        v-show="expanded"
        class="shadow-md py-5 bg-gray-200 transition-all duration-300 ease-in-out"
        :class="rounded"
      >
        <div v-if="floorplanTypes.type === 'SUCCESS'" class="mx-4">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <SelectField
              label="Type"
              :items="floorplanTypes.data"
              @onChanged="(value: FloorplanType) => (type = value)"
              :rounded="rounded"
            />
            <TextField type="number" label="Bedrooms" v-model="bedrooms" :rounded="rounded" />
            <TextField type="number" label="Bathrooms" v-model="bathrooms" :rounded="rounded" />
            <TextField type="number" label="Garages" v-model="garages" :rounded="rounded" />
            <SelectField
              label="Sort by"
              :items="orderByOptions"
              @onChanged="(value: OrderBy) => (orderBy = value)"
              :rounded="rounded"
            />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-4">
            <div>
              {{ 'House size(m\u00B2)' }}
              <div class="grid grid-cols-2 gap-2 mt-3">
                <TextField type="number" label="Min" v-model="minSize" :rounded="rounded" />
                <TextField type="number" label="Max" v-model="maxSize" :rounded="rounded" />
              </div>
            </div>
            <div>
              {{ 'House width(m\u00B2)' }}
              <div class="grid grid-cols-2 gap-2 mt-3">
                <TextField type="number" label="Min" v-model="minWidth" :rounded="rounded" />
                <TextField type="number" label="Max" v-model="maxWidth" :rounded="rounded" />
              </div>
            </div>
            <div>
              {{ 'House length(m\u00B2)' }}
              <div class="grid grid-cols-2 gap-2 mt-3">
                <TextField type="number" label="Min" v-model="minLength" :rounded="rounded" />
                <TextField type="number" label="Max" v-model="maxLength" :rounded="rounded" />
              </div>
            </div>
            <div>
              Master Suite Location
              <div class="flex gap-4 mt-3">
                <CheckBox label="Front" v-model="front" :onClick="onClickFront" />
                <CheckBox label="Back" v-model="back" :onClick="onClickBack" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="floorplans.type === 'LOADING'" class="flex items-center justify-center">
      <div role="status">
        <loadingSpinner />
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div
      v-else-if="floorplans.type === 'SUCCESS'"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4 justify-items-center"
    >
      <FloorplanCard
        v-for="item in floorplans.data"
        :key="item.name"
        :item="item"
        :rounded="rounded"
      />
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

*::-webkit-scrollbar {
  background-color: #efefef;
  width: 15px;
}

/* background of the scrollbar except button or resizer */
*::-webkit-scrollbar-track {
  background-color: #efefef;
}

/* scrollbar itself */
*::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 16px;
  border: 4px solid #efefef;
}

/* set button(top and bottom of the scrollbar) */
*::-webkit-scrollbar-button {
  display: none;
}
</style>
