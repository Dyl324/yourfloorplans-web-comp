declare type Floorplan = {
  id: number
  name: string
  size: number
  width: number
  length: number
  bathrooms: number
  bedrooms: number
  garages: number
  displayImage: string
  informalImage: string
  siteImage: string
  techImage: string
  premium: boolean
  masterPosRear: boolean
  floorplanTypeId: number
}

declare type FloorplanType = {
  id: number
  name: string
}
