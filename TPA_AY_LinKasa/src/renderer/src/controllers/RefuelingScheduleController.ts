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

export const getRefuelingSchedules = async (): Promise<RefuelingSchedule[] | null> => {
  const q = query(collection(db, 'refueling-schedule'), orderBy('date', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as RefuelingSchedule), id: doc.id }))
}

export const getRefuelingSchedule = async (id): Promise<RefuelingSchedule | null> => {
  const q = query(collection(db, 'refueling-schedule'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as RefuelingSchedule)
}

export const createRefuelingSchedule = async (refuelingScheduleData: RefuelingSchedule) => {
  await addDoc(collection(db, 'refueling-schedule'), refuelingScheduleData)
}

export const updateRefuelingSchedule = async (
  refuelingScheduleData: Partial<RefuelingSchedule>,
  id
) => {
  await updateDoc(doc(db, 'refueling-schedule', id), refuelingScheduleData)
}

export const deleteRefuelingSchedule = async (id) => {
  await deleteDoc(doc(db, 'refueling-schedule', id))
}

export const getRefuelingSchedulesCount = async () => {
  const snapshot = await getDocs(collection(db, 'refueling-schedule'))
  return snapshot.size
}
