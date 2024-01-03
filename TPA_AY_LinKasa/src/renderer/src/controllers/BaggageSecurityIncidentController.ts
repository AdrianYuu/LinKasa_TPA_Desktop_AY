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

export const getBaggageSecurityIncidents = async (): Promise<BaggageSecurityIncident[] | null> => {
  const q = query(collection(db, 'baggage-security-incident'), orderBy('responseDate', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as BaggageSecurityIncident), id: doc.id }))
}

export const getBaggageSecurityIncident = async (id): Promise<BaggageSecurityIncident | null> => {
  const q = query(collection(db, 'baggage-security-incident'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as BaggageSecurityIncident)
}

export const createBaggageSecurityIncident = async (
  baggageSecurityIncidentData: BaggageSecurityIncident
) => {
  await addDoc(collection(db, 'baggage-security-incident'), baggageSecurityIncidentData)
}

export const updateBaggageSecurityIncident = async (
  baggageSecurityIncidentData: Partial<BaggageSecurityIncident>,
  id
) => {
  await updateDoc(doc(db, 'baggage-security-incident', id), baggageSecurityIncidentData)
}

export const deleteBaggageSecurityIncident = async (id) => {
  await deleteDoc(doc(db, 'baggage-security-incident', id))
}

export const getBaggageSecurityIncidentsCount = async () => {
  const snapshot = await getDocs(collection(db, 'baggage-security-incident'))
  return snapshot.size
}
