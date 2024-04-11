<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import FloorplanCard from './FloorplanCard.vue'
import { useFloorplans } from '../hooks/useFloorplans'
import { useFloorplanTypes } from '../hooks/useFloorplanTypes'
import FilterExpandable from './FilterExpandable.vue'
import SelectField from './inputs/SelectField.vue'
import TextField from './inputs/TextField.vue'
import CheckBox from './inputs/CheckBox.vue'
import LoadingSpinner from './misc/LoadingSpinner.vue'

export interface Props {
  rounded?: string
  primaryColor?: string
  cardColor?: string
  shadow?: string
  variant?: string
  darkMode?: 'true' | 'false'
  expandedDefault?: 'true' | 'false'
  transparent?: 'true' | 'false'
  // rounded?: string
  // expandedDefault?: boolean
  // dark: boolean
}

const props = withDefaults(defineProps<Props>(), {
  test: 'Default test value',
  rounded: 'rounded',
  shadow: 'shadow',
  expandedDefault: 'false',
  darkMode: 'false',
  transparent: 'false'
})

const roundedOptions = [
  'rounded-none',
  'rounded-sm',
  'rounded',
  'rounded-md',
  'rounded-lg',
  'rounded-xl',
  'rounded-2xl',
  'rounded-3xl'
]
const shadowOptions = ['shadow-none', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl']

const selectedRounded = computed(() => {
  const value = roundedOptions.find((option) => option === props.rounded)
  return value || 'rounded-md'
})
const selectedShadow = computed(() => {
  const value = shadowOptions.find((option) => option === props.shadow)
  return value || 'shadow-md'
})

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

const expanded = ref(props.expandedDefault === 'true')
const transparentCard = props.transparent === 'true'
</script>

<template>
  <div class="main container mx-auto">
    <FilterExpandable
      :open="expanded"
      :toggle="() => (expanded = !expanded)"
      :rounded="selectedRounded"
      :shadow="selectedShadow"
      :cardColor="props.cardColor"
    >
      <div v-if="floorplanTypes.type === 'SUCCESS'" class="mx-4">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <!-- <div>
                <div class="relative w-full h-10">
                  <input
                    class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" "
                  />
                  <label
                    class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                  >
                    Username
                  </label>
                </div>
              </div> -->
          <SelectField
            label="Type"
            :items="floorplanTypes.data"
            @onChanged="(value: FloorplanType) => (type = value)"
            :rounded="selectedRounded"
          />
          <TextField type="number" label="Bedrooms" v-model="bedrooms" :rounded="selectedRounded" />
          <TextField
            type="number"
            label="Bathrooms"
            v-model="bathrooms"
            :rounded="selectedRounded"
          />
          <TextField type="number" label="Garages" v-model="garages" :rounded="selectedRounded" />
          <SelectField
            label="Sort by"
            :items="orderByOptions"
            @onChanged="(value: OrderBy) => (orderBy = value)"
            :rounded="selectedRounded"
          />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-4">
          <div>
            {{ 'House size(m\u00B2)' }}
            <div class="grid grid-cols-2 gap-2 mt-3">
              <TextField type="number" label="Min" v-model="minSize" :rounded="selectedRounded" />
              <TextField type="number" label="Max" v-model="maxSize" :rounded="selectedRounded" />
            </div>
          </div>
          <div>
            {{ 'House width(m\u00B2)' }}
            <div class="grid grid-cols-2 gap-2 mt-3">
              <TextField type="number" label="Min" v-model="minWidth" :rounded="selectedRounded" />
              <TextField type="number" label="Max" v-model="maxWidth" :rounded="selectedRounded" />
            </div>
          </div>
          <div>
            {{ 'House length(m\u00B2)' }}
            <div class="grid grid-cols-2 gap-2 mt-3">
              <TextField type="number" label="Min" v-model="minLength" :rounded="selectedRounded" />
              <TextField type="number" label="Max" v-model="maxLength" :rounded="selectedRounded" />
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
    </FilterExpandable>

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
        :shadow="selectedShadow"
        :cardColor="cardColor"
        :transparent="transparentCard"
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
