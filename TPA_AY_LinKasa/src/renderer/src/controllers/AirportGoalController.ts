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

export const getAirportGoals = async (): Promise<AirportGoal[] | null> => {
  const q = query(collection(db, 'airport-goal'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as AirportGoal), id: doc.id }))
}

export const getAirportGoal = async (id): Promise<AirportGoal | null> => {
  const q = query(collection(db, 'airport-goal'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as AirportGoal)
}

export const createAirportGoal = async (airportGoalData: AirportGoal) => {
  await addDoc(collection(db, 'airport-goal'), airportGoalData)
}

export const updateAirportGoal = async (airportGoalData: Partial<AirportGoal>, id) => {
  await updateDoc(doc(db, 'airport-goal', id), airportGoalData)
}

export const deleteAirportGoal = async (id) => {
  await deleteDoc(doc(db, 'airport-goal', id))
}

export const getAirportGoalsCount = async () => {
  const snapshot = await getDocs(collection(db, 'airport-goal'))
  return snapshot.size
}
