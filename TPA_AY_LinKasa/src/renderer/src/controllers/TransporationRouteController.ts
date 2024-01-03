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

export const getTransportationRoutes = async (): Promise<TransportationRoute[] | null> => {
  const q = query(collection(db, 'transportation-route'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as TransportationRoute), id: doc.id }))
}

export const getTransportationRoute = async (id): Promise<TransportationRoute | null> => {
  const q = query(collection(db, 'transportation-route'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as TransportationRoute)
}

export const createTransportationRoute = async (transportationRouteData: TransportationRoute) => {
  await addDoc(collection(db, 'transportation-route'), transportationRouteData)
}

export const updateTransportationRoute = async (
  transportationRouteData: Partial<TransportationRoute>,
  id
) => {
  await updateDoc(doc(db, 'transportation-route', id), transportationRouteData)
}

export const deleteTransportationRoute = async (id) => {
  await deleteDoc(doc(db, 'transportation-route', id))
}

export const getTransportationRoutesCount = async () => {
  const snapshot = await getDocs(collection(db, 'transportation-route'))
  return snapshot.size
}
