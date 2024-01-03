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

export const getFeedbackForms = async (): Promise<FeedbackForm[] | null> => {
  const q = query(collection(db, 'feedback-form'), orderBy('title', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as FeedbackForm), id: doc.id }))
}

export const getFeedbackForm = async (id): Promise<FeedbackForm | null> => {
  const q = query(collection(db, 'feedback-form'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as FeedbackForm)
}

export const createFeedbackForm = async (broadCastData: FeedbackForm) => {
  await addDoc(collection(db, 'feedback-form'), broadCastData)
}

export const updateFeedbackForm = async (broadCastData: Partial<FeedbackForm>, id) => {
  await updateDoc(doc(db, 'feedback-form', id), broadCastData)
}

export const deleteFeedbackForm = async (id) => {
  await deleteDoc(doc(db, 'feedback-form', id))
}
