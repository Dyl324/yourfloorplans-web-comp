import useLoadData from '@/hooks/useLoadData'
import type { Ref } from 'vue'
// import { getFloorplans } from '@/services/api/floorplans'
// import { useFloorplansStore } from '@/stores/floorplans'
// const floorplansStore = useFloorplansStore()

interface RequestBody {
  floorplanTypeId?: number
  bedrooms?: number
  bathrooms?: number
  garages?: number
  orderBy?: { orderBy: string; direction: string }
  minSize?: number
  maxSize?: number
  minWidth?: number
  maxWidth?: number
  minLength?: number
  maxLength?: number
  masterPosRear?: boolean
}

interface ResponseData {
  result: Floorplan[]
}

export const useFloorplans = (payload: Ref<RequestBody>) =>
  useLoadData(() => refreshFloorplans(payload))

const refreshFloorplans = async (payload: Ref<RequestBody>) => {
  try {
    const body = {
      floorplanTypeId: payload.value.floorplanTypeId,
      bedrooms: payload.value.bedrooms,
      bathrooms: payload.value.bathrooms,
      garages: payload.value.garages,
      orderBy: payload.value.orderBy,
      minSize: payload.value.minSize,
      maxSize: payload.value.maxSize,
      minWidth: payload.value.minWidth,
      maxWidth: payload.value.maxWidth,
      minLength: payload.value.minLength,
      maxLength: payload.value.maxLength,
      masterPosRear: payload.value.masterPosRear
    }

    const result = await fetch(`${import.meta.env.VITE_BASE_URL}api/floorplans/public`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data: ResponseData = await result.json()
    return data.result
  } catch (err) {
    console.error(err)
    throw err
  }
}
