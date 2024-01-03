import { db } from '@renderer/firebase'
import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore'

export const getChats = async (): Promise<Chat[] | null> => {
  const q = query(collection(db, 'chat-message'), orderBy('date', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...(doc.data() as Chat), id: doc.id }))
}

export const createChat = async (chatData: Chat) => {
  await addDoc(collection(db, 'chat-message'), chatData)
}
