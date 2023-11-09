<script setup lang="ts">
// import '../index.css'
const props = defineProps<{
  test: string
}>()

console.log(props)

const items = [
  {
    title: 'Waldorf',
    img: 'HW-BoxHill-Waldorf-thumb.jpg',
    bedrooms: '4',
    bathrooms: '4.5',
    garage: '2',
    size: '13.8'
  },
  {
    title: 'Glenburn',
    img: 'Chisholm-Glenburn-thumb.jpg',
    bedrooms: '4',
    bathrooms: '2',
    garage: '2',
    size: '12.2'
  },
  {
    title: 'Bristol',
    img: 'HW-Leppington-Bristol-thumb.jpg',
    bedrooms: '4-5',
    bathrooms: '2.5-3',
    garage: '2',
    size: '10.0'
  },
  {
    title: 'Hendooz',
    img: 'BSX_SERIES_73_R1.png',
    bedrooms: '4-5',
    bathrooms: '2.5-3',
    garage: '2',
    size: '10.0'
  }
]
</script>

<template>
  <div class="main container mx-auto">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4 justify-items-center"
    >
      <div
        v-for="item in items"
        :key="item.title"
        class="max-w-sm bg-white rounded-xl shadow w-full"
      >
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
    </div>
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
</style>
