import { getCurrentUser, logOut } from '@renderer/controllers/AuthController'
import { Link } from 'react-router-dom'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { createChat, getChats } from '@renderer/controllers/ChatController'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@renderer/firebase'
import { getBroadcasts } from '@renderer/controllers/BroadcastController'
import ModalHeader from './General/ModalHeader'
import ModalFooter from './General/ModalFooter'
import profilePicture from '../assets/profilePicture.png'
import ChatBubble from './General/Chat/ChatBubble'
import BroadcastBubble from './General/Broadcast/BroadcastBubble'

const Navbar = () => {
  const [chatData, setChatData] = useState<Chat[] | null>(null)
  const [broadcastData, setBroadcastData] = useState<Broadcast[] | null>(null)
  const [currentMode, setCurrentMode] = useState<'global' | 'broadcast'>('global')

  const [currentUser, setCurrentUser] = useState<Employee | null>(null)
  const [currentText, setCurrentText] = useState('')
  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleModeChange = (mode: 'global' | 'broadcast') => {
    setCurrentMode(mode)
    if (mode === 'global') {
      fetchChatData()
    } else if (mode === 'broadcast') {
      fetchBroadcastData()
    }
  }

  const fetchChatData = async () => {
    try {
      setChatData(await getChats())
    } catch (error) {
      console.log(error)
    }
  }

  const fetchBroadcastData = async () => {
    try {
      setBroadcastData(await getBroadcasts())
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentUserLogin = async () => {
    try {
      setCurrentUser(await getCurrentUser())
    } catch (error) {
      console.log(error)
    }
  }

  const resetData = () => {
    setCurrentText('')
    if (!formRef.current) return
    formRef.current.reset()
  }

  const scrollToBottom = () => {
    const container = chatContainerRef.current
    if (!container) return
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    fetchChatData()
    fetchBroadcastData()
    getCurrentUserLogin()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [chatData])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'chat-message'), orderBy('date', 'asc')),
      (snapshot) => {
        const updatedChats = snapshot.docs.map((doc) => ({
          ...(doc.data() as Chat),
          id: doc.id
        }))
        setChatData(updatedChats)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'broadcast-message'), orderBy('priorityLevel', 'asc')),
      (snapshot) => {
        const updatedBroadcasts = snapshot.docs.map((doc) => ({
          ...(doc.data() as Broadcast),
          id: doc.id
        }))
        setBroadcastData(updatedBroadcasts)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = currentText.length > 0 ? true : false

    if (!isValid) return

    if (!currentUser) return

    const date = new Date()

    const addLeadingZero = (number: number) => (number < 10 ? `0${number}` : number)

    const currentTime =
      date.toLocaleDateString('id-ID', { hour12: false }) +
      ' ' +
      addLeadingZero(date.getHours()) +
      ':' +
      addLeadingZero(date.getMinutes())

    const newChat: Chat = {
      senderID: currentUser?.id,
      message: currentText,
      simpleTime: currentTime,
      date: date.toString()
    }

    await createChat(newChat)
    await fetchChatData()
    await fetchBroadcastData()

    resetData()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-end">
            <li className="nav-item dropdown me-2">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={profilePicture} alt="" width={40} />
              </a>
              <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#" onClick={logOut}>
                    <Link to="/" className="text-white nav-link">
                      Logout
                    </Link>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <ModalHeader />
      <div
        className="modal fade"
        id="chatModal"
        aria-labelledby="chatModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: '80%' }}>
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-light" id="chatModalLabel">
                Chat Feature
              </h1>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-row gap-3">
                <div className="d-flex flex-column gap-3 h-100" style={{ width: '20%' }}>
                  <button
                    type="button"
                    className={`btn btn-light d-flex gap-2 w-100 fs-5 p-2 ${
                      currentMode === 'global' ? 'active' : ''
                    }`}
                    onClick={() => handleModeChange('global')}
                  >
                    <i className="bi bi-globe ms-2"></i>
                    <p className="fw-medium m-0">Global</p>
                  </button>
                  <button
                    type="button"
                    className={`btn btn-light d-flex gap-2 w-100 fs-5 p-2 ${
                      currentMode === 'broadcast' ? 'active' : ''
                    }`}
                    onClick={() => handleModeChange('broadcast')}
                  >
                    <i className="bi bi-wifi ms-2"></i>
                    <p className="fw-medium m-0">Broadcast</p>
                  </button>
                </div>
                {currentMode === 'global' ? (
                  <div
                    className="d-flex flex-column w-100 justify-content-between bg-light rounded text-dark overflow-hidden"
                    style={{ height: '550px' }}
                  >
                    <div
                      className="d-flex flex-column p-3 gap-4 overflow-auto mb-2"
                      ref={chatContainerRef}
                    >
                      {chatData &&
                        chatData.map((chat) => (
                          <ChatBubble
                            id={chat.senderID}
                            message={chat.message}
                            time={chat.simpleTime}
                            isSender={chat.senderID === currentUser?.id ? true : false}
                          />
                        ))}
                    </div>
                    <form
                      className="d-flex gap-2 p-3 border-0"
                      style={{ backgroundColor: '#D4D4D4' }}
                      onSubmit={handleSubmit}
                      ref={formRef}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your message..."
                        onChange={(e) => setCurrentText(e.target.value)}
                        onFocus={scrollToBottom}
                        ref={(input) => (inputRef.current = input)}
                      />
                      <button type="submit" className="btn btn-dark">
                        <i className="bi bi-arrow-right"></i>
                      </button>
                    </form>
                  </div>
                ) : (
                  <div
                    className="d-flex flex-column w-100 justify-content-between bg-light rounded text-dark overflow-hidden"
                    style={{ height: '550px' }}
                  >
                    <div
                      className="d-flex flex-column p-3 gap-4 overflow-auto mb-2"
                      ref={chatContainerRef}
                    >
                      {broadcastData &&
                        broadcastData.map((broadcast) => (
                          <BroadcastBubble
                            id={broadcast.senderID}
                            title={broadcast.title}
                            message={broadcast.message}
                            priorityLevel={broadcast.priorityLevel}
                            time={broadcast.simpleTime}
                            isSender={broadcast.senderID === currentUser?.id ? true : false}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <ModalFooter />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
