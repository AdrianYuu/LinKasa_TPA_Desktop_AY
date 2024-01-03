import { db } from '@renderer/firebase'
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

export const getTransportationSchedules = async (): Promise<TransportationSchedule[] | null> => {
  const q = query(collection(db, 'transportation-schedule'), orderBy('date', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as TransportationSchedule), id: doc.id }))
}

export const getTransportationSchedule = async (id): Promise<TransportationSchedule | null> => {
  const q = query(collection(db, 'transportation-schedule'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as TransportationSchedule)
}

export const createTransportationSchedule = async (transportationScheduleData: TransportationSchedule) => {
  await addDoc(collection(db, 'transportation-schedule'), transportationScheduleData)
}

export const updateTransportationSchedule = async (transportationScheduleData: Partial<TransportationSchedule>, id) => {
  await updateDoc(doc(db, 'transportation-schedule', id), transportationScheduleData)
}

export const deleteTransportationSchedule = async (id) => {
  await deleteDoc(doc(db, 'transportation-schedule', id))
}

export const getTransportationSchedulesSize = async () => {
  const snapshot = await getDocs(collection(db, 'transportation-schedule'))
  return snapshot.size
}
