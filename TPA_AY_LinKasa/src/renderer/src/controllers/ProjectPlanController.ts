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

export const getProjectPlans = async (): Promise<ProjectPlan[] | null> => {
  const q = query(collection(db, 'project-plan'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as ProjectPlan), id: doc.id }))
}

export const getProjectPlan = async (id): Promise<ProjectPlan | null> => {
  const q = query(collection(db, 'project-plan'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as ProjectPlan)
}

export const createProjectPlan = async (projectPlanData: ProjectPlan) => {
  await addDoc(collection(db, 'project-plan'), projectPlanData)
}

export const updateProjectPlan = async (projectPlanData: Partial<ProjectPlan>, id) => {
  await updateDoc(doc(db, 'project-plan', id), projectPlanData)
}

export const deleteProjectPlan = async (id) => {
  await deleteDoc(doc(db, 'project-plan', id))
}

export const getProjectPlansCount = async () => {
  const snapshot = await getDocs(collection(db, 'project-plan'))
  return snapshot.size
}
