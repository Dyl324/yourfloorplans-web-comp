<script setup lang="ts">
import FloorplanDialogIconRow from './FloorplanDialogIconRow.vue'
import ImageCarousel from './ImageCarousel.vue'
import CloseButton from './CloseButton.vue'
const props = defineProps<{
  item: Floorplan
  dialog: boolean
  close: () => void
}>()

const displayUrl = `${import.meta.env.VITE_AWS_URL}${props.item.displayImage}`
const informalUrl = `${import.meta.env.VITE_AWS_URL}${props.item.informalImage}`
const siteUrl = `${import.meta.env.VITE_AWS_URL}${props.item.siteImage}`
const techUrl = `${import.meta.env.VITE_AWS_URL}${props.item.techImage}`

const images = [informalUrl, siteUrl, techUrl]

const details = [
  {
    label: 'Home Area m',
    value: props.item.area
  },
  {
    label: 'Home Area Sqs',
    value: (props.item.area * 0.1076391041671).toFixed(2),
    sqs: true
  },
  {
    label: 'Garage',
    value: props.item.garageArea
  },
  {
    label: 'Porch',
    value: props.item.porchArea
  },
  {
    label: 'Alfresco',
    value: props.item.alfrescoArea
  },
  {
    label: 'Ground Floor',
    value: props.item.groundFloorArea
  },
  {
    label: 'First Floor',
    value: props.item.firstFloorArea
  },
  {
    label: 'Length',
    value: props.item.length,
    meters: true
  },
  {
    label: 'Width',
    value: props.item.width,
    meters: true
  }
]
</script>

<template>
  <div>
    <transition name="fade">
      <div v-if="dialog" class="relative z-10" @click="close">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <transition name="slide">
              <div
                v-if="dialog"
                class="relative transform overflow-auto rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
              >
                <div class="bg-white rounded-3xl" style="max-height: 92vh" @click.stop>
                  <img
                    class="rounded-3xl shadow object-cover w-full h-96"
                    :src="displayUrl"
                    alt=""
                  />
                  <div class="p-4">
                    <h3
                      class="text-2xl font-semibold leading-6 text-gray-900 flex justify-between items-center"
                    >
                      {{ item.name }}
                      <CloseButton :close="close" />
                    </h3>
                    <FloorplanDialogIconRow
                      class="mt-4"
                      :bedrooms="item.bedrooms"
                      :bathrooms="item.bathrooms"
                      :garages="item.garages"
                      :size="item.size"
                    />
                  </div>
                  <div class="border-t border-gray-200 mx-5"></div>

                  <ImageCarousel :images="images" />

                  <div class="grid sm:grid-cols-1 md:grid-cols-2 p-5">
                    <div
                      class="border-b border-gray-200 flex justify-between p-3 text-black"
                      v-for="detail in details"
                      :key="detail.label"
                    >
                      <span
                        >{{ detail.label }}<sup v-if="detail.label === 'Home Area m'">2</sup></span
                      >
                      <span class="font-bold">
                        {{ detail.value }}{{ detail.sqs ? 'sqs' : 'm'
                        }}<sup v-if="!detail.meters && !detail.sqs">2</sup>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </transition>
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

@media only screen and (min-width: 600px) {
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
}
</style>
