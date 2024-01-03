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

export const getEmployeeTrainings = async (): Promise<EmployeeTraining[] | null> => {
  const q = query(collection(db, 'employee-training'), orderBy('trainingName', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as EmployeeTraining), id: doc.id }))
}

export const getEmployeeTraining = async (id): Promise<EmployeeTraining | null> => {
  const q = query(collection(db, 'employee-training'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as EmployeeTraining)
}

export const createEmployeeTraining = async (employeeTrainingData: EmployeeTraining) => {
  await addDoc(collection(db, 'employee-training'), employeeTrainingData)
}

export const updateEmployeeTraining = async (
  employeeTrainingData: Partial<EmployeeTraining>,
  id
) => {
  await updateDoc(doc(db, 'employee-training', id), employeeTrainingData)
}

export const deleteEmployeeTraining = async (id) => {
  await deleteDoc(doc(db, 'employee-training', id))
}

export const getEmployeeTrainingsCount = async () => {
  const snapshot = await getDocs(collection(db, 'employee-training'))
  return snapshot.size
}
