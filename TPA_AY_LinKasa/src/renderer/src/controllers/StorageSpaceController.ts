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

export const getStorageSpaces = async (): Promise<StorageSpace[] | null> => {
  const q = query(collection(db, 'storage-space'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as StorageSpace), id: doc.id }))
}

export const getStorageSpace = async (id): Promise<StorageSpace | null> => {
  const q = query(collection(db, 'storage-space'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as StorageSpace)
}

export const createStorageSpace = async (storageSpaceData: StorageSpace) => {
  await addDoc(collection(db, 'storage-space'), storageSpaceData)
}

export const updateStorageSpace = async (storageSpaceData: Partial<StorageSpace>, id) => {
  await updateDoc(doc(db, 'storage-space', id), storageSpaceData)
}

export const getStorageSpacesCount = async () => {
  const snapshot = await getDocs(collection(db, 'storage-space'))
  return snapshot.size
}

export const clearCollection = async () => {
  const snapshot = await getDocs(collection(db, 'storage-space'))
  snapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

export const storageSpaceData = [
  {
    id: '1',
    name: 'Storage Room A1',
    location: 'Building A, Room 101',
    status: 'Available'
  },
  {
    id: '2',
    name: 'Warehouse B',
    location: 'Building B, Storage Area',
    status: 'Available'
  },
  {
    id: '3',
    name: 'Storage Area C3',
    location: 'Building C, Basement',
    status: 'Available'
  },
  {
    id: '4',
    name: 'Locker Room D',
    location: 'Building D, Locker Area',
    status: 'Available'
  },
  {
    id: '5',
    name: 'Storage Bay E',
    location: 'Building E, Storage Room 302',
    status: 'Available'
  },
  {
    id: '6',
    name: 'Warehouse F',
    location: 'Building F, Storage Area',
    status: 'Available'
  },
  {
    id: '7',
    name: 'Storage Facility G',
    location: 'Building G, Storage Room 401',
    status: 'Available'
  },
  {
    id: '8',
    name: 'Storage Room H1',
    location: 'Building H, Room 201',
    status: 'Available'
  },
  {
    id: '9',
    name: 'Storage Closet I',
    location: 'Building I, Storage Closet',
    status: 'Available'
  },
  {
    id: '10',
    name: 'Warehouse J',
    location: 'Building J, Storage Area',
    status: 'Available'
  }
]
