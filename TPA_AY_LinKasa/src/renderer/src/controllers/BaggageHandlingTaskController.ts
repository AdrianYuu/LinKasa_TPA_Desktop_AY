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

export const getBaggageHandlingTasks = async (): Promise<BaggageHandlingTask[] | null> => {
  const q = query(collection(db, 'baggage-handling-task'), orderBy('date', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as BaggageHandlingTask), id: doc.id }))
}

export const getBaggageHandlingTask = async (id): Promise<BaggageHandlingTask | null> => {
  const q = query(collection(db, 'baggage-handling-task'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as BaggageHandlingTask)
}

export const createBaggageHandlingTask = async (baggageHandlingTaskData: BaggageHandlingTask) => {
  await addDoc(collection(db, 'baggage-handling-task'), baggageHandlingTaskData)
}

export const updateBaggageHandlingTask = async (
  baggageHandlingTaskData: Partial<BaggageHandlingTask>,
  id
) => {
  await updateDoc(doc(db, 'baggage-handling-task', id), baggageHandlingTaskData)
}

export const deleteBaggageHandlingTask = async (id) => {
  await deleteDoc(doc(db, 'baggage-handling-task', id))
}

export const getBaggageHandlingsTaskCount = async () => {
  const snapshot = await getDocs(collection(db, 'baggage-handling-task'))
  return snapshot.size
}
