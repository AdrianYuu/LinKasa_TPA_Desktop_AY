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

export const getEmployeeDevelopmentPrograms = async (): Promise<
  EmployeeDevelopmentProgram[] | null
> => {
  const q = query(collection(db, 'employee-development-program'), orderBy('developmentProgramName', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as EmployeeDevelopmentProgram), id: doc.id }))
}

export const getEmployeeDevelopmentProgram = async (
  id
): Promise<EmployeeDevelopmentProgram | null> => {
  const q = query(collection(db, 'employee-development-program'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as EmployeeDevelopmentProgram)
}

export const createEmployeeDevelopmentProgram = async (
  EmployeeDevelopmentProgramData: EmployeeDevelopmentProgram
) => {
  await addDoc(collection(db, 'employee-development-program'), EmployeeDevelopmentProgramData)
}

export const updateEmployeeDevelopmentProgram = async (
  EmployeeDevelopmentProgramData: Partial<EmployeeDevelopmentProgram>,
  id
) => {
  await updateDoc(doc(db, 'employee-development-program', id), EmployeeDevelopmentProgramData)
}

export const deleteEmployeeDevelopmentProgram = async (id) => {
  await deleteDoc(doc(db, 'employee-development-program', id))
}

export const getEmployeeDevelopmentProgramsCount = async () => {
  const snapshot = await getDocs(collection(db, 'employee-development-program'))
  return snapshot.size
}
