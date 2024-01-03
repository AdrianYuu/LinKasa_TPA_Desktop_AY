import { db } from '@renderer/firebase'
import {
  addDoc,
  collection,
  doc,
  documentId,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore'

export const getLogs = async (): Promise<LostAndFoundItemLog[] | null> => {
  let q = query(collection(db, 'lost-and-found-log'), orderBy('date', 'asc'))
  const snapshot = await getDocs(q)
  console.log(snapshot)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as LostAndFoundItemLog), id: doc.id }))
}

export const getLog = async (id): Promise<LostAndFoundItemLog | null> => {
  const q = query(collection(db, 'lost-and-found-log'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as LostAndFoundItemLog)
}

export const createLog = async (logData: LostAndFoundItemLog) => {
  await addDoc(collection(db, 'lost-and-found-log'), logData)
}

export const updateLog = async (logData: Partial<LostAndFoundItemLog>, id) => {
  await updateDoc(doc(db, 'lost-and-found-log', id), logData)
}

export const getLogsCount = async () => {
  const snapshot = await getDocs(collection(db, 'lost-and-found-log'))
  return snapshot.size
}
