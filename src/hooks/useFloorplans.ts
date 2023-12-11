import useLoadData from '@/hooks/useLoadData'
import type { Ref } from 'vue'
// import { getFloorplans } from '@/services/api/floorplans'
// import { useFloorplansStore } from '@/stores/floorplans'
// const floorplansStore = useFloorplansStore()

interface RequestBody {
  floorplanTypeId?: number
  bedrooms?: number
  bathrooms?: number
  orderBy?: { orderBy: string; direction: string }
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
      orderBy: payload.value.orderBy
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
