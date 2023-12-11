import useLoadData from '@/hooks/useLoadData'

export const useFloorplanTypes = () => useLoadData(refreshFloorplanTypes)

const refreshFloorplanTypes = async () => {
  try {
    const result = await fetch(`${import.meta.env.VITE_BASE_URL}api/floorplans/types/public`, {
      method: 'GET'
    })
    const data = await result.json()
    return data.result as FloorplanType[]
  } catch (err) {
    console.error(err)
    throw err
  }
}
