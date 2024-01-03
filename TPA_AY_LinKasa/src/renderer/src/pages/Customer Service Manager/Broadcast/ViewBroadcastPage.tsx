import CardBroadcast from '@renderer/components/Customer Service Manager/Broadcast/CardBroadcast'
import Sidebar from '@renderer/components/Customer Service Manager/Sidebar'
import Navbar from '@renderer/components/Navbar'
import { getBroadcasts } from '@renderer/controllers/BroadcastController'
import { db } from '@renderer/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const ViewBroadcastPage = () => {
  const [broadcastsData, setBroadcastsData] = useState<Broadcast[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'broadcast-message'), fetchData)
    return () => {
      unsubscribe()
    }
  }, [])

  const fetchData = async () => {
    try {
      setBroadcastsData(await getBroadcasts())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="w-100 overflow-auto">
        <Navbar />
        <div className="px-5 py-4 overflow-hidden">
          {broadcastsData && broadcastsData.length > 0 ? (
            <h5 className="mt-2 mb-4 text-muted">
              Customer Service Manager
              <i className="bi bi-arrow-right mx-2"></i>
              View Broadcast
            </h5>
          ) : (
            <></>
          )}
          {broadcastsData && broadcastsData.length > 0 ? (
            <div className="d-flex flex-column gap-4">
              {broadcastsData.map((broadcast) => (
                <CardBroadcast
                  id={broadcast.id}
                  title={broadcast.title}
                  message={broadcast.message}
                  priorityLevel={broadcast.priorityLevel}
                  date={broadcast.date}
                  simpleTime={broadcast.simpleTime}
                />
              ))}
            </div>
          ) : (
            <div className="text-center my-4">
              <p className="lead">No broadcast data records found.</p>
              <i className="bi bi-emoji-frown" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewBroadcastPage
