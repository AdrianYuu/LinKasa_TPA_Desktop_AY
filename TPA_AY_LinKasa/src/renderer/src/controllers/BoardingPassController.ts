import { db } from '@renderer/firebase'
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

export const getBoardingPasses = async (): Promise<BoardingPass[] | null> => {
  const q = query(collection(db, 'boarding-pass'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as BoardingPass), id: doc.id }))
}

export const getBoardingPass = async (id): Promise<BoardingPass | null> => {
  const q = query(collection(db, 'boarding-pass'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as BoardingPass)
}

export const createBoardingPass = async (boardingPassData: BoardingPass) => {
  await addDoc(collection(db, 'boarding-pass'), boardingPassData)
}

export const updateBoardingPass = async (boardingPassData: Partial<BoardingPass>, id) => {
  await updateDoc(doc(db, 'boarding-pass', id), boardingPassData)
}

export const deleteBoardingPass = async (id) => {
  await deleteDoc(doc(db, 'boarding-pass', id))
}
