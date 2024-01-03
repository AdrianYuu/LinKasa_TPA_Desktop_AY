import {
  clearCollection,
  createEquipment,
  equipmentData
} from '@renderer/controllers/EquipmentController'

export const createAllEquipment = async () => {
  await clearCollection()
  equipmentData.forEach(async (equipment) => {
    await createEquipment(equipment)
  })
}
