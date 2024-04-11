<script setup lang="ts">
import { ref } from 'vue'
import FloorplanList from './components/FloorplanList.ce.vue'
import SelectField from './components/inputs/SelectField.vue'
const rounded = ref('md')
const items = [
  'rounded-md',
  'rounded-lg',
  'rounded-xl',
  'rounded-2xl',
  'rounded-3xl',
  'rounded-full'
].map((val, i) => ({ id: i, name: val }))
interface RoundedValue {
  id: number
  name: string
}
</script>

<template>
  <div>
    <div class="m-5">
      <SelectField
        label="Type"
        :items="items"
        @onChanged="(value: RoundedValue) => (rounded = value.name)"
        :rounded="rounded"
      />

      <FloorplanList :rounded="rounded" transparent="true" shadow="shadow-none" />
    </div>
  </div>
</template>
