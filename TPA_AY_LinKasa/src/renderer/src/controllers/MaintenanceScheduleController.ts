import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from '../firebase'

export const getMaintenanceSchedules = async (): Promise<MaintenanceSchedule[] | null> => {
  const q = query(collection(db, 'maintenance-schedule'), orderBy('date', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as MaintenanceSchedule), id: doc.id }))
}

export const getMaintenanceSchedule = async (id): Promise<MaintenanceSchedule | null> => {
  const q = query(collection(db, 'maintenance-schedule'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as MaintenanceSchedule)
}

export const createMaintenanceSchedule = async (maintenanceScheduleData: MaintenanceSchedule) => {
  await addDoc(collection(db, 'maintenance-schedule'), maintenanceScheduleData)
}

export const updateMaintenanceSchedule = async (
  maintenanceScheduleData: Partial<MaintenanceSchedule>,
  id
) => {
  await updateDoc(doc(db, 'maintenance-schedule', id), maintenanceScheduleData)
}

export const deleteMaintenanceSchedule = async (id) => {
  await deleteDoc(doc(db, 'maintenance-schedule', id))
}

export const getMaintenanceSchedulesCount = async () => {
  const snapshot = await getDocs(collection(db, 'maintenance-schedule'))
  return snapshot.size
}
