import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { signOut } from 'firebase/auth'

export const getCurrentUser = async (): Promise<Employee | null> => {
  const currentUser = auth.currentUser
  if (!currentUser) return null

  const q = query(collection(db, 'users'), where('workEmail', '==', currentUser.email))
  const qSnapshot = await getDocs(q)
  const doc = qSnapshot.docs[0]
  const currUser = doc.data() as Employee
  currUser.id = doc.id

  return qSnapshot.empty ? null : currUser
}

export const checkPersonalEmailUnique = async (personalEmail: string): Promise<true | false> => {
  const q = query(collection(db, 'users'), where('personalEmail', '==', personalEmail))
  const qSnapshot = await getDocs(q)
  return qSnapshot.empty ? true : false
}

export const checkWorkEmailUnique = async (workEmail: string): Promise<true | false> => {
  const q = query(collection(db, 'users'), where('workEmail', '==', workEmail))
  const qSnapshot = await getDocs(q)
  return qSnapshot.empty ? true : false
}

export const logOut = () => {
  return signOut(auth)
}
