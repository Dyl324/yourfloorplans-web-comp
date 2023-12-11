<script setup lang="ts">
import '@mdi/font/css/materialdesignicons.css'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const props = defineProps<{
  dialog: boolean
  close: () => void
  item: Floorplan
}>()

const displayUrl = `${import.meta.env.VITE_AWS_URL}${props.item.displayImage}`
const informalUrl = `${import.meta.env.VITE_AWS_URL}${props.item.informalImage}`
</script>

<template>
  <TransitionRoot as="template" :show="dialog">
    <Dialog as="div" class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex items-center justify-center max-h-screen p-4 text-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-auto rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl max-h-screen"
            >
              <img class="rounded-xl shadow" :src="displayUrl" alt="" />
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div>
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                      {{ item.name }}
                    </DialogTitle>
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
                    <hr class="my-4 border-gray-300" />
                    <img :src="informalUrl" alt="" />
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style>
i {
  font-size: 1.5rem;
}
</style>
