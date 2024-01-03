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
import { db } from '../firebase'

export const getCustomDeclarations = async (): Promise<CustomDeclaration[] | null> => {
  const q = query(collection(db, 'custom-declaration'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as CustomDeclaration), id: doc.id }))
}

export const getCustomDeclaration = async (id): Promise<CustomDeclaration | null> => {
  const q = query(collection(db, 'custom-declaration'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as CustomDeclaration)
}

export const createCustomDeclaration = async (customDeclarationData: CustomDeclaration) => {
  await addDoc(collection(db, 'custom-declaration'), customDeclarationData)
}

export const updateCustomDeclaration = async (
  customDeclarationData: Partial<CustomDeclaration>,
  id
) => {
  await updateDoc(doc(db, 'custom-declaration', id), customDeclarationData)
}

export const deleteCustomDeclaration = async (id) => {
  await deleteDoc(doc(db, 'custom-declaration', id))
}

export const getCustomDeclarationCount = async () => {
  const snapshot = await getDocs(collection(db, 'custom-declaration'))
  return snapshot.size
}
