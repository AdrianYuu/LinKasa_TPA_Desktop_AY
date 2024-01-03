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

export const getBudgetRequests = async (): Promise<BudgetRequest[] | null> => {
  const q = query(collection(db, 'budget-request'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as BudgetRequest), id: doc.id }))
}

export const getBudgetRequest = async (id): Promise<BudgetRequest | null> => {
  const q = query(collection(db, 'budget-request'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as BudgetRequest)
}

export const createBudgetRequest = async (budgetRequestData: BudgetRequest) => {
  await addDoc(collection(db, 'budget-request'), budgetRequestData)
}

export const updateBudgetRequest = async (budgetRequestData: Partial<BudgetRequest>, id) => {
  await updateDoc(doc(db, 'budget-request', id), budgetRequestData)
}

export const deleteBudgetRequest = async (id) => {
  await deleteDoc(doc(db, 'budget-request', id))
}

export const getProjectPlansCount = async () => {
  const snapshot = await getDocs(collection(db, 'budget-request'))
  return snapshot.size
}
