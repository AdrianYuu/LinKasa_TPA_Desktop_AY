import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from '../firebase'

export const getCargoShipments = async (): Promise<CargoShipment[] | null> => {
  const q = query(collection(db, 'cargo-shipment'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as CargoShipment), id: doc.id }))
}

export const getCargoShipment = async (id): Promise<CargoShipment | null> => {
  const q = query(collection(db, 'cargo-shipment'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as CargoShipment)
}

export const createCargoShipment = async (cargoShipmentData: CargoShipment) => {
  await addDoc(collection(db, 'cargo-shipment'), cargoShipmentData)
}

export const updateCargoShipment = async (cargoShipmentData: Partial<CargoShipment>, id) => {
  await updateDoc(doc(db, 'cargo-shipment', id), cargoShipmentData)
}

export const deleteCargoShipment = async (id) => {
  await deleteDoc(doc(db, 'cargo-shipment', id))
}

export const getCargoShipmentsCount = async () => {
  const snapshot = await getDocs(collection(db, 'cargo-shipment'))
  return snapshot.size
}
