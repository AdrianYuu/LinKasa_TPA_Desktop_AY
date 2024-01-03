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

export const getPassportAndVisas = async (): Promise<PassportAndVisa[] | null> => {
  const q = query(collection(db, 'passport-and-visa'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as PassportAndVisa), id: doc.id }))
}

export const getPassportAndVisa = async (id): Promise<PassportAndVisa | null> => {
  const q = query(collection(db, 'passport-and-visa'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as PassportAndVisa)
}

export const createPassportAndVisa = async (passportAndVisaData: PassportAndVisa) => {
  await addDoc(collection(db, 'passport-and-visa'), passportAndVisaData)
}

export const updatePassportAndVisa = async (passportAndVisaData: Partial<PassportAndVisa>, id) => {
  await updateDoc(doc(db, 'passport-and-visa', id), passportAndVisaData)
}

export const deletePassportAndVisa = async (id) => {
  await deleteDoc(doc(db, 'passport-and-visa', id))
}

export const getPassportAndVisaCount = async () => {
  const snapshot = await getDocs(collection(db, 'passport-and-visa'))
  return snapshot.size
}
