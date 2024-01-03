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

export const getJobVacancies = async (): Promise<JobVacancy[] | null> => {
  const q = query(collection(db, 'job-vacancy'), orderBy('jobTitle', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as JobVacancy), id: doc.id }))
}

export const getJobVacancy = async (id): Promise<JobVacancy | null> => {
  const q = query(collection(db, 'job-vacancy'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as JobVacancy)
}

export const createJobVacancy = async (jobVacancyData: JobVacancy) => {
  await addDoc(collection(db, 'job-vacancy'), jobVacancyData)
}

export const updateJobVacancy = async (jobVacancyData: Partial<JobVacancy>, id) => {
  await updateDoc(doc(db, 'job-vacancy', id), jobVacancyData)
}

export const deleteJobVacancy = async (id) => {
  await deleteDoc(doc(db, 'job-vacancy', id))
}

export const getJobVacancyCount = async () => {
  const snapshot = await getDocs(collection(db, 'job-vacancy'))
  return snapshot.size
}
