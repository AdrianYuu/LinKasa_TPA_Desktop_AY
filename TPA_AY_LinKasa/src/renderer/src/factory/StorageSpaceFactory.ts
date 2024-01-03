import {
  clearCollection,
  createStorageSpace,
  storageSpaceData
} from '@renderer/controllers/StorageSpaceController'

export const createAllStorageSpace = async () => {
  await clearCollection()
  storageSpaceData.forEach(async (equipment) => {
    await createStorageSpace(equipment)
  })
}
