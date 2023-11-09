import { defineCustomElement } from 'vue'
import VueFloorplanList from './components/FloorplanList.ce.vue'
// import '../index.css'

export const FloorplanList = defineCustomElement(VueFloorplanList)

customElements.define('floorplan-list', FloorplanList)
// export function initFloorplans(tagName = 'floorplan-list') {
//   customElements.define(tagName, FloorplanList)
// }
