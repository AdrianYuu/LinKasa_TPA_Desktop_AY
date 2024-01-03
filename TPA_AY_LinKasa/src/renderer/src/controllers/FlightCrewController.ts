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

export const getFlightCrews = async (): Promise<FlightCrew[] | null> => {
  const q = query(collection(db, 'flight-crew'), orderBy('crewName', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as FlightCrew), id: doc.id }))
}

export const getFlightCrew = async (id): Promise<FlightCrew | null> => {
  const q = query(collection(db, 'flight-crew'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as FlightCrew)
}

export const createFlightCrew = async (flightCrewData: FlightCrew) => {
  await addDoc(collection(db, 'flight-crew'), flightCrewData)
}

export const updateFlightCrew = async (flightCrewData: Partial<FlightCrew>, id) => {
  await updateDoc(doc(db, 'flight-crew', id), flightCrewData)
}

export const deleteFlightCrew = async (id) => {
  await deleteDoc(doc(db, 'flight-crew', id))
}

export const getFlightCrewsCount = async () => {
  const snapshot = await getDocs(collection(db, 'flight-crew'))
  return snapshot.size
}

export const checkCrewNameUnique = async (crewName: string): Promise<true | false> => {
  const q = query(collection(db, 'flight-crew'), where('crewName', '==', crewName))
  const qSnapshot = await getDocs(q)
  return qSnapshot.empty ? true : false
}
