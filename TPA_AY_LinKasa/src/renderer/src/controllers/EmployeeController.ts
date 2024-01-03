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

export const getEmployees = async (): Promise<Employee[] | null> => {
  const q = query(collection(db, 'users'), orderBy('fullName', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as Employee), id: doc.id }))
}

export const getEmployeesBasedOnRole = async (role: string): Promise<Employee[] | null> => {
  const q = query(collection(db, 'users'), where('role', '==', role))
  const snapshot = await getDocs(q)
  console.log('Dapat')
  return snapshot.docs.map((doc) => ({ ...(doc.data() as Employee), id: doc.id }))
}

export const getEmployee = async (id): Promise<Employee | null> => {
  const q = query(collection(db, 'users'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as Employee)
}

export const createEmployee = async (employeeData: Employee) => {
  await addDoc(collection(db, 'users'), employeeData)
}

export const updateEmployee = async (employeeData: Partial<Employee>, id) => {
  await updateDoc(doc(db, 'users', id), employeeData)
}

export const deleteEmployee = async (id) => {
  await deleteDoc(doc(db, 'users', id))
}

export const getEmployeesCount = async () => {
  const snapshot = await getDocs(collection(db, 'users'))
  return snapshot.size
}
