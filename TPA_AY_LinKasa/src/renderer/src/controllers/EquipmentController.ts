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
import { db } from '../firebase'

export const getEquipments = async (): Promise<Equipment[] | null> => {
  const q = query(collection(db, 'equipment'), orderBy('type', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as Equipment), id: doc.id }))
}

export const getEquipment = async (id): Promise<Equipment | null> => {
  const q = query(collection(db, 'equipment'), where(documentId(), '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as Equipment)
}

export const createEquipment = async (equipmentData: Equipment) => {
  await addDoc(collection(db, 'equipment'), equipmentData)
}

export const updateEquipment = async (equipmentData: Partial<Equipment>, id) => {
  await updateDoc(doc(db, 'equipment', id), equipmentData)
}

export const getEquipmentsCount = async () => {
  const snapshot = await getDocs(collection(db, 'equipment'))
  return snapshot.size
}

export const clearCollection = async () => {
  const snapshot = await getDocs(collection(db, 'equipment'))
  snapshot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

export const equipmentData = [
  {
    id: '',
    name: 'Aircraft tow tractors',
    type: 'Ground Support Equipment',
    status: 'Fully operational'
  },
  {
    id: '',
    name: 'Baggage conveyors',
    type: 'Ground Support Equipment',
    status: 'Fully operational'
  },
  { id: '', name: 'Belt loaders', type: 'Ground Support Equipment', status: 'Fully operational' },
  {
    id: '',
    name: 'Ground power units',
    type: 'Ground Support Equipment',
    status: 'Fully operational'
  },
  {
    id: '',
    name: 'Air start units',
    type: 'Ground Support Equipment',
    status: 'Fully operational'
  },
  { id: '', name: 'Fuel trucks', type: 'Ground Support Equipment', status: 'Fully operational' },
  {
    id: '',
    name: 'De-icing vehicles',
    type: 'Ground Support Equipment',
    status: 'Fully operational'
  },
  {
    id: '',
    name: 'Escalators and elevators',
    type: 'Terminal Equipment',
    status: 'Fully operational'
  },
  { id: '', name: 'Moving walkways', type: 'Terminal Equipment', status: 'Fully operational' },
  {
    id: '',
    name: 'Baggage carousel systems',
    type: 'Terminal Equipment',
    status: 'Fully operational'
  },
  {
    id: '',
    name: 'Security screening equipment (X-ray machines, metal detectors)',
    type: 'Terminal Equipment',
    status: 'Fully operational'
  },
  {
    id: '',
    name: 'Air conditioning and heating systems',
    type: 'Terminal Equipment',
    status: 'Fully operational'
  },
  {
    id: '',
    name: 'Information displays and PA systems.',
    type: 'Terminal Equipment',
    status: 'Fully operational'
  },
  {
    id: '',
    name: 'Runway lighting systems',
    type: 'Runway and Taxiway Equipment',
    status: 'Fully operational'
  },
  {
    id: '',
    name: 'Taxiway lighting systems',
    type: 'Runway and Taxiway Equipment',
    status: 'Fully operational'
  },
  {
    id: '',
    name: 'Windsocks and weather monitoring equipment',
    type: 'Runway and Taxiway Equipment',
    status: 'Fully operational'
  },
  {
    id: '',
    name: 'Ground radar systems',
    type: 'Runway and Taxiway Equipment',
    status: 'Fully operational'
  },
  {
    id: '',
    name: 'Hydraulic jacks and lifts',
    type: 'Aircraft Maintenance Equipment',
    status: 'Fully operational'
  },
  {
    id: '',
    name: 'Ground support equipment tooling',
    type: 'Aircraft Maintenance Equipment',
    status: 'Fully operational'
  },
  {
    id: '',
    name: 'Maintenance platforms and dockings',
    type: 'Aircraft Maintenance Equipment',
    status: 'Fully operational'
  },
  {
    id: '',
    name: 'Aircraft ladders and stairs',
    type: 'Aircraft Maintenance Equipment',
    status: 'Fully operational'
  }
]
