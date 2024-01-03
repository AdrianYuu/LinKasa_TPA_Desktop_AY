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

export const getBroadcasts = async (): Promise<Broadcast[] | null> => {
  const q = query(collection(db, 'broadcast-message'), orderBy('priorityLevel', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as Broadcast), id: doc.id }))
}

export const getBroadcast = async (id): Promise<Broadcast | null> => {
  const q = query(collection(db, 'broadcast-message'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as Broadcast)
}

export const createBroadcast = async (broadCastData: Broadcast) => {
  await addDoc(collection(db, 'broadcast-message'), broadCastData)
}

export const updateBroadcast = async (broadCastData: Partial<Broadcast>, id) => {
  await updateDoc(doc(db, 'broadcast-message', id), broadCastData)
}

export const deleteBroadcast = async (id) => {
  await deleteDoc(doc(db, 'broadcast-message', id))
}
