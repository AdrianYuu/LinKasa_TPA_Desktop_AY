import { db } from '@renderer/firebase'
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'

export const getFlightSchedules = async (): Promise<FlightSchedule[] | null> => {
  const q = query(collection(db, 'flight-schedule'), orderBy('flightDate', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as FlightSchedule) }))
}

export const getFlightSchedule = async (id): Promise<FlightSchedule | null> => {
  const q = query(collection(db, 'flight-schedule'), where('id', '==', id))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  return qSnapshot.empty ? null : (doc.data() as FlightSchedule)
}

export const createFlightSchedule = async (flightScheduleData: FlightSchedule) => {
  await addDoc(collection(db, 'flight-schedule'), flightScheduleData)
}

export const updateFlightSchedule = async (
  flightScheduleData: Partial<FlightSchedule>,
  flightID: string
) => {
  const q = query(collection(db, 'flight-schedule'), where('id', '==', flightID))
  const qSnapshot = await getDocs(q)
  qSnapshot.forEach(async (doc) => {
    await updateDoc(doc.ref, flightScheduleData)
  })
}

export const deleteFlightSchedule = async (flightID: string) => {
  const q = query(collection(db, 'flight-schedule'), where('id', '==', flightID))
  const qSnapshot = await getDocs(q)
  qSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref)
  })
}

export const getFlightScheduleCount = async () => {
  const snapshot = await getDocs(collection(db, 'flight-schedule'))
  return snapshot.size
}

export const checkFlightIDUnique = async (flightID: string): Promise<true | false> => {
  const q = query(collection(db, 'flight-schedule'), where('id', '==', flightID))
  const qSnapshot = await getDocs(q)
  return qSnapshot.empty ? true : false
}

export const addPassengerToFlightSchedule = async (flightID, newPassenger) => {
  const flightSchedulesCollection = collection(db, 'flight-schedule')
  const q = query(flightSchedulesCollection, where('id', '==', flightID))

  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    const flightScheduleDoc = querySnapshot.docs[0]

    const currentPassengers = flightScheduleDoc.data()?.passengers || []

    if (currentPassengers === null) {
      await setDoc(doc(db, 'flight-schedule', flightScheduleDoc.id), {
        passengers: [newPassenger]
      })
    } else {
      await updateDoc(doc(db, 'flight-schedule', flightScheduleDoc.id), {
        passengers: arrayUnion(newPassenger)
      })
    }
  }
}

export const updatePassengerInFlightSchedule = async (
  flightID: string,
  passengerID: string,
  updatedPassengerData: Partial<Passenger>
) => {
  const flightSchedulesCollection = collection(db, 'flight-schedule')
  const q = query(flightSchedulesCollection, where('id', '==', flightID))

  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    const flightScheduleDoc = querySnapshot.docs[0]

    const currentPassengers = flightScheduleDoc.data()?.passengers || []

    if (currentPassengers === null) {
      await setDoc(doc(db, 'flight-schedule', flightScheduleDoc.id), {
        passengers: [{ id: passengerID, ...updatedPassengerData }]
      })
    } else {
      const updatedPassengers = currentPassengers.map((passenger) =>
        passenger.id === passengerID ? { ...passenger, ...updatedPassengerData } : passenger
      )

      await updateDoc(doc(db, 'flight-schedule', flightScheduleDoc.id), {
        passengers: updatedPassengers
      })
    }
  }
}

export const deletePassengerFromFlightSchedule = async (flightID: string, passengerID: string) => {
  const flightSchedulesCollection = collection(db, 'flight-schedule')
  const q = query(flightSchedulesCollection, where('id', '==', flightID))

  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    const flightScheduleDoc = querySnapshot.docs[0]

    const currentPassengers = flightScheduleDoc.data()?.passengers || []

    if (currentPassengers !== null) {
      const updatedPassengers = currentPassengers.filter(
        (passenger) => passenger.id !== passengerID
      )

      await updateDoc(doc(db, 'flight-schedule', flightScheduleDoc.id), {
        passengers: updatedPassengers
      })
    }
  }
}
