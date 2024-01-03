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

export const getInspectionRecords = async (): Promise<InspectionRecord[] | null> => {
  let q = query(collection(db, 'inspection-record'), orderBy('inspectionDate', 'asc'))
  const snapshot = await getDocs(q)
  console.log(snapshot)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as InspectionRecord), id: doc.id }))
}

export const getInspectionRecord = async (id): Promise<InspectionRecord | null> => {
  const q = query(collection(db, 'inspection-record'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as InspectionRecord)
}

export const createInspectionRecord = async (inspectionRecordData: InspectionRecord) => {
  await addDoc(collection(db, 'inspection-record'), inspectionRecordData)
}

export const updateInspectionRecord = async (
  inspectionRecordData: Partial<InspectionRecord>,
  id
) => {
  await updateDoc(doc(db, 'inspection-record', id), inspectionRecordData)
}

export const deleteInspectionRecord = async (id) => {
  await deleteDoc(doc(db, 'inspection-record', id))
}

export const getInspectionRecordsCount = async () => {
  const snapshot = await getDocs(collection(db, 'inspection-record'))
  return snapshot.size
}
